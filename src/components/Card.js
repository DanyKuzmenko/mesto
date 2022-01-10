export default class Card {
    constructor(title, image, templateItem, handleCardClick, likes, submitDeleteCard, cardId){
        this._templateItem = templateItem;
        this._title = title;
        this._image = image;
        this._handleCardClick = handleCardClick;
        this._likes = likes;
        this._submitDeleteCard = submitDeleteCard;
        this._cardId = cardId;
    }

    _likeCard(){
        this._likeButton.classList.toggle('card__like_active');
    }

    _setEventListeners(){
        this._cardImage.addEventListener('click', () => this._handleCardClick(this._title, this._image));
        this._element.querySelector('.card__delete-icon').addEventListener('click', () => this._submitDeleteCard(this._element, this._cardId));
        this._likeButton.addEventListener('click', () => this._likeCard());
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
        this._likeButton = this._element.querySelector('.card__like');
        this._cardImage = this._element.querySelector('.card__image');
        this._numberOfLikes = this._element.querySelector('.card__like-number');
        this._setEventListeners();
        this._element.querySelector('.card__title').innerText = this._title;
        this._cardImage.src = this._image;
        this._cardImage.alt = this._title;
        if(this._likes){
            this._numberOfLikes.textContent = this._likes.length;
        }
        return this._element;
    }
}