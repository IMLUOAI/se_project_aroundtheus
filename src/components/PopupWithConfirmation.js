export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirmButtonSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._confirmButton = this._popupElement.querySelector(
      ".modal__submit-button"
    );
    this._handleConfirmButtonSubmit = handleConfirmButtonSubmit;
  }
  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleConfirmButtonSubmit();
    });
  }

  setSubmitAction(action) {
    this._handleConfirmButtonSubmit = action;
  }
}
