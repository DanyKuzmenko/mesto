export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    spanErrorClass: 'popup__error'
  };
export const profile = document.querySelector('.profile');
export const editButton = profile.querySelector('.profile__edit-button');
export const popupProfile = document.querySelector('.popup_type_profile');
export const popupName = popupProfile.querySelector('.popup__input_type_name');
export const popupActivity = popupProfile.querySelector('.popup__input_type_activity');
export const popupProfileForm = popupProfile.querySelector('.popup__form_type_profile');
export const popupCard = document.querySelector('.popup_type_card');
export const popupCardForm = popupCard.querySelector('.popup__form_type_card');
export const addButton = profile.querySelector('.profile__add-button');
export const profileImage = profile.querySelector('.profile__avatar');
export const popupAvatar = document.querySelector('.popup_type_update-avatar');
export const popupAvatarForm = popupAvatar.querySelector('.popup__form_type_update-avatar');
export const deleteCardButton = document.querySelector('.card__delete-icon');
export const popupDeleteCardForm = document.querySelector('.popup__form_type_delete-card');