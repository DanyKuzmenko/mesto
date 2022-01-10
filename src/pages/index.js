import '../pages/index.css';
import Popup from '../components/Popup.js';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { config } from "../utils/constants.js";
import {popupProfileForm, editButton, addButton, popupCardForm,
  popupName, popupActivity, profileImage, popupAvatarForm, deleteCardButton, popupDeleteCardForm} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from '../components/Api';

const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-32',
  token: 'cdf974ac-200c-4f73-b0e2-a7b77d2bb087'
});
const userInfoClass = new UserInfo({ 
  name:'.profile__name', 
  info: '.profile__activity'
});
const popupWithImage = new PopupWithImage('.popup_type_image');
const profileFormValidator = new FormValidator(config, popupProfileForm);
const cardFormValidator = new FormValidator(config, popupCardForm);
const popupAvatarFormValidator = new FormValidator(config, popupAvatarForm);
const popupCardDelete = new Popup('.popup_type_delete-card')
const popupClassProfile = new PopupWithForm('.popup_type_profile', {
  submitForm: (formValues) => {
    api.sendUserApiInfo(formValues.inputName, formValues.inputActivity); // сделал добавление данных на сервер при сабмите
    userInfoClass.setUserInfo(formValues.inputName, formValues.inputActivity);
    popupClassProfile.close();
  }
});
const popupClassCard = new PopupWithForm('.popup_type_card', {
  submitForm: (formValues) => {
    const item = {
      name: formValues.inputCardName,
      link: formValues.inputCardLink,
      owner: {
      _id: api.getUserApiInfo()
        .then(res => {
          return res._id; 
        })
      }
    }
    api.sendCardInfo(item.name, item.link);
    cardsList.prependItem(createCard(item));
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
  renderer: (item) => {
    cardsList.addItem(createCard(item));
  }
}, '.cards');
function handleCardClick(title, image){
  popupWithImage.open(title, image);
}
function createCard(card){
  const element = new Card(card.name, card.link, '.template', handleCardClick, card.likes, submitDeleteCard, card._id);
  const cardElement = element.createCard();
  const deleteCardButton = cardElement.querySelector('.card__delete-icon'); // сделать, чтобы иконка отображалась при сабмите формы
  if (card.owner._id == "8e4bcdc1db4b93efdf898001"){
    deleteCardButton.style.visibility = 'visible';
  }
  return cardElement;
}
function submitDeleteCard(card, cardId) { //доделать сабмит на enter
  popupCardDelete.open();
  popupDeleteCardForm.addEventListener('submit', (event) => { // сделать submit один раз
    event.preventDefault();
    api.deleteApiCard(cardId);
    card.remove();
    popupCardDelete.close();
  })
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
  popupAvatarFormValidator.resetValidation(); //доделать валидацию формы - вроде сделал
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
popupDeleteCardForm.addEventListener('submit', function SubmitDelete(evt) { // доделать submit
  evt.preventDefault();
  popupCardDelete.close();
})
popupCardDelete.setEventListeners();
popupClassAvatar.setEventListeners();
popupWithImage.setEventListeners();
popupClassProfile.setEventListeners();
popupClassCard.setEventListeners();
api.getInitialCards()
  .then((result) => {
    cardsList.renderItems(result);
  })
  .catch(err => console.log(err))
api.getUserApiInfo()
  .then(res => {
    userInfoClass.setUserInfo(res.name, res.about);
    profileImage.src = res.avatar;
  })
  .catch(err => console.log(err))
popupAvatarFormValidator.enableValidation();
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();