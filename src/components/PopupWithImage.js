import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._popupImage = this._popupElement.querySelector('.popup__image');
        this._popupFigcaption = this._popupElement.querySelector('.popup__figcaption_type_image');
    }

    open(title, image){
        super.open();
        this._popupImage.src = image;
        this._popupImage.alt = title;
        this._popupFigcaption.innerText = title;
    }
}