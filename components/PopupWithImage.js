import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._popupImage = this._popupSelector.querySelector('.popup__image');
        this._popupFigcaption = this._popupSelector.querySelector('.popup__figcaption_type_image');
        this._popupTitle = this._popupSelector.querySelector('.card__title');
    }

    open(title, image){
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', () => super._handleEscClose());
        super.setEventListeners();
        this._popupImage.src = image;
        this._popupImage.alt = title;
        this._popupFigcaption.innerText = this._popupTitle.innerText;
    }
}