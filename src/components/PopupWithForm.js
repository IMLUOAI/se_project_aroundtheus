import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector(".modal__form");

    this._setEventListeners();
  }

  _getInputValues() {
    const inputElements = Array.from(
      this._popupElement.querySelectorAll(".modal__input")
    );
    const inputValues = {};
    inputElements.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  close() {
    super.close();
    this._popupElement.reset();
  }

  _setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}
