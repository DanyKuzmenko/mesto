const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileActivity = profile.querySelector('.profile__activity');
const popupProfile = document.querySelector('.popup_type_profile');
const popupCloseButton = popupProfile.querySelector('.popup__close-button');
const popupName = popupProfile.querySelector('.popup__input_type_name');
const popupActivity = popupProfile.querySelector('.popup__input_type_activity');
const popupProfileForm = popupProfile.querySelector('.popup__form_type_profile');
const addButton = profile.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup_type_card');
const popupCardCloseButton = document.querySelector('.popup__close-button_type_card');
const listElement = document.querySelector('.cards');
const templateItem = document.querySelector('.template').content;
const popupCardName = popupCard.querySelector('.popup__input_type_card-name');
const popupCardLink = popupCard.querySelector('.popup__input_type_card-link');
const popupCardForm = popupCard.querySelector('.popup__form_type_card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupTypeImageFigcaption = popupTypeImage.querySelector('.popup__figcaption_type_image');
const popupTypeImageCloseButton = popupTypeImage.querySelector('.popup__close-button_type_image');
const popupCardButton = popupCard.querySelector('.popup__button');
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
function submitProfileHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileActivity.textContent = popupActivity.value;
  closePopup(popupProfile);
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
  popupImage.alt = item.name;
  popupTypeImageFigcaption.innerText = popupTitle.innerText;
}
function createCard(item) {
  const element = templateItem.querySelector('.card').cloneNode(true);
  // я не вынес элемент в global scope, потому что он создается каждый раз новый. 
  //Если вынесу то добавится только 1 карточка
  element.querySelector('.card__title').innerText = item.name;
  const cardImage = element.querySelector('.card__image');
  cardImage.src = item.link;
  cardImage.alt = item.name;
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
function disableCardFormButton () {
  popupCardButton.setAttribute('disabled', '');
  popupCardButton.classList.add('popup__button_disabled');
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
  deletePopupErrors(popupProfile);
  openPopup(popupProfile);
});
popupCloseButton.addEventListener('click', () => closePopup(popupProfile));
popupProfileForm.addEventListener('submit', submitProfileHandler);
addButton.addEventListener('click', () => {
  popupCardForm.reset();
  deletePopupErrors(popupCard);
  disableCardFormButton();
  openPopup(popupCard);
});
popupCardCloseButton.addEventListener('click', () => closePopup(popupCard));
initialCards.forEach(prependCard);
popupCardForm.addEventListener('submit', cardSubmitHandler);
popupTypeImageCloseButton.addEventListener('click', () => closePopup(popupTypeImage));