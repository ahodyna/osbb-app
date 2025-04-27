import { login, logout, register } from './auth';
import { beautifyMessage, sendMessage } from './message';

const authSection = document.getElementById('auth-section')!;
const messageSection = document.getElementById('message-section')!;
const adminSection = document.getElementById('admin-section')!;
const sendBtn = document.getElementById('send-btn')!;
const beautifyBtn = document.getElementById('beautify-btn')!;
const loader = document.getElementById('loader')!;

function showLoader() {
  loader.style.display = 'block';
}
function hideLoader() {
  loader.style.display = 'none';
}

const modal = document.getElementById('modal')!;
const overlay = document.getElementById('overlay')!;
const modalMessage = document.getElementById('modal-message')!;
const modalBtn = document.getElementById('modal-btn')!;

function showModal(message: string) {
  modalMessage.textContent = message;
  modal.style.display = 'block';
  overlay.style.display = 'block';
}

function hideModal() {
  modal.style.display = 'none';
  overlay.style.display = 'none';
}

modalBtn.addEventListener('click', hideModal);

const loginBtn = document.getElementById('login-btn')!;
const registerBtn = document.getElementById('register-btn')!;
const goToRegisterLink = document.getElementById('go-to-register')!;
const goToLoginLink = document.getElementById('go-to-login')!;

const loginForm = document.getElementById('login-form')!;
const registerForm = document.getElementById('register-form')!;
const adminLogoutBtn = document.getElementById('logout-user-admin')!;
const userLogoutBtn = document.getElementById('logout-user')!;

goToRegisterLink.addEventListener('click', () => {
  loginForm.style.display = 'none';
  registerForm.style.display = 'block';
});

goToLoginLink.addEventListener('click', () => {
  registerForm.style.display = 'none';
  loginForm.style.display = 'block';
});

userLogoutBtn.addEventListener('click', () => {
  logout();
});

adminLogoutBtn.addEventListener('click', () => {
  logout();
});

loginBtn.addEventListener('click', async () => {
  const phoneInput = (document.getElementById('phone-login') as HTMLInputElement).value;
  const passwordInput = (document.getElementById('password-login') as HTMLInputElement).value;

  if (!phoneInput || !passwordInput)
    return showModal('Будь ласка, введіть номер телефону та пароль');

  try {
    showLoader();
    const user = await login(phoneInput, passwordInput);

    if (!user || user?.error) {
      showModal(user?.error || 'Error');
      return;
    }

    authSection.style.display = 'none';
    if (user.isSuperAdmin) {
      adminSection.style.display = 'block';
      await loadRequests();
    } else {
      messageSection.style.display = 'block';
    }
  } finally {
    hideLoader();
  }
});

registerBtn.addEventListener('click', async () => {
  const phoneInput = (document.getElementById('phone-register') as HTMLInputElement).value;
  const passwordInput = (document.getElementById('password-register') as HTMLInputElement).value;

  if (!phoneInput || !passwordInput)
    return showModal('Будь ласка, введіть номер телефону та пароль');

  try {
    showLoader();
    const user = await register(phoneInput, passwordInput);

    if (!user || user?.error) {
      showModal(user?.error || 'Error');
      return;
    }

    authSection.style.display = 'none';
    if (user.isSuperAdmin) {
      adminSection.style.display = 'block';
      await loadRequests();
    } else {
      messageSection.style.display = 'block';
    }
  } finally {
    hideLoader();
  }
});

beautifyBtn.addEventListener('click', async () => {
  const textarea = document.getElementById('message') as HTMLTextAreaElement;
  if (!textarea.value.trim()) return;
  try {
    showLoader();
    const beautified = await beautifyMessage(textarea.value);
    if (!beautified || beautified.error) {
      showModal(beautified.error || 'Error');
      return;
    }

    textarea.value = beautified?.message || textarea.value;
  } finally {
    hideLoader();
  }
});

sendBtn.addEventListener('click', async () => {
  const textarea = document.getElementById('message') as HTMLTextAreaElement;
  const sectionSelect = document.getElementById('section') as HTMLSelectElement;

  if (!textarea.value.trim()) return;

  const section = sectionSelect.value;

  await sendMessage(textarea.value, section);
  textarea.value = '';
  showModal('Звернення успішно надіслано!');
});

async function loadRequests(section: string = '') {
  const list = document.getElementById('requests-list')!;
  showLoader();
  try {
    const res = await fetch(`http://localhost:3000/api/messages?section=${section}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
    });
    const requests = await res.json();
    list.innerHTML = '';
    requests.forEach((r: any) => {
      const li = document.createElement('li');
      li.textContent = r.text;
      list.appendChild(li);
    });
  } finally {
    hideLoader();
  }
}

const sectionSelectAdmin = document.getElementById('section-select-admin') as HTMLSelectElement;

sectionSelectAdmin.addEventListener('change', async () => {
  const section = sectionSelectAdmin.value;
  await loadRequests(section);
});
