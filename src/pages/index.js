import '../pages/index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { initialCards } from "../utils/constants.js";
import { config } from "../utils/constants.js";
import {popupProfileForm, editButton, addButton, popupCardForm,
  popupName, popupActivity, profileImage, popupAvatarForm} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";

const userInfoClass = new UserInfo({ 
  name:'.profile__name', 
  info: '.profile__activity'
});
const popupWithImage = new PopupWithImage('.popup_type_image');
const profileFormValidator = new FormValidator(config, popupProfileForm);
const cardFormValidator = new FormValidator(config, popupCardForm);
const popupAvatarFormValidator = new FormValidator(config, popupAvatarForm);
const popupClassProfile = new PopupWithForm('.popup_type_profile', {
  submitForm: (formValues) => {
    userInfoClass.setUserInfo(formValues.inputName, formValues.inputActivity);
    popupClassProfile.close();
  }
});
const popupClassCard = new PopupWithForm('.popup_type_card', {
  submitForm: (formValues) => {
    const item = {
      name: formValues.inputCardName,
      link: formValues.inputCardLink
    }
    cardsList.addItem(createCard(item));
    popupClassCard.close();
  }
});
const popupClassAvatar = new PopupWithForm('.popup_type_update-avatar', {
  submitForm: (formValues) => {
    profileImage.src = formValues.inputAvatarLink;
    popupClassAvatar.close();
  }
})
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardsList.addItem(createCard(item));
  }
}, '.cards');
function handleCardClick(title, image){
  popupWithImage.open(title, image);
}
function createCard(card){
  const element = new Card(card.name, card.link, '.template', handleCardClick);
  const cardElement = element.createCard();
  return cardElement;
}
function setPopupValue() {
  const userData = userInfoClass.getUserInfo();
  popupName.value = userData.name;
  popupActivity.value = userData.info;
}
window.addEventListener('load', ()=>{
  document.querySelectorAll('.popup').forEach((popup) => popup.classList.add('popup_transition'))
})
profileImage.addEventListener('click', () => {
  popupAvatarFormValidator.resetValidation(); //доделать валидацию формы
  popupClassAvatar.open();
})
editButton.addEventListener('click', () => {
  setPopupValue();
  profileFormValidator.resetValidation();
  popupClassProfile.open();
});
addButton.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  popupClassCard.open();
});
popupClassAvatar.setEventListeners();
popupWithImage.setEventListeners();
popupClassProfile.setEventListeners();
popupClassCard.setEventListeners();
cardsList.renderItems();
popupAvatarFormValidator.enableValidation();
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();