import Modal from './modal.js';

function handleModal() {
  const modal = Modal();
  const deleteButtons = document.querySelectorAll('.actions a.delete');
  const checkButtons = document.querySelectorAll('.actions a.check');
  const cancelModalBtn = document.querySelector('#cancel');

  // handling open modal
  checkButtons.forEach(button => {
    button.addEventListener('click', () => modal.open());
  });

  deleteButtons.forEach(button => {
    button.addEventListener('click', () => modal.open());
  });
  
  // handling close modal
  cancelModalBtn.addEventListener('click', () => modal.close());
}

function init() {
  handleModal();
}

window.onload = init();