class Card {
  constructor(name, link, cardTemplate, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
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

  _setEventListeners() {
    this._likeButton.addEventListener("click", function () {
      this.classList.toggle("card__like_active");
    });

    this._deleteButton.addEventListener("click", () => {
      this._newCard.remove();
      this._newCard = null;
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  getView() {
    this._newCard = this._generateCard();

    this._cardImage.src = this._link;
    this._cardHeading.textContent = this._name;
    this._cardImage.alt = this._name;

    this._setEventListeners();

    return this._newCard;
  }
}

export default Card;
