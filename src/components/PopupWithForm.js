import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputElements = this._popupElement.querySelectorAll(".modal__input");
    this._savingButton = this._popupElement.querySelector(
      ".modal__submit-button"
    );
    this._savingButtonText = this._savingButton.textContent;
  }

  _getInputValues() {
    const _inputElements = Array.from(
      this._popupForm.querySelectorAll(".modal__input")
    );
    this._inputValues = {};
    _inputElements.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  setLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._savingButton.textContent = loadingText;
    } else {
      this._savingButton.textContent = this._savingButtonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
