import '../pages/index.css';
import initialCards from "./initial-cards.js";
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

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
const cardForm = document.forms["card-form"];

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

const popupWithProfileForm = new PopupWithForm(
    profilePopup,
    (data) => {
      userInfo.setUserInfo(data);
      popupWithProfileForm.close();
    }
  );

const addInitialCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        item.name,
        item.link,
        cardTemplate,
        (name, link) => {popupWithImage.open(name, link)}
      );

      const cardElement = card.getView();
      addInitialCards.addItem(cardElement);
    },
  },
  cardsContainer
);

addInitialCards.renderItems();

const popupWithCardForm = new PopupWithForm(
  cardPopup,
  (data) => {
    const createCard = new Section(
      {
        items: [data],
        renderer: () => {
          const card = new Card(
            data['popup__card-name'],
            data['popup__card-link'],
            cardTemplate,
            (name, link) => {popupWithImage.open(name, link)}
          );

          const cardElement = card.getView();
          createCard.addItem(cardElement);
        },
      },
      cardsContainer
    );

    createCard.renderItems();
    popupWithCardForm.close();
  });

profileEditButton.addEventListener("click", () => {
  popupWithProfileForm.open();
  profileFormName.value = userInfo.getUserInfo()["name"];
  profileFormOccupation.value = userInfo.getUserInfo()["occupation"];
  formValidators["profile-form"].resetValidation();
});

profileAddButton.addEventListener("click", () => {
  cardForm.reset();
  popupWithCardForm.open();
  formValidators["card-form"].resetValidation();
});

[popupWithImage, popupWithCardForm, popupWithProfileForm].forEach((element) => {
  element.setEventListeners()
});

enableValidation(validationConfig);
