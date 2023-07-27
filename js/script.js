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

  elementsContainer.prepend(
    createCard(secondInputPopupCard.value, firstInputPopupCard.value)
  );

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
  hideErrorsCheckButton(formPopupProfile, validationConfig)
});

profileAddButton.addEventListener("click", () => {
  formPopupCard.reset();
  openPopup(popupCard);
  hideErrorsCheckButton(formPopupCard, validationConfig)
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

enableValidation(validationConfig);
