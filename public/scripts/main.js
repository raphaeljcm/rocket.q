import Modal from './modal.js';

function handleModal() {
  const modal = Modal();
  const deleteButtons = document.querySelectorAll('.actions a.delete');
  const checkButtons = document.querySelectorAll('.actions a.check');
  const cancelModalBtn = document.querySelector('#cancel');

  // handling open modal
  checkButtons.forEach(button => {
    button.addEventListener('click', handleOpeningModal);
  });

  deleteButtons.forEach(button => {
    button.addEventListener('click', event => handleOpeningModal(event, false));
  });
  
  // handling close modal
  cancelModalBtn.addEventListener('click', () => modal.close());

  function handleOpeningModal(event, checkButton = true) {
    const modalTitle = document.querySelector('.modal h2');
    const modalDescription = document.querySelector('.modal p');
    const deleteModalBtn = document.querySelector('.modal button');
    const roomId = document.querySelector('#room-id').dataset.id;
    const questionId = event.target.dataset.id;
    const form = document.querySelector('.modal form');
    const slug = checkButton ? 'check' : 'delete';  
    const defaultText = checkButton ? 'Marcar como lida' : 'Excluir';

    // Changing texts content
    modalTitle.textContent = checkButton ? `${defaultText} esta pergunta` : `${defaultText} esta pergunta`;
    modalDescription.textContent = checkButton ? `Tem certeza que deseja ${defaultText.toLowerCase()} esta pergunta?` : `Tem certeza que deseja ${defaultText.toLowerCase()} esta pergunta?`;
    deleteModalBtn.textContent = checkButton ? `Sim, ${defaultText.toLowerCase()}` : `Sim, ${defaultText.toLowerCase()}`;

    // Changing the color of the delete button
    checkButton ? deleteModalBtn.classList.remove('red') : deleteModalBtn.classList.add('red');

    // Preparing the form action attribute
    form.setAttribute('action', `/room/${roomId}/${questionId}/${slug}`);

    event.preventDefault(); // to prevent that the # goes to the URL
    modal.open();
  }
}

function init() {
  handleModal();
}

window.onload = init();