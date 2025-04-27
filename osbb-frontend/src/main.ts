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
    await sendMessage(textarea.value, textarea.value);
    textarea.value = '';
    showModal('Звернення успішно надіслано!');
});

async function loadRequests() {
    const list = document.getElementById('requests-list')!;
    showLoader();
    try {
        const requests = await getAllRequests();
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