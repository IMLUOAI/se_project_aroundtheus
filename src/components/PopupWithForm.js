import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._popupForm = this._popupElement.querySelector(".modal__form");
  }

  _getInputValues() {
    const inputElements = Array.from(
      this._popupForm.querySelectorAll(".modal__input")
    );
    const InputValues = {};
    inputElements.forEach((input) => {
      InputValues[input.name] = input.value;
    });
    return InputValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
    });
  }
  close() {
    super.close();
    this._popupForm.reset();
  }
}
