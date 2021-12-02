class Card {
    constructor(title, image, templateItem, openPopup, popupTypeImage, setImage){
        this._templateItem = templateItem;
        this._title = title;
        this._image = image;
        this._openPopup = openPopup;
        this._popupTypeImage = popupTypeImage;
        this._setImage = setImage;
    }
    
    _deleteCard(){
        this._element.querySelector('.card__delete-icon').addEventListener('click', () => {
            this._element.remove();
          })
    }

    _likeCard(){
        this._element.querySelector('.card__like').addEventListener('click', () => {
            this._element.querySelector('.card__like').classList.toggle('card__like_active');
        })
    }

    _setEventListeners(){
        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._openPopup(this._popupTypeImage);
            this._setImage(this._element, this._title, this._image);
        });
    }

    _getTemplate(){
        this._element = this._templateItem.
        querySelector('.card').
        cloneNode(true);
        return this._element;
    }

    createCard(){
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.card__title').innerText = this._title;
        this._element.querySelector('.card__image').src = this._image;
        this._element.querySelector('.card__image').alt = this._title;
        this._likeCard();
        this._deleteCard();
        return this._element;
    }
}

export default Card;