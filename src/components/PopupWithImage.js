import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._popupImage = this._popupElement.querySelector('.popup__image');
        this._popupFigcaption = this._popupElement.querySelector('.popup__figcaption_type_image');
    }

    open(title, image){
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', () => super._handleEscClose(event));
        super.setEventListeners();
        this._popupImage.src = image;
        this._popupImage.alt = title;
        this._popupFigcaption.innerText = title;
    }
}