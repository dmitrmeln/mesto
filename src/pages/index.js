import "../pages/index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupConfirmation from "../components/PopupConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const pageContent = document.querySelector(".page__content");
const profile = pageContent.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileAvatar = profile.querySelector(".profile__avatar");
const profileOccupation = profile.querySelector(".profile__occupation");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileAddButton = profile.querySelector(".profile__add-button");
const avatarEditButton = profile.querySelector(".profile__avatar-icon");

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
const deletePopup = document.querySelector(".popup_type_confirmation");
const avatarPopup = document.querySelector(".popup_type_avatar");

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

const optionsApi = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-75",
  headers: {
    authorization: "cf5e389c-5bff-4b17-a8e7-c8d5e48b21ed",
    "Content-Type": "application/json",
  },
};

const api = new Api(optionsApi);

api.getInitialCards().then((result) => {
  createCard.renderItems(result);
});

api.getUserInfo().then((result) => {
  profile.id = result._id;
  profileName.textContent = result.name;
  profileOccupation.textContent = result.about;
  profileAvatar.src = result.avatar;
});

const popupWithImage = new PopupWithImage(imagePopup);

const userInfo = new UserInfo({
  name: profileName,
  occupation: profileOccupation,
  avatar: profileAvatar,
});

const popupWithProfileForm = new PopupWithForm(profilePopup, (data) => {
  renderLoading(true, profilePopup);
  api
    .changeUserInfo({ name: data.popup__name, about: data.popup__occupation })
    .then((result) => {
      data.popup__name = result.name;
      data.popup__occupation = result.about;
    })
    .finally(() => {
      renderLoading(false, profilePopup);
    });

  userInfo.setUserInfo(data);
  popupWithProfileForm.close();
});

const popupWithAvatarForm = new PopupWithForm(avatarPopup, (data) => {
  renderLoading(true, avatarPopup);
  api
    .changeAvatar({ avatar: data.link })
    .then((result) => {
      profileAvatar.src = result.avatar;
    })

    .finally(() => {
      renderLoading(false, avatarPopup);
    });
  popupWithAvatarForm.close();
});

avatarEditButton.addEventListener("click", () => {
  popupWithAvatarForm.open();
  formValidators["avatar-form"].resetValidation();
});

const createCardElement = (data) => {
  const profileId = profile.id;
  const card = new Card(
    data,
    cardTemplate,
    (name, link) => {
      popupWithImage.open(name, link);
    },
    () => {
      popupConfirmation.open();
      popupConfirmation.setEventListeners();
    },
    (id) => {
      api.likeCard(id).then((result) => {
        data.likes = result.likes;
        cardElementLikeCounter.textContent = result.likes.length;
      });
    },
    (id) => {
      api.unlikeCard(id).then((result) => {
        data.likes = result.likes;
        cardElementLikeCounter.textContent = result.likes.length;
      });
    }
  );

  const popupConfirmation = new PopupConfirmation(deletePopup, card, () => {
    api.deleteCard(card._id).then(() => {
      card.removeCard();
    });

    popupConfirmation.close();
  });

  const cardElement = card.getView();
  const cardElementLike = cardElement.querySelector(".card__like");
  const cardElementLikeCounter = cardElement.querySelector(
    ".card__like-counter"
  );

  cardElementLikeCounter.textContent = data.likes.length;

  data.likes.forEach((like) => {
    if (like._id === profileId) {
      cardElementLike.classList.add("card__like_active");
    }
  });

  if (data.owner._id === profileId) {
    card.deleteBtnActivation();
  }

  return cardElement;
};

const createCard = new Section(
  {
    items: [],
    renderer: (data) => {
      const newCard = createCardElement(data);
      createCard.addItem(newCard);
    },
  },
  cardsContainer
);

const popupWithCardForm = new PopupWithForm(cardPopup, (data) => {
  renderLoading(true, cardPopup);
  api
    .createNewCard(data)
    .then((result) => {
      createCard.renderer(result);
    })

    .finally(() => {
      renderLoading(false, cardPopup);
    });
  popupWithCardForm.close();
});

function renderLoading(isLoading, popupElement) {
  if (isLoading) {
    if (popupElement === cardPopup) {
      popupElement.querySelector(".popup__button").textContent = "Создание...";
    } else {
      popupElement.querySelector(".popup__button").textContent =
        "Сохранение...";
    }
  } else {
    if (popupElement === cardPopup) {
      popupElement.querySelector(".popup__button").textContent = "Создать";
    } else {
      popupElement.querySelector(".popup__button").textContent = "Сохранить";
    }
  }
}

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

[
  popupWithImage,
  popupWithAvatarForm,
  popupWithCardForm,
  popupWithProfileForm,
].forEach((element) => {
  element.setEventListeners();
});

enableValidation(validationConfig);
