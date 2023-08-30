class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }

      if (evt.target.classList.contains("popup__close-button")) {
        this.close();
      }
    });
  }
}

export default Popup;
