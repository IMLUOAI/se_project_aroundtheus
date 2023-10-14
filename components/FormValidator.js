
export default class FormValidator {
  constructor(options, formElement) {
    this._formSelector = options.formSelector;
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
    this._formElement = formElement;
  }
  
   enableValidation = () => {
      this._formElement.addEventListener("submit", (evt) => {
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
  
  toggleButtonState = (inputList) => {
    if (this._hasInvalidInput(inputList ?? this._inputList)) {
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
    this._toggleButtonState(inputList); //this function shoulod be called after you open modal window and fill it's inputs with data
    this._inputList = inputList;
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input",  () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState(inputList);
      });
    });
  };
  
}