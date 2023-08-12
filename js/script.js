import initialCards from "./initial-cards.js";
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

const pageContent = document.querySelector(".page__content");
const profileName = pageContent.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");
const profileEditButton = pageContent.querySelector(".profile__edit-button");
const profileAddButton = pageContent.querySelector(".profile__add-button");

const elementsContainer = pageContent.querySelector(".elements");

const popupProfile = document.querySelector(".popup_type_edit");
const formPopupProfile = popupProfile.querySelector(".popup__form");
const firstInputPopupProfile = formPopupProfile.querySelector(
  '.popup__input[name="popup__name"]'
);
const secondInputPopupProfile = formPopupProfile.querySelector(
  '.popup__input[name="popup__occupation"]'
);

const popupCard = document.querySelector(".popup_type_add");
const formPopupCard = popupCard.querySelector(".popup__form");
const firstInputPopupCard = formPopupCard.querySelector(
  '.popup__input[name="popup__card-name"]'
);
const secondInputPopupCard = formPopupCard.querySelector(
  '.popup__input[name="popup__card-link"]'
);

const popupBigImage = document.querySelector(".popup_type_image");
const picturePopupBigImage = popupBigImage.querySelector(".popup__image");
const captionPopupBigImage = popupBigImage.querySelector(
  ".popup__image-caption"
);

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const popupList = Array.from(document.querySelectorAll(".popup"));

const profileFormValidator = new FormValidator(validationConfig, formPopupProfile);
const cardFormValidator = new FormValidator(validationConfig, formPopupCard);

initialCards.forEach((item) => {
  const newCard = new Card(item.name, item.link);
  elementsContainer.prepend(newCard.getView());
});

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = firstInputPopupProfile.value;
  profileOccupation.textContent = secondInputPopupProfile.value;

  closePopup(popupProfile);
}

function handleFormCreate(evt) {
  evt.preventDefault();

  const newCard = new Card(
    firstInputPopupCard.value,
    secondInputPopupCard.value
  );
  elementsContainer.prepend(newCard.getView());

  closePopup(popupCard);
  formPopupCard.reset();
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

profileEditButton.addEventListener("click", () => {
  openPopup(popupProfile);
  firstInputPopupProfile.value = profileName.textContent;
  secondInputPopupProfile.value = profileOccupation.textContent;
  profileFormValidator.hideErrorsCheckButton();
});

profileAddButton.addEventListener("click", () => {
  formPopupCard.reset();
  openPopup(popupCard);
  cardFormValidator.hideErrorsCheckButton();
});

formPopupProfile.addEventListener("submit", handleFormSubmit);

formPopupCard.addEventListener("submit", handleFormCreate);

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

elementsContainer.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("element__image")) {
    openPopup(popupBigImage);
    picturePopupBigImage.src = evt.target.src;
    picturePopupBigImage.alt = evt.target.alt;
    captionPopupBigImage.textContent = evt.target.alt;
  }
});

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
