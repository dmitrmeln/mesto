import initialCards from "./initial-cards.js";
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

const pageContent = document.querySelector(".page__content");
const profileName = pageContent.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");
const profileEditButton = pageContent.querySelector(".profile__edit-button");
const profileAddButton = pageContent.querySelector(".profile__add-button");

const cardsContainer = pageContent.querySelector(".cards");
const cardTemplate = document.querySelector("#card-template");

const profilePopup = document.querySelector(".popup_type_edit");
const profileForm = document.forms["profile-form"];
const profileFormName = profileForm.querySelector(
  '.popup__input[name="popup__name"]'
);
const profileFormOccupation = profileForm.querySelector(
  '.popup__input[name="popup__occupation"]'
);

const cardPopup = document.querySelector(".popup_type_add");
const cardForm = document.forms["card-form"];
const cardFormName = cardForm.querySelector(
  '.popup__input[name="popup__card-name"]'
);
const cardFormLink = cardForm.querySelector(
  '.popup__input[name="popup__card-link"]'
);

const imagePopup = document.querySelector(".popup_type_image");
const imagePopupPicture = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__image-caption");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const popupList = Array.from(document.querySelectorAll(".popup"));

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

function createCard(item) {
  const cardElement = new Card(
    item.name,
    item.link,
    cardTemplate,
    handleCardClick
  );
  return cardElement.getView();
}

initialCards.forEach((item) => {
  const newCard = createCard(item);
  cardsContainer.prepend(newCard);
});

function handleCardFormCreate(evt) {
  evt.preventDefault();

  const renderCard = {};
  const cardName = cardFormName.value;
  const cardLink = cardFormLink.value;

  renderCard["name"] = cardName;
  renderCard["link"] = cardLink;

  const newCard = createCard(renderCard);

  cardsContainer.prepend(newCard);

  closePopup(cardPopup);
  cardForm.reset();
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

function handleCardClick(name, link) {
  imagePopupPicture.alt = name;
  imagePopupCaption.textContent = name;
  imagePopupPicture.src = link;
  openPopup(imagePopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = profileFormName.value;
  profileOccupation.textContent = profileFormOccupation.value;

  closePopup(profilePopup);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

profileEditButton.addEventListener("click", () => {
  openPopup(profilePopup);
  profileFormName.value = profileName.textContent;
  profileFormOccupation.value = profileOccupation.textContent;
  formValidators["profile-form"].resetValidation();
});

profileAddButton.addEventListener("click", () => {
  cardForm.reset();
  openPopup(cardPopup);
  formValidators["card-form"].resetValidation();
});

profileForm.addEventListener("submit", handleProfileFormSubmit);

cardForm.addEventListener("submit", handleCardFormCreate);

popupList.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }

    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});

enableValidation(validationConfig);
