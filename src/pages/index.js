import '../pages/index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { config } from "../utils/constants.js";
import {popupProfileForm, editButton, addButton, popupCardForm,
  popupName, popupActivity, profileImage, popupAvatarForm, popupDeleteCardForm, popupButton} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from '../components/Api';
import PopupCardDelete from '../components/PopupCardDelete.js';

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
const popupCardDelete = new PopupCardDelete({
  popupSelector: '.popup_type_delete-card', 
  handleFormSubmit: (cardId, element) => {
    api.deleteApiCard(cardId)
      .catch(err => console.log(err));
    element.remove();
    popupCardDelete.close();
  }
})
const popupClassProfile = new PopupWithForm('.popup_type_profile', {
  submitForm: (formValues) => {
    renderLoading(true);
    api.sendUserApiInfo(formValues.inputName, formValues.inputActivity)
      .catch(err => console.log(err))
      .finally(renderLoading(false));
    userInfoClass.setUserInfo(formValues.inputName, formValues.inputActivity);
    popupClassProfile.close();
  }
});
const popupClassCard = new PopupWithForm('.popup_type_card', {
  submitForm: (formValues) => {
    renderLoading(true);
    const data = userInfoClass.getUserInfo();
    const item = {
      name: formValues.inputCardName,
      link: formValues.inputCardLink,
      owner: {
      _id: data.id
      },
      likes: []
    }
    api.sendCardInfo(item.name, item.link)
      .catch(err => console.log(err))
      .finally(renderLoading(false));
    cardsList.prependItem(createCard(item));
    popupClassCard.close();
  }
});
const popupClassAvatar = new PopupWithForm('.popup_type_update-avatar', {
  submitForm: (formValues) => {
    renderLoading(true);
    profileImage.src = formValues.inputAvatarLink;
    api.updateAvatar(formValues.inputAvatarLink)
      .catch(err => console.log(err))
      .finally(renderLoading(false));
    popupClassAvatar.close();
  }
})
const cardsList = new Section({
  renderer: (item) => {
    cardsList.addItem(createCard(item));
  }
}, '.cards');
function renderLoading(isLoading) {
  if (isLoading) {
    popupButton.textContent = 'Сохранение';
  } else {
    popupButton.textContent = "Сохранить";
  }
}
function handleCardClick(title, image){
  popupWithImage.open(title, image);
}
function createCard(card){
  const userId = userInfoClass.getUserId();
  const element = new Card(card, '.template', handleCardClick, popupDeleteCardForm, popupCardDelete, userId, {
    cardLike: (cardId) => {
      return api.likeCard(cardId)
        .catch(err => console.log(err));
    },
    cardDislike: (cardId) => {
      return api.deleteLikeCard(cardId)
        .catch(err => console.log(err));
    }
  });
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
  popupAvatarFormValidator.resetValidation();
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
popupCardDelete.setEventListeners();
popupClassAvatar.setEventListeners();
popupWithImage.setEventListeners();
popupClassProfile.setEventListeners();
popupClassCard.setEventListeners();
Promise.all([api.getUserApiInfo(), api.getInitialCards()])
  .then((res) => {
    const [user, cards] = res;
    userInfoClass.setUserInfo(user.name, user.about, user._id);
    cardsList.renderItems(cards);
    profileImage.src = user.avatar;
  })
  .catch(err => console.log(err));
popupAvatarFormValidator.enableValidation();
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();