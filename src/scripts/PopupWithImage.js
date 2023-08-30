import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopupPicture = this._popup.querySelector(".popup__image");
    this._imagePopupCaption = this._popup.querySelector(
      ".popup__image-caption"
    );
  }

  open(name, link) {
    super.open();

    this._imagePopupPicture.alt = name;
    this._imagePopupCaption.textContent = name;
    this._imagePopupPicture.src = link;
  }
}

export default PopupWithImage;
