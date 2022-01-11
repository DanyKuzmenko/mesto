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
      .then(() => {
        element.remove();
        popupCardDelete.close();
      })
      .catch(err => console.log(err));
  }
})
const popupClassProfile = new PopupWithForm('.popup_type_profile', {
  submitForm: (formValues, formButton) => {
    renderLoading(true, formButton);
    api.sendUserApiInfo(formValues.inputName, formValues.inputActivity)
      .then(() => {
        userInfoClass.setUserInfo(formValues.inputName, formValues.inputActivity);
        popupClassProfile.close();
      })
      .catch(err => console.log(err))
      .finally(() => renderLoading(false, formButton));
  }
});
const popupClassCard = new PopupWithForm('.popup_type_card', {
  submitForm: (formValues, formButton) => {
    formButton.textContent = 'Создание...'; // здесь не использовал функцию renderLoading, потому что текст другой
    const item = {
      name: formValues.inputCardName,
      link: formValues.inputCardLink
    }
    api.sendCardInfo(item.name, item.link)
      .then((res) => {
        item.owner = {
          _id: res.owner._id
        }
        item.likes = res.likes;
        item._id = res._id;
        cardsList.prependItem(createCard(item));
        popupClassCard.close();
      })
      .catch(err => console.log(err))
      .finally(() => formButton.textContent = 'Создать');
  }
});
const popupClassAvatar = new PopupWithForm('.popup_type_update-avatar', {
  submitForm: (formValues, formButton) => {
    renderLoading(true, formButton);
    api.updateAvatar(formValues.inputAvatarLink)
      .then(() => {
        profileImage.src = formValues.inputAvatarLink;
        popupClassAvatar.close();
      })
      .catch(err => console.log(err))
      .finally(() => renderLoading(false, formButton));
  }
})
const cardsList = new Section({
  renderer: (item) => {
    cardsList.addItem(createCard(item));
  }
}, '.cards');
function renderLoading(isLoading, formButton) {
  if (isLoading) {
    formButton.textContent = 'Сохранение...';
  } else {
    formButton.textContent = "Сохранить";
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
    },
    cardDislike: (cardId) => {
      return api.deleteLikeCard(cardId)
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