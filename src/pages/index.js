import "../pages/index.css";
import initialCards from "../utils/initial-cards";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const pageContent = document.querySelector(".page__content");
const profileName = pageContent.querySelector(".profile__name");
const profileOccupation = pageContent.querySelector(".profile__occupation");
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

const imagePopup = document.querySelector(".popup_type_image");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

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

const popupWithImage = new PopupWithImage(imagePopup);

const userInfo = new UserInfo({
  name: profileName,
  occupation: profileOccupation,
});

const popupWithProfileForm = new PopupWithForm(profilePopup, (data) => {
  userInfo.setUserInfo(data);
  popupWithProfileForm.close();
});

function createCardElement(data) {
  const card = new Card(
    { name: data.name, link: data.link },
    cardTemplate,
    (name, link) => {
      popupWithImage.open(name, link);
    }
  );

  const cardElement = card.getView();
  return cardElement;
}

const createCard = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const newCard = createCardElement(data);
      createCard.addItem(newCard);
    },
  },
  cardsContainer
);

const popupWithCardForm = new PopupWithForm(cardPopup, (data) => {
  createCard.renderer(data);
  popupWithCardForm.close();
});

createCard.renderItems(initialCards);

profileEditButton.addEventListener("click", () => {
  const profileInfo = userInfo.getUserInfo();

  popupWithProfileForm.open();
  profileFormName.value = profileInfo["name"];
  profileFormOccupation.value = profileInfo["occupation"];
  formValidators["profile-form"].resetValidation();
});

profileAddButton.addEventListener("click", () => {
  popupWithCardForm.open();
  formValidators["card-form"].resetValidation();
});

[popupWithImage, popupWithCardForm, popupWithProfileForm].forEach((element) => {
  element.setEventListeners();
});

enableValidation(validationConfig);
