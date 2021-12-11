export const initialCards = [
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
export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };
export const profile = document.querySelector('.profile');
export const editButton = profile.querySelector('.profile__edit-button');
export const profileName = profile.querySelector('.profile__name');
export const profileActivity = profile.querySelector('.profile__activity');
export const popupProfile = document.querySelector('.popup_type_profile');
export const popupCloseButton = popupProfile.querySelector('.popup__close-button');
export const popupName = popupProfile.querySelector('.popup__input_type_name');
export const popupActivity = popupProfile.querySelector('.popup__input_type_activity');
export const popupProfileForm = popupProfile.querySelector('.popup__form_type_profile');
export const addButton = profile.querySelector('.profile__add-button');
export const popupCard = document.querySelector('.popup_type_card');
export const popupCardCloseButton = document.querySelector('.popup__close-button_type_card');
export const listElement = document.querySelector('.cards');
export const popupCardName = popupCard.querySelector('.popup__input_type_card-name');
export const popupCardLink = popupCard.querySelector('.popup__input_type_card-link');
export const popupCardForm = popupCard.querySelector('.popup__form_type_card');
export const popupTypeImage = document.querySelector('.popup_type_image');
export const popupImage = popupTypeImage.querySelector('.popup__image');
export const popupTypeImageFigcaption = popupTypeImage.querySelector('.popup__figcaption_type_image');
export const popupTypeImageCloseButton = popupTypeImage.querySelector('.popup__close-button_type_image');