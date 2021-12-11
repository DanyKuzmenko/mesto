import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const profileFormValidator = new FormValidator(config, popupProfileForm);
const cardFormValidator = new FormValidator(config, popupCardForm);
function openPopup(elem) {
  elem.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscPressed);
  elem.addEventListener('mouseup', closePopupOverlay);
}
function setPopupValue() {
  popupName.value = profileName.textContent;
  popupActivity.value = profileActivity.textContent;
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
function prependCard(item) {
  const element = new Card(item.name, item.link, '.template', openPopup, popupTypeImage, popupImage, popupTypeImageFigcaption);
  const card = element.createCard();
  listElement.prepend(card);
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
  profileFormValidator.deletePopupErrors();
  openPopup(popupProfile);
});
popupCloseButton.addEventListener('click', () => closePopup(popupProfile));
popupProfileForm.addEventListener('submit', submitProfileHandler);
addButton.addEventListener('click', () => {
  popupCardForm.reset();
  cardFormValidator.deletePopupErrors();
  cardFormValidator.disableFormButton();
  openPopup(popupCard);
});
popupCardCloseButton.addEventListener('click', () => closePopup(popupCard));
initialCards.forEach(prependCard);
popupCardForm.addEventListener('submit', cardSubmitHandler);
popupTypeImageCloseButton.addEventListener('click', () => closePopup(popupTypeImage));
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();