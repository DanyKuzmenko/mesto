import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
    constructor(popupSelector, {submitForm}){
        super(popupSelector);
        this._submitForm = submitForm;
    }

    _getInputValues(){ // берет значения инпутов
        this._inputList = this.popupSelector.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        })
        return this._formValues;
        
    }

    setEventListeners(){
        this._form = super.popupSelector.querySelector('.popup__form');
        this._form.addEventListener('submit', this._submitForm(this._getInputValues));
        super.setEventListeners();
    }

    close(){
        this.popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', () => super._handleEscClose());
        
    }
}