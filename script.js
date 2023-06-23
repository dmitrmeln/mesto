let pageContent = document.querySelector('.page__content');
let popup = document.querySelector('.popup');
let editButton = pageContent.querySelector('.profile__edit-button');
let closeButton = popup.querySelector('.popup__close-button');
let saveButton = document.querySelector('.popup__save-button');
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__name');
let occupationInput = formElement.querySelector('.popup__occupation');
let nameProfile = document.querySelector('.profile__name');
let occupationProfile = document.querySelector('.profile__occupation');
let like = document.querySelectorAll('.element__like')

function openPopup() {
  popup.classList.add('popup_opened');
};

function closePopup() {
  popup.classList.remove('popup_opened');
};

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

function handleFormSubmit (evt) {
  evt.preventDefault();
  let nameValue = nameInput.value;
  let occupationValue = occupationInput.value;
  nameProfile.textContent = nameValue;
  occupationProfile.textContent = occupationValue;
}

saveButton.addEventListener('click', handleFormSubmit);

for (let i = 0; i < like.length; i++) {
  like[i].addEventListener("click", function() {
    like[i].classList.toggle("element__like_active");
  });
}

