export const pageContent = document.querySelector(".page__content");
export const profile = pageContent.querySelector(".profile");
export const profileName = profile.querySelector(".profile__name");
export const profileAvatar = profile.querySelector(".profile__avatar");
export const profileAbout = profile.querySelector(".profile__about");
export const profileEditButton = profile.querySelector(".profile__edit-button");
export const profileAddButton = profile.querySelector(".profile__add-button");
export const avatarEditButton = profile.querySelector(".profile__avatar-icon");
export const cardsContainer = pageContent.querySelector(".cards");
export const cardTemplate = document.querySelector("#card-template");
export const profilePopup = document.querySelector(".popup_type_edit");
export const cardPopup = document.querySelector(".popup_type_add");
export const imagePopup = document.querySelector(".popup_type_image");
export const deletePopup = document.querySelector(".popup_type_confirmation");
export const avatarPopup = document.querySelector(".popup_type_avatar");

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const optionsApi = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-75",
  headers: {
    authorization: "cf5e389c-5bff-4b17-a8e7-c8d5e48b21ed",
    "Content-Type": "application/json",
  },
};
