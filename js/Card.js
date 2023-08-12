class Card {
  constructor(name, link) {
    this._name = name;
    this._link = link;
  }

  _getTemplate() {
    const cardTemplate = document
    .querySelector("#element-template")
    .content.querySelector(".element")
    .cloneNode(true)

    return cardTemplate;
  }

  _handleLikeBtn() {
    const cardLike = this._newCard.querySelector(".element__like");
    cardLike.addEventListener("click", function () {
      cardLike.classList.toggle("element__like_active");
    });
  }

  _handleTrashBtn() {
    const cardTrash = this._newCard.querySelector(".element__trash");
    cardTrash.addEventListener("click", () => {
      this._newCard.remove();
      this._newCard = null;
    });
  }

  getView() {
    this._newCard = this._getTemplate()

    const cardImage = this._newCard.querySelector(".element__image");
    const cardHeading = this._newCard.querySelector(".element__heading");

    cardImage.src = this._link;
    cardHeading.textContent = this._name;
    cardImage.alt = this._name;

    this._handleLikeBtn()
    this._handleTrashBtn()

    return this._newCard;
  }
}

export default Card;
