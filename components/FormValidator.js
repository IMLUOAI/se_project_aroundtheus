
export default class FormValidator {
  constructor(option, formElement) {
    this._formSelector = option.formSelector;
    this._inputSelector = option.inputSelector;
    this._submitButtonSelector = option.submitButtonSelector;
    this._inactiveButtonClass = option.inactiveButtonClass;
    this._inputErrorClass = option.inputErrorClass;
    this._errorClass = option.errorClass;
    this._formElement = formElement;
  }
  
   enableValidation = () => {
      this._formElement.addEventListener("submit", function (evt) {
        evt.preventDefault();
      });
      this._setEventListeners();
    };

  
 _showInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };
  
 _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };
  
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      return this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };
  
  _hasInvalidInput = (inputList) => {
    return !inputList.every((inputElement) => inputElement.validity.valid);
  };
  
  _toggleButtonState = (
    inputList,
    submitButton,
    { inactiveButtonClass }
  ) => {
    if (hasInvalidInput(inputList)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  };
  
  _setEventListeners = () => {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(this._inputList);
  
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList);
      });
    });
  };
  
}