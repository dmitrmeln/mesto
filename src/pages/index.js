import "../pages/index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupConfirmation from "../components/PopupConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  profile,
  profileName,
  profileAvatar,
  profileAbout,
  profileEditButton,
  profileAddButton,
  avatarEditButton,
  cardsContainer,
  cardTemplate,
  profilePopup,
  cardPopup,
  imagePopup,
  deletePopup,
  avatarPopup,
  validationConfig,
  optionsApi,
} from "../utils/constants.js";

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

const api = new Api(optionsApi);

const userInfo = new UserInfo({
  name: profileName,
  about: profileAbout,
  avatar: profileAvatar,
  _id: profile.id,
});

let profileId = null;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([InitialCards, userData]) => {
    userInfo.setUserInfo(userData);
    profileId = userData._id;
    createCard.renderItems(InitialCards);
  })

  .catch((error) => {
    console.log(error);
  });

const popupWithImage = new PopupWithImage(imagePopup);
const popupWithProfileForm = new PopupWithForm(
  profilePopup,
  handleProfileSubmit
);
const popupWithAvatarForm = new PopupWithForm(avatarPopup, handleAvatarSubmit);
const popupWithCardForm = new PopupWithForm(cardPopup, handleCardSubmit);

function handleSubmit(request, popupInstance, loadingText = "Сохранение...") {
  popupInstance.renderLoading(true, loadingText);
  request()
    .then(() => {
      popupInstance.close();
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}

function handleProfileSubmit(data) {
  function makeRequest() {
    return api.changeUserInfo(data).then((userData) => {
      userInfo.setUserInfo(userData);
    });
  }

  handleSubmit(makeRequest, popupWithProfileForm);
}

function handleAvatarSubmit(data) {
  function makeRequest() {
    return api.changeAvatar({ avatar: data.link }).then((result) => {
      userInfo.setUserInfo(result);
    });
  }

  handleSubmit(makeRequest, popupWithAvatarForm);
}

function handleCardSubmit(data) {
  function makeRequest() {
    return api.createNewCard(data).then((result) => {
      createCard.renderer(result);
    });
  }

  handleSubmit(makeRequest, popupWithCardForm, "Создание...");
}

avatarEditButton.addEventListener("click", () => {
  popupWithAvatarForm.open();
  formValidators["avatar-form"].resetValidation();
});

const createCardElement = (data) => {
  const card = new Card(
    data,
    profileId,
    cardTemplate,
    (name, link) => {
      popupWithImage.open(name, link);
      console.log(userInfo.getUserInfo());
    },
    () => {
      popupConfirmation.open();
    },
    () => {
      api
        .likeCard(data._id)
        .then((result) => {
          data.likes = result.likes;
          card.toggleLikes(result);
        })

        .catch((error) => {
          console.log(error);
        });
    },
    () => {
      api
        .unlikeCard(data._id)
        .then((result) => {
          data.likes = result.likes;
          card.toggleLikes(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  );

  const popupConfirmation = new PopupConfirmation(deletePopup, card, () => {
    api
      .deleteCard(card._cardId)
      .then(() => {
        card.removeCard();
        popupConfirmation.close();
      })

      .catch((error) => {
        console.log(error);
      });
  });

  popupConfirmation.setEventListeners();

  const cardElement = card.getView(data);

  card.checkLikeStatus(data);
  card.activateDeleteBtn(data);

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

profileEditButton.addEventListener("click", () => {
  popupWithProfileForm.open();
  popupWithProfileForm.setInputValues(userInfo.getUserInfo());
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
