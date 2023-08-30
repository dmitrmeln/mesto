import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
  }

  _getInputValues() {
    const inputs = Array.from(this._form.querySelectorAll('.popup__input'))
    const values = {}

    inputs.forEach((input) => {
      values[input.name] = input.value
    })

    return values
  }

  setEventListeners() {
    this._popup.addEventListener("submit", (event) => {
      event.preventDefault()
      this._handleFormSubmit(this._getInputValues())
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }
}

export default PopupWithForm;
