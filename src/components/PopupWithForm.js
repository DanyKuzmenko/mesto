import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
    constructor(popupSelector, {submitForm}){
        super(popupSelector);
        this._submitForm = submitForm; //сабмит попапа, колбэк функция
        this._form = this._popupElement.querySelector('.popup__form');
        this._inputList = this._popupElement.querySelectorAll('.popup__input');
    }

    _getInputValues(){ // берет значения инпутов
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        })
        return this._formValues;
    }

    setEventListeners(){
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues());
        });
        super.setEventListeners();
    }

    close(){
        super.close();
        this._form.reset();
    }
}