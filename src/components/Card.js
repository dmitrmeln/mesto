class Card {
  constructor(
    { name, link, _id },
    cardTemplate,
    handleCardClick,
    handleCardDeleteBtn,
    handleLikeClick,
    handleUnlikeClick
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleCardDeleteBtn = handleCardDeleteBtn;
    this._handleLikeClick = handleLikeClick;
    this._handleUnlikeClick = handleUnlikeClick;
    this._likeActivation = this._likeActivation.bind(this);
    this._handleClickBtnDelete = this._handleClickBtnDelete.bind(this);
    this._cardClick = this._cardClick.bind(this);
    this._handleClickBtnDelete = this._handleClickBtnDelete.bind(this);
  }

  _generateCard() {
    const cardElement = this._cardTemplate.content
      .querySelector(".card")
      .cloneNode(true);

    this._likeButton = cardElement.querySelector(".card__like");
    this._deleteButton = cardElement.querySelector(".card__trash");
    this._cardImage = cardElement.querySelector(".card__image");
    this._cardHeading = cardElement.querySelector(".card__heading");

    return cardElement;
  }

  _likeActivation() {
    this._likeButton.classList.toggle("card__like_active");
    if (this._likeButton.classList.contains("card__like_active")) {
      this._handleLikeClick(this._id);
    } else {
      this._handleUnlikeClick(this._id);
    }
  }

  _handleClickBtnDelete() {
    this._handleCardDeleteBtn(this._id);
  }

  _cardClick() {
    this._handleCardClick(this._name, this._link);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._likeActivation);
    this._deleteButton.addEventListener("click", this._handleClickBtnDelete);
    this._cardImage.addEventListener("click", this._cardClick);
  }

  getView() {
    this._newCard = this._generateCard();

    this._cardImage.src = this._link;
    this._cardHeading.textContent = this._name;
    this._cardImage.alt = this._name;

    this._setEventListeners();

    return this._newCard;
  }

  removeCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  deleteBtnActivation() {
    this._deleteButton.classList.add("card__trash_active");
  }
}

export default Card;
