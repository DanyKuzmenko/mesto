let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let profileActivity = profile.querySelector('.profile__activity');
let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close-icon');
let popupName = popup.querySelector('.popup__name');
let popupActivity = popup.querySelector('.popup__activity');
let popupButton = popup.querySelector('.popup__button');
function openPopup() {
    popup.setAttribute('style', 'display: block;');
}
editButton.addEventListener('click', openPopup);
function closePopup() {
    popup.setAttribute('style', 'display: none');
    popupName.value = profileName.textContent;
    popupActivity.value = profileActivity.textContent;
}
popupCloseButton.addEventListener('click', closePopup);
function formSubmitHandler (evt) {
    evt.preventDefault();
    let profileName = document.querySelector('.profile__name');
    let profileActivity = document.querySelector('.profile__activity');
    profileName.textContent = `${popupName.value}`;
    profileActivity.textContent = `${popupActivity.value}`;
    closePopup();
}
popupButton.addEventListener('click', formSubmitHandler);
