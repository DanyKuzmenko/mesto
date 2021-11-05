const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}; 
const showInputError = (inputElem, form, config) => {
    const errorElem = form.querySelector(`#${inputElem.id}-error`);
    inputElem.classList.add(config.inputErrorClass);
    errorElem.classList.add(config.errorClass);
    errorElem.textContent = inputElem.validationMessage;
};
const hideInputError = (inputElem, form, config) => {
    const errorElem = form.querySelector(`#${inputElem.id}-error`);
    inputElem.classList.remove(config.inputErrorClass);
    errorElem.classList.remove(config.errorClass);
    errorElem.textContent = '';
};
const isValid = (inputElem, form, config) => {
    if (!inputElem.validity.valid) {
        showInputError(inputElem, form, config);
    } else {
        hideInputError(inputElem, form, config);
    }
};
const setButtonState = (form, config) => {
    const button = form.querySelector(config.submitButtonSelector);
    button.disabled = !form.checkValidity();
    button.classList.toggle(config.inactiveButtonClass, !form.checkValidity());
};
const setEventListener = (form, config) => {
    form.addEventListener('submit', handleSubmit);
    form.addEventListener('input', () => setButtonState(form, config));
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    inputs.forEach((inputElem) => {
        inputElem.addEventListener('input', () => {
            isValid(inputElem, form, config);
        })
    })
    setButtonState(form, config);
};
const handleSubmit = (event) => {
    event.preventDefault();
};
const enableValidation = (formConfig) => {
    const forms = Array.from(document.querySelectorAll(formConfig.formSelector));
    forms.forEach((form) => {
        setEventListener(form, formConfig);
    })
};
enableValidation(config);
