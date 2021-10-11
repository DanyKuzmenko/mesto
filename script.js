let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let profileActivity = profile.querySelector('.profile__activity');
let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close-button');
let popupName = popup.querySelector('.popup__input_type_name');
let popupActivity = popup.querySelector('.popup__input_type_activity');
let popupForm = popup.querySelector('.popup__form');
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
editButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmitHandler);
