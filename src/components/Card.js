export default class Card {
    constructor(card, templateItem, handleCardClick, popupDeleteCardForm, popupCardDelete, userId, { cardLike, cardDislike}){
        this._card = card;
        this._templateItem = templateItem;
        this._title = card.name;
        this._image = card.link;
        this._handleCardClick = handleCardClick;
        this._likes = card.likes;
        this._cardId = card._id;
        this._popupDeleteCardForm = popupDeleteCardForm;
        this._popupCardDelete = popupCardDelete;
        this._cardLike = cardLike;
        this._cardDislike = cardDislike;
        this._userId = userId;
    }

    _likeCard(){ // при лайке отправляет запрос через колбэк, и увеличивает кол-во лайков
        // при дизлайке отправляет запрос через колбэк, и уменьшает кол-во лайкой
        if(this._likeButton.classList.contains('card__like_active')){
            this._cardDislike(this._cardId)
                .then(res => {
                    this._numberOfLikes.textContent = res.likes.length;
                    this._likeButton.classList.remove('card__like_active');
                })
                .catch(err => console.log(err))
        } else {
            this._cardLike(this._cardId)
                .then(res => {
                    this._numberOfLikes.textContent = res.likes.length;
                    this._likeButton.classList.add('card__like_active');
                })
                .catch(err => console.log(err))
        }
    }

    _setEventListeners(){
        this._cardImage.addEventListener('click', () => this._handleCardClick(this._title, this._image));
        this._likeButton.addEventListener('click', () => this._likeCard());
        if (this._deleteCardButton){
            this._element.querySelector('.card__delete-icon').addEventListener('click', () => this._popupDeleteCardOpen());
        }
    }

    _getTemplate(){
        this._element = document.
        querySelector(this._templateItem).
        content.
        querySelector('.card').
        cloneNode(true);
        return this._element;
    }

    _popupDeleteCardOpen(){
        this._popupCardDelete.open(this._card, this._element);
    }

    _checkUserLike() { // проверка ставил ли пользователь лайк этой карточке
        const checkLikes = this._likes.some(like => like._id === this._userId);
        if (checkLikes) {
            this._likeButton.classList.add('card__like_active');
        }
    }

    _checkCardDeleteButton() { // удаляет кнопку "удаления карточки" на чужых карточках
        if (this._card.owner._id !== this._userId){
            this._deleteCardButton.remove();
            this._deleteCardButton = null;
        }
    }

    createCard(){
        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector('.card__like');
        this._cardImage = this._element.querySelector('.card__image');
        this._numberOfLikes = this._element.querySelector('.card__like-number');
        this._deleteCardButton = this._element.querySelector('.card__delete-icon');
        this._setEventListeners();
        this._checkCardDeleteButton();
        this._element.querySelector('.card__title').innerText = this._title;
        this._cardImage.src = this._image;
        this._cardImage.alt = this._title;
        this._numberOfLikes.textContent = this._likes.length;
        this._checkUserLike();
        return this._element;
    }
}