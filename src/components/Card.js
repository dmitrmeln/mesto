class Card {
  constructor(
    { name, link },
    profileId,
    cardTemplate,
    handleCardClick,
    handleCardDeleteBtn,
    handleLikeClick,
    handleUnlikeClick
  ) {
    this._name = name;
    this._link = link;
    this._id = profileId;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleCardDeleteBtn = handleCardDeleteBtn;
    this._handleLikeClick = handleLikeClick;
    this._handleUnlikeClick = handleUnlikeClick;
    this._handleLike = this._handleLike.bind(this);
    this._handleClickBtnDelete = this._handleClickBtnDelete.bind(this);
    this._clickCard = this._clickCard.bind(this);
    this._handleClickBtnDelete = this._handleClickBtnDelete.bind(this);
  }

  _generateCard() {
    const cardElement = this._cardTemplate.content
      .querySelector(".card")
      .cloneNode(true);

    this._cardId = cardElement["_cardId"];
    this._likeButton = cardElement.querySelector(".card__like");
    this._likeCounter = cardElement.querySelector(".card__like-counter");
    this._deleteButton = cardElement.querySelector(".card__trash");
    this._cardImage = cardElement.querySelector(".card__image");
    this._cardHeading = cardElement.querySelector(".card__heading");

    return cardElement;
  }

  _handleLike() {
    if (this._likeButton.classList.contains("card__like_active")) {
      this._handleUnlikeClick(this._id);
    } else {
      this._handleLikeClick(this._id);
    }
  }

  _handleClickBtnDelete() {
    this._handleCardDeleteBtn(this._id);
  }

  _clickCard() {
    this._handleCardClick(this._name, this._link);
  }

  toggleLikes(data) {
    this._likeCounter.textContent = data.likes.length;
    if (this._likeButton.classList.contains("card__like_active")) {
      this._likeButton.classList.add("card__like_active");
    } else {
      this._likeButton.classList.remove("card__like_active");
    }
    this._likeButton.classList.toggle("card__like_active");
  }

  checkLikeStatus(data) {
    this._likeCounter.textContent = data.likes.length;

    data.likes.forEach((like) => {
      if (like._id === this._id) {
        this._likeButton.classList.add("card__like_active");
      }
    });
  }

  activateDeleteBtn(data) {
    if (data.owner._id === this._id) {
      this._deleteButton.classList.add("card__trash_active");
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLike);
    this._deleteButton.addEventListener("click", this._handleClickBtnDelete);
    this._cardImage.addEventListener("click", this._clickCard);
  }

  getView(data) {
    this._newCard = this._generateCard();
    this._cardImage.src = this._link;
    this._cardHeading.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardId = data._id;
    this._setEventListeners();

    return this._newCard;
  }

  removeCard() {
    this._newCard.remove();
    this._newCard = null;
  }
}

export default Card;
