let pageContent = document.querySelector('.page__content');
let profileName = pageContent.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation');
let profileEditButton = pageContent.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close-button');
let formElement = popup.querySelector('.popup__container');
let formName = formElement.querySelector('.popup__text[name="popup__form_profile_name"]');
let formOccupation = formElement.querySelector('.popup__text[name="popup__form_profile_occupation"]');
let formSaveButton = formElement.querySelector('.popup__save-button');

function openPopup() {
  popup.classList.add('popup_opened');
  formName.value = profileName.textContent;
  formOccupation.value = profileOccupation.textContent;
};

function closePopup() {
  popup.classList.remove('popup_opened');
};

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileOccupation.textContent = formOccupation.value;
  closePopup()
}

profileEditButton.addEventListener('click', openPopup);

popupCloseButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', handleFormSubmit);

