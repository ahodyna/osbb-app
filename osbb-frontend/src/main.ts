import { login, register, logout } from './auth';
import { beautifyMessage, sendMessage } from './message';
import { showModal } from './modal';
import { showLoader, hideLoader } from './loader';
import { loadRequests } from './requests';

const authSection = document.getElementById('auth-section')!;
const messageSection = document.getElementById('message-section')!;
const adminSection = document.getElementById('admin-section')!;

const loginBtn = document.getElementById('login-btn')!;
const registerBtn = document.getElementById('register-btn')!;
const goToRegisterLink = document.getElementById('go-to-register')!;
const goToLoginLink = document.getElementById('go-to-login')!;
const userLogoutBtn = document.getElementById('logout-user')!;
const adminLogoutBtn = document.getElementById('logout-user-admin')!;
const sendBtn = document.getElementById('send-btn')!;
const beautifyBtn = document.getElementById('beautify-btn')!;
const sectionSelectAdmin = document.getElementById('section-select-admin')! as HTMLSelectElement;

goToRegisterLink.addEventListener('click', () => {
  (document.getElementById('login-form') as HTMLElement).style.display = 'none';
  (document.getElementById('register-form') as HTMLElement).style.display = 'block';
});

goToLoginLink.addEventListener('click', () => {
  (document.getElementById('register-form') as HTMLElement).style.display = 'none';
  (document.getElementById('login-form') as HTMLElement).style.display = 'block';
});

userLogoutBtn.addEventListener('click', logout);
adminLogoutBtn.addEventListener('click', logout);

loginBtn.addEventListener('click', async () => {
  const phone = (document.getElementById('phone-login') as HTMLInputElement).value;
  const password = (document.getElementById('password-login') as HTMLInputElement).value;

  if (!phone || !password) return showModal('Будь ласка, введіть номер телефону та пароль');

  try {
    showLoader();
    const user = await login(phone, password);
    if (!user || user.error) return showModal(user?.error || 'Помилка входу');

    authSection.style.display = 'none';
    user.isSuperAdmin
      ? ((adminSection.style.display = 'block'), await loadRequests())
      : (messageSection.style.display = 'block');
  } finally {
    hideLoader();
  }
});

registerBtn.addEventListener('click', async () => {
  const phone = (document.getElementById('phone-register') as HTMLInputElement).value;
  const password = (document.getElementById('password-register') as HTMLInputElement).value;

  if (!phone || !password) return showModal('Будь ласка, введіть номер телефону та пароль');

  try {
    showLoader();
    const user = await register(phone, password);
    if (!user || user.error) return showModal(user?.error || 'Помилка реєстрації');

    authSection.style.display = 'none';
    user.isSuperAdmin
      ? ((adminSection.style.display = 'block'), await loadRequests())
      : (messageSection.style.display = 'block');
  } finally {
    hideLoader();
  }
});

beautifyBtn.addEventListener('click', async () => {
  const textarea = document.getElementById('message') as HTMLTextAreaElement;
  if (!textarea.value.trim()) return;

  try {
    showLoader();
    const beautifiedMessage = await beautifyMessage(textarea.value);

    if (beautifiedMessage.error) return showModal(beautifiedMessage.error);

    const parsedValues = beautifiedMessage?.result ? JSON.parse(beautifiedMessage?.result) : {};

    localStorage.setItem('section', parsedValues?.section);
    textarea.value = parsedValues?.message || textarea.value;
  } finally {
    hideLoader();
  }
});

sendBtn.addEventListener('click', async () => {
  const textarea = document.getElementById('message') as HTMLTextAreaElement;

  if (!textarea.value.trim()) return;

  try {
    await sendMessage(textarea.value);
    textarea.value = '';
    showModal('Звернення успішно надіслано!');
  } catch (err) {
    showModal('Помилка при надсиланні');
  }
});

sectionSelectAdmin.addEventListener('change', async () => {
  await loadRequests(sectionSelectAdmin.value);
});
