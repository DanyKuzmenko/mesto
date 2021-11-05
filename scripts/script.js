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
let popupImage = popupTypeImage.querySelector('.popup__image');
let popupTypeImageFigcaption = popupTypeImage.querySelector('.popup__figcaption_type_image');
let popupTypeImageCloseButton = popupTypeImage.querySelector('.popup__close-button_type_image'); 
function openPopup(elem) {
  elem.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscPressed);
  elem.addEventListener('mouseup', closePopupOverlay);
}
function setPopupValue() {
  popupName.value = profileName.textContent;
  popupActivity.value = profileActivity.textContent;
}
function deletePopupErrors(popup) {
  const inputs = Array.from(popup.querySelectorAll('.popup__input'));
  const errors = Array.from(popup.querySelectorAll('.popup__error'));
  inputs.forEach((input) => {
    input.classList.remove('popup__input_type_error');
  })
  errors.forEach((error) => {
    error.classList.remove('popup__error_visible');
  })
}
function closePopupOverlay (evt) {
  const openPopup = document.querySelector('.popup_opened');
  if (evt.target.classList.contains('popup')) {
      closePopup(openPopup);
    }
}
function handleEscPressed (evt) {
  const openPopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(openPopup);
  }
}
function closePopup(elem) {
  elem.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscPressed);
  elem.removeEventListener('mouseup', closePopupOverlay);
}
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileActivity.textContent = popupActivity.value;
  closePopup(popup);
}
function deleteCard(elem) {
  elem.querySelector('.card__delete-icon').addEventListener('click', () => {
    elem.remove();
  })
}
function likeCard(elem) {
  const like = elem.querySelector('.card__like');
  like.addEventListener('click', () => {
    like.classList.toggle('card__like_active');
  })
}
function setImage(elem, item) {
  const popupTitle = elem.querySelector('.card__title');
  popupImage.src = item.link;
  popupTypeImageFigcaption.innerText = popupTitle.innerText;
}
function createCard(item) {
  const element = templateItem.querySelector('.card').cloneNode(true);
  element.querySelector('.card__title').innerText = item.name;
  element.querySelector('.card__image').src = item.link;
  element.querySelector('.card__image').alt = item.name;
  deleteCard(element);
  likeCard(element);
  element.querySelector('.card__image').addEventListener('click', ()=>{
    openPopup(popupTypeImage);
    setImage(element, item);
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
  closePopup(popupCard);
}
window.addEventListener('load', ()=>{
  document.querySelectorAll('.popup').forEach((popup) => popup.classList.add('popup_transition'))
})
editButton.addEventListener('click', () => {
  setPopupValue();
  deletePopupErrors(popup);
  openPopup(popup);
});
popupCloseButton.addEventListener('click', () => closePopup(popup));
popupForm.addEventListener('submit', formSubmitHandler);
addButton.addEventListener('click', () => openPopup(popupCard));
popupCardCloseButton.addEventListener('click', () => closePopup(popupCard));
initialCards.forEach(prependCard);
popupCardForm.addEventListener('submit', cardSubmitHandler);
popupTypeImageCloseButton.addEventListener('click', () => closePopup(popupTypeImage));