import { login, getCurrentUser } from './auth';
import { beautifyMessage, sendMessage, getAllRequests } from './message';

const authSection = document.getElementById('auth-section')!;
const messageSection = document.getElementById('message-section')!;
const adminSection = document.getElementById('admin-section')!;
const loginBtn = document.getElementById('login-btn')!;
const sendBtn = document.getElementById('send-btn')!;
const beautifyBtn = document.getElementById('beautify-btn')!;

loginBtn.addEventListener('click', async () => {
    const phoneInput = (document.getElementById('phone') as HTMLInputElement).value;
    if (!phoneInput) return alert('Введіть номер телефону');
    const user = await login(phoneInput);
    authSection.style.display = 'none';
    messageSection.style.display = 'block';

    if (user.isSuperAdmin) {
        adminSection.style.display = 'block';
        loadRequests();
    }
});

beautifyBtn.addEventListener('click', async () => {
    const textarea = document.getElementById('message') as HTMLTextAreaElement;
    const beautified = await beautifyMessage(textarea.value);
    textarea.value = beautified;
});

sendBtn.addEventListener('click', async () => {
    const textarea = document.getElementById('message') as HTMLTextAreaElement;
    await sendMessage(textarea.value, textarea.value);
    alert('Звернення надіслано');
    textarea.value = '';
});

async function loadRequests() {
    const list = document.getElementById('requests-list')!;
    const requests = await getAllRequests();
    list.innerHTML = '';
    requests.forEach(r => {
        const li = document.createElement('li');
        li.textContent = r.beautifiedMessage;
        list.appendChild(li);
    });
}
