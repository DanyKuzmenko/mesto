class FormValidator {
    constructor(config, form){
        this._config = config;
        this._form = form;
        this._button = this._form.querySelector(this._config.submitButtonSelector);
        this._inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    }

    _showInputError(inputElem){
        this._errorElem = this._form.querySelector(`#${inputElem.id}-error`);
        inputElem.classList.add(this._config.inputErrorClass);
        this._errorElem.classList.add(this._config.errorClass);
        this._errorElem.textContent = inputElem.validationMessage;
    }

    _hideInputError(inputElem){
        this._errorElem = this._form.querySelector(`#${inputElem.id}-error`);
        inputElem.classList.remove(this._config.inputErrorClass);
        this._errorElem.classList.remove(this._config.errorClass);
        this._errorElem.textContent = '';
    }

    _isValid(inputElem){
        if(!inputElem.validity.valid) {
            this._showInputError(inputElem);
        } else {
            this._hideInputError(inputElem);
        }
    }

    _setButtonState(){
        this._button.disabled = !this._form.checkValidity();
        this._button.classList.toggle(this._config.inactiveButtonClass, !this._form.checkValidity());
    }

    _setEventListeners(){
        this._form.addEventListener('submit', (evt) => {evt.preventDefault()});
        this._form.addEventListener('input', () => this._setButtonState());
    }

    _handleInputs(){
        this._inputs.forEach((inputElem) => {
            inputElem.addEventListener('input', () => {
                this._isValid(inputElem);
            })
        })
    }

    deletePopupErrors(){
        this._errors = Array.from(this._form.querySelectorAll(this._config.spanErrorClass));
        this._inputs.forEach((input) => {
            input.classList.remove(this._config.inputErrorClass);
        })
        this._errors.forEach((error) => {
            error.classList.remove(this._config.errorClass);
        })
    }

    disableFormButton(){
        this._button.setAttribute('disabled', '');
        this._button.classList.add(this._config.inactiveButtonClass);
    }

    enableValidation(){
        this._setEventListeners();
        this._handleInputs();
        this._setButtonState();
    }
}

export default FormValidator;