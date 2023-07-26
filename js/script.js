const pageContent = document.querySelector(".page__content");
const profileName = pageContent.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");
const profileEditButton = pageContent.querySelector(".profile__edit-button");
const profileAddButton = pageContent.querySelector(".profile__add-button");

const elementsContainer = pageContent.querySelector(".elements");

const popupProfile = document.querySelector(".popup_type_edit");
const buttonClosePopupProfile = popupProfile.querySelector(
  ".popup__close-button"
);
const formPopupProfile = popupProfile.querySelector(".popup__form");
const firstInputPopupProfile = formPopupProfile.querySelector(
  '.popup__input[name="popup__name"]'
);
const secondInputPopupProfile = formPopupProfile.querySelector(
  '.popup__input[name="popup__occupation"]'
);

const popupCard = document.querySelector(".popup_type_add");
const buttonClosePopupCard = popupCard.querySelector(".popup__close-button");
const formPopupCard = popupCard.querySelector(".popup__form");
const firstInputPopupCard = formPopupCard.querySelector(
  '.popup__input[name="popup__card-name"]'
);
const secondInputPopupCard = formPopupCard.querySelector(
  '.popup__input[name="popup__card-link"]'
);

const popupBigImage = document.querySelector(".popup_type_image");
const buttonClosePopupImage = popupBigImage.querySelector(
  ".popup__close-button"
);
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

function createCard(link, name) {
  const elementTemplate = document.querySelector("#element-template").content;
  const elementCard = elementTemplate.querySelector(".element").cloneNode(true);
  const elementLike = elementCard.querySelector(".element__like");
  const elementTrash = elementCard.querySelector(".element__trash");
  const elementImage = elementCard.querySelector(".element__image");
  const elementHeading = elementCard.querySelector(".element__heading");

  elementImage.src = link;
  elementHeading.textContent = name;
  elementImage.alt = name;

  elementLike.addEventListener("click", function () {
    elementLike.classList.toggle("element__like_active");
  });

  elementTrash.addEventListener("click", function () {
    elementCard.remove();
  });

  elementImage.addEventListener("click", function openPopupBigImage() {
    openPopup(popupBigImage);
    picturePopupBigImage.src = elementImage.src;
    picturePopupBigImage.alt = elementImage.alt;
    captionPopupBigImage.textContent = elementImage.alt;
  });

  return elementCard;
}

initialCards.forEach((item) => {
  elementsContainer.prepend(createCard(item.link, item.name));
});

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = firstInputPopupProfile.value;
  profileOccupation.textContent = secondInputPopupProfile.value;

  closePopup(popupProfile);
}

function handleFormCreate(evt) {
  evt.preventDefault();

  elementsContainer.prepend(
    createCard(secondInputPopupCard.value, firstInputPopupCard.value)
  );

  closePopup(popupCard);
  formPopupCard.reset();
}

profileEditButton.addEventListener("click", () => {
  openPopup(popupProfile);
  firstInputPopupProfile.value = profileName.textContent;
  secondInputPopupProfile.value = profileOccupation.textContent;
  enableValidation(validationConfig);
});

buttonClosePopupProfile.addEventListener("click", () => {
  closePopup(popupProfile);
});

formPopupProfile.addEventListener("submit", handleFormSubmit);

profileAddButton.addEventListener("click", () => {
  openPopup(popupCard);
  enableValidation(validationConfig);
});

buttonClosePopupCard.addEventListener("click", () => {
  closePopup(popupCard);
  formPopupCard.reset();
});

formPopupCard.addEventListener("submit", handleFormCreate);

buttonClosePopupImage.addEventListener("click", () => {
  closePopup(popupBigImage);
});

function clickClosePopup(popup) {
  popup.addEventListener("click", (evt) => {
    closePopup(evt.target);
  });

  popup.removeEventListener("click", clickClosePopup);
}

function escapeClosePopup(popup) {
  document.addEventListener("keydown", (evt) => {
    const key = evt.key;
    if (key === "Escape") {
      closePopup(popup);
    }
  });

  document.removeEventListener("keydown", escapeClosePopup);
};

popupList.forEach((popup) => {
  clickClosePopup(popup);

  escapeClosePopup(popup);
});
