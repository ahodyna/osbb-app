import { login, getCurrentUser } from './auth';
import { beautifyMessage, sendMessage, getAllRequests } from './message';

const authSection = document.getElementById('auth-section')!;
const messageSection = document.getElementById('message-section')!;
const adminSection = document.getElementById('admin-section')!;
const loginBtn = document.getElementById('login-btn')!;
const sendBtn = document.getElementById('send-btn')!;
const beautifyBtn = document.getElementById('beautify-btn')!;
const loader = document.getElementById('loader')!;

// Показати/сховати лоадер
function showLoader() {
  loader.style.display = 'block';
}
function hideLoader() {
  loader.style.display = 'none';
}

// Отримуємо посилання на модалку
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

// Логіка кнопок
loginBtn.addEventListener('click', async () => {
  const phoneInput = (document.getElementById('phone') as HTMLInputElement).value;
  if (!phoneInput) return alert('Введіть номер телефону');

  try {
    showLoader();
    const user = await login(phoneInput);

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
    textarea.value = beautified;
  } finally {
    hideLoader();
  }
});

sendBtn.addEventListener('click', async () => {
  const textarea = document.getElementById('message') as HTMLTextAreaElement;
  const sectionSelect = document.getElementById('section') as HTMLSelectElement;

  if (!textarea.value.trim()) return;

  const section = sectionSelect.value;

  await sendMessage(textarea.value, textarea.value, section);
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
