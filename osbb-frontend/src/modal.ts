const modal = document.getElementById('modal')!;
const overlay = document.getElementById('overlay')!;
const modalMessage = document.getElementById('modal-message')!;
const modalBtn = document.getElementById('modal-btn')!;

export function showModal(message: string) {
  modalMessage.textContent = message;
  modal.style.display = 'block';
  overlay.style.display = 'block';
}

export function hideModal() {
  modal.style.display = 'none';
  overlay.style.display = 'none';
}

modalBtn.addEventListener('click', hideModal);
