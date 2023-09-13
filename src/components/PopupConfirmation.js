import Popup from "./Popup.js";

class PopupConfirmation extends Popup {
  constructor(popupSelector, card, handleConfirmBtn) {
    super(popupSelector);
    this._card = card;
    this._handleConfirmBtn = handleConfirmBtn;
    this._confirmButton = this._popup.querySelector(".popup__button");
    this._handleConfirmation = this._handleConfirmation.bind(this);
  }

  _handleConfirmation() {
    this._handleConfirmBtn(this._card);
  }

  open() {
    super.open();
    this._confirmButton.addEventListener("click", this._handleConfirmation);
  }

  close() {
    super.close();
    this._confirmButton.removeEventListener("click", this._handleConfirmation);
  }
}

export default PopupConfirmation;
