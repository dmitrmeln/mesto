const pageContent = document.querySelector(".page__content");
const profileName = pageContent.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");
const profileEditButton = pageContent.querySelector(".profile__edit-button");
const profileAddButton = pageContent.querySelector(".profile__add-button");

const elementsContainer = pageContent.querySelector(".elements");

const editPopup = document.querySelector(".popup__edit");
const editPopupCloseButton = editPopup.querySelector(".popup__close-button");
const editFormElement = editPopup.querySelector(".popup__container");
const editFormFirstInput = editFormElement.querySelector(
  '.popup__text[name="popup__first-input"]'
);
const editFormSecondInput = editFormElement.querySelector(
  '.popup__text[name="popup__second-input"]'
);
const editFormSaveButton = editFormElement.querySelector(".popup__save-button");

const addPopup = document.querySelector(".popup__add");
const addPopupCloseButton = addPopup.querySelector(".popup__close-button");
const addFormElement = addPopup.querySelector(".popup__container");
const addFormFirstInput = addFormElement.querySelector(
  '.popup__text[name="popup__first-input"]'
);
const addFormSecondInput = addFormElement.querySelector(
  '.popup__text[name="popup__second-input"]'
);
const addFormSaveButton = addFormElement.querySelector(".popup__save-button");

const imagePopup = document.querySelector(".popup__open-image");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close-button");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

initialCards.forEach((item) => {
  const elementTemplate = document.querySelector("#element-template").content;
  const elementCard = elementTemplate.querySelector(".element").cloneNode(true);
  const elementLike = elementCard.querySelector(".element__like");
  const elementTrash = elementCard.querySelector(".element__trash");
  const elementImage = elementCard.querySelector(".element__image");

  elementCard.querySelector(".element__image").src = item.link;
  elementCard.querySelector(".element__image").alt = item.name;
  elementCard.querySelector(".element__heading").textContent = item.name;

  elementsContainer.append(elementCard);

  elementLike.addEventListener("click", function () {
    elementLike.classList.toggle("element__like_active");
  });

  elementTrash.addEventListener("click", function() {
    elementCard.remove()
  })

  elementImage.addEventListener("click", function openImagePopup() {
    imagePopup.classList.add("popup_opened")
    imagePopup.querySelector(".popup__image").src = item.link
    imagePopup.querySelector(".popup__image").alt = item.name
    imagePopup.querySelector(".popup__image-caption").textContent = item.name
  })
});

function openEditPopup() {
  editPopup.classList.add("popup_opened");
  editFormFirstInput.value = profileName.textContent;
  editFormSecondInput.value = profileOccupation.textContent;
}

function closeEditPopup() {
  editPopup.classList.remove("popup_opened");
}

function openAddPopup() {
  addPopup.classList.add("popup_opened");
  addFormFirstInput.value = "";
  addFormSecondInput.value = "";
}

function closeAddPopup() {
  addPopup.classList.remove("popup_opened");
}

function closeImagePopup() {
  imagePopup.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = editFormFirstInput.value;
  profileOccupation.textContent = editFormSecondInput.value;

  closeEditPopup();
}

function handleFormCreate(evt) {
  evt.preventDefault();

  const elementTemplate = document.querySelector("#element-template").content;
  const elementCard = elementTemplate.querySelector(".element").cloneNode(true);
  const elementLike = elementCard.querySelector(".element__like");
  const elementTrash = elementCard.querySelector(".element__trash");
  const elementImage = elementCard.querySelector(".element__image");

  elementCard.querySelector(".element__image").src = addFormSecondInput.value;
  elementCard.querySelector(".element__image").alt = addFormFirstInput.value;
  elementCard.querySelector(".element__heading").textContent =
    addFormFirstInput.value;
  elementsContainer.prepend(elementCard);

  elementLike.addEventListener("click", function () {
    elementLike.classList.toggle("element__like_active");
  });

  elementTrash.addEventListener("click", function() {
    elementCard.remove()
  })

  elementImage.addEventListener("click", function openImagePopup() {
    imagePopup.classList.add("popup_opened")
    imagePopup.querySelector(".popup__image").src = addFormSecondInput.value
    imagePopup.querySelector(".popup__image").alt = addFormFirstInput.value
    imagePopup.querySelector(".popup__image-caption").textContent = addFormFirstInput.value
  })

  closeAddPopup();
}

profileEditButton.addEventListener("click", openEditPopup);
editPopupCloseButton.addEventListener("click", closeEditPopup);
editFormElement.addEventListener("submit", handleFormSubmit);

profileAddButton.addEventListener("click", openAddPopup);
addPopupCloseButton.addEventListener("click", closeAddPopup);
addFormElement.addEventListener("submit", handleFormCreate);

imagePopupCloseButton.addEventListener("click", closeImagePopup)
