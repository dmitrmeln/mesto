import Popup from "./Popup.js";

class PopupConfirmation extends Popup {
  constructor(popupSelector, card, handleConfirmBtn) {
    super(popupSelector);
    this._card = card;
    this._handleConfirmBtn = handleConfirmBtn;
    this._confirmButton = this._popup.querySelector(".popup__button");
    this._confirmationClick = this._confirmationClick.bind(this);
  }

  _confirmationClick() {
    this._handleConfirmBtn(this._card);
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", this._confirmationClick);
  }

  close() {
    super.close();
    this._confirmButton.removeEventListener("click", this._confirmationClick);
  }
}

export default PopupConfirmation;
