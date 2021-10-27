const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let profileActivity = profile.querySelector('.profile__activity');
let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close-button');
let popupName = popup.querySelector('.popup__input_type_name');
let popupActivity = popup.querySelector('.popup__input_type_activity');
let popupForm = popup.querySelector('.popup__form_type_profile');
let addButton = profile.querySelector('.profile__add-button');
let popupCard = document.querySelector('.popup_type_card');
let popupCardCloseButton = document.querySelector('.popup__close-button_type_card');
let listElement = document.querySelector('.cards');
let templateItem = document.querySelector('.template').content;
let popupCardName = popupCard.querySelector('.popup__input_type_card-name');
let popupCardLink = popupCard.querySelector('.popup__input_type_card-link');
let popupCardForm = popupCard.querySelector('.popup__form_type_card');
let popupTypeImage = document.querySelector('.popup_type_image');
let cardImage = templateItem.querySelector('.card__image');
let popupImage = popupTypeImage.querySelector('.popup__image');
let popupTypeImageFigcaption = popupTypeImage.querySelector('.popup__figcaption_type_image');
let popupTypeImageCloseButton = popupTypeImage.querySelector('.popup__close-button_type_image'); 
function openPopup() {
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupActivity.value = profileActivity.textContent;
}
function closePopup() {
  popup.classList.remove('popup_opened');
}
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = `${popupName.value}`;
  profileActivity.textContent = `${popupActivity.value}`;
  closePopup();
}
function openPopupCard() {
  popupCard.classList.add('popup_opened');
}
function closePopupCard() {
  popupCard.classList.remove('popup_opened');
}
function createCard(item) {
  const element = templateItem.querySelector('.card').cloneNode(true);
  element.querySelector('.card__title').innerText = item.name;
  element.querySelector('.card__image').src = item.link;
  element.querySelector('.card__delete-icon').addEventListener('click', ()=>{
    element.remove();
  })
  const like = element.querySelector('.card__like');
  element.querySelector('.card__like').addEventListener('click', ()=>{
    like.classList.toggle('card__like_active');
  })
  const popupTitle = element.querySelector('.card__title');
  element.querySelector('.card__image').addEventListener('click', ()=>{
    popupTypeImage.classList.add('popup_opened');
    popupImage.src = item.link;
    popupTypeImageFigcaption.innerText = popupTitle.innerText;
  })
  return element;
}
function prependCard(item) {
  const element = createCard(item);
  listElement.prepend(element);
}
function cardSubmitHandler (evt) {
  evt.preventDefault();
  const item = {
    name: popupCardName.value,
    link: popupCardLink.value
  }
  prependCard(item);
  closePopupCard();
}
function closePopupTypeImage() {
  popupTypeImage.classList.remove('popup_opened');
}
window.addEventListener('load', ()=>{
  document.querySelectorAll('.popup').forEach((popup) => popup.classList.add('popup_transition'))
})
editButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmitHandler);
addButton.addEventListener('click', openPopupCard);
popupCardCloseButton.addEventListener('click', closePopupCard);
initialCards.forEach(prependCard);
popupCardForm.addEventListener('submit', cardSubmitHandler);
popupTypeImageCloseButton.addEventListener('click', closePopupTypeImage);