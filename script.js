const modal_select = document.createElement('div');
modal_select.setAttribute('id', 'modal-select');
document.body.append(modal_select);

const modals_select_data = document.getElementsByClassName('modal-select-data');

const buildModal = (selectHtml) => {
  console.log(selectHtml);
  const options = selectHtml.options;

  const optionsArray = Array.from(options).map((option) => option.innerHTML);
  const indexOption_current = options.selectedIndex;

  const controllerModal = {
    options: optionsArray,
    indexOption_current: indexOption_current,
    selectHtml,
  };
  return controllerModal;
};

const openModalSelect = (controllerModal) => {
  const { options, indexOption_current, selectHtml } = controllerModal;

  const selectContentHTML = document.createElement('div');
  selectContentHTML.classList.add('m-select-content');

  const selectHTML = document.createElement('div');
  selectHTML.classList.add('select');

  const titleHTML = document.createElement('div');
  titleHTML.classList.add('title');
  titleHTML.innerHTML = 'Selecciona una opción';

  const optionsHTML = document.createElement('div');
  optionsHTML.classList.add('options');

  const optionsItemArrayHTML = options.map((option) => {
    const optionHTML = document.createElement('div');
    optionHTML.classList.add('option');
    optionHTML.innerHTML = option;
    return optionHTML;
  });
  optionsItemArrayHTML[indexOption_current].classList.add('selected');

  optionsItemArrayHTML.forEach((option) => {
    option.addEventListener('click', () => {
      selectContentHTML.classList.add('cerrar-modal-select');
      titleHTML.innerHTML = option.innerHTML;
      selectContentHTML.addEventListener('animationend', () => {
        modal_select.classList.remove('show-modal-select');
        selectHtml.selectedIndex = optionsItemArrayHTML.indexOf(option);
        selectHtml.dispatchEvent(new Event('change'));
      });
    });
  });

  optionsHTML.append(...optionsItemArrayHTML);
  selectHTML.append(titleHTML, optionsHTML);
  selectContentHTML.append(selectHTML);
  selectContentHTML.addEventListener('click',(e)=>{
    e.stopPropagation();
  })
  modal_select.innerHTML = '';
  modal_select.append(selectContentHTML);

  console.log(selectContentHTML);
};

modal_select.addEventListener('click', (e) => {
  modal_select.classList.remove('show-modal-select');
});

for (let i = 0; i < modals_select_data.length; i++) {
  const modal_select_data = modals_select_data[i];
  const selectHtml = modal_select_data.querySelector('select');
  const open_modal = modal_select_data.querySelector('.open-modal');
  open_modal.addEventListener('click', () => {
    modal_select.classList.add('show-modal-select');
    const controllerModal = buildModal(selectHtml);
    openModalSelect(controllerModal);
  });
}
