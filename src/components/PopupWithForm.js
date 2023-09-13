import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = Array.from(this._form.querySelectorAll(".popup__input"));
    this._submitBtn = this._popup.querySelector(".popup__button");
    this._submitBtnText = this._submitBtn.textContent;
  }

  _getInputValues() {
    const values = {};

    this._inputList.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

  renderLoading(isLoading, loadingText) {
    if (isLoading) {
      this._submitBtn.textContent = loadingText;
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
  }

  setEventListeners() {
    this._popup.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}

export default PopupWithForm;
