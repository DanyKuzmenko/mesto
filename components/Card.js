class Card {
    constructor(title, image, templateItem, handleCardClick){
        this._templateItem = templateItem;
        this._title = title;
        this._image = image;
        this._handleCardClick = handleCardClick;
    }
    
    _deleteCard(){
        this._element.remove();
    }

    _likeCard(){
        this._element.querySelector('.card__like').classList.toggle('card__like_active');
    }

    _setEventListeners(){
        this._element.querySelector('.card__image').addEventListener('click', () => this._handleCardClick(this._title, this._image));
        this._element.querySelector('.card__delete-icon').addEventListener('click', () => this._deleteCard());
        this._element.querySelector('.card__like').addEventListener('click', () => this._likeCard())
    }

    _getTemplate(){
        this._element = document.
        querySelector(this._templateItem).
        content.
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
        return this._element;
    }
}

export default Card;