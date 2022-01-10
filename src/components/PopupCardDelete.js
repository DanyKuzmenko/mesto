import Popup from "./Popup.js";
export default class PopupCardDelete extends Popup{
  constructor({ popupSelector, handleFormSubmit }){
    super(popupSelector);
    this._form = this._popupElement.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
  }

  open(card, element){ // при открытии попапа, передаю API карточки и саму карточку
    super.open();
    this._card = card;
    this._element = element;
  }

  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit',(event) => {
      event.preventDefault();
      this._handleFormSubmit(this._card._id, this._element);
    })
  }
}