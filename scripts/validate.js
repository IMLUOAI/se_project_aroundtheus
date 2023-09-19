console.log("hello, julian & Romeo");

// enabling validation by calling enableValidation()
// pass all the settings on call
// function enableValidation() {
//   const formElement= document.querySelectorAll(".modal__form");
// }

const config = {
  formSelector: ".modal__form",
  inputSelector: ".mdoal__form-input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: ".modal__submit-button_disabled",
  inputErrorClass: ".modal__form-input_type_error",
  errorClass: ".modal__form_error_visible",
};

enableValidation(config);

const showInputError = (formElement, inputElement, errorElement) => {
    const errorElement = formElement.querySelector(`.${inputElement}-error`);
    inputElement.classList.add("modal__form-input-type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("modal__form-input_active");
};

const hideInputError = (formElement, inputElement) => {
const errorElement = formElement.querySelector(".${inputElement.id}-error");
inputElement.classList.remove(".modal__form-input_type_error");
errorElement.classList.remove(".modal__form-input_error_active");
errorElement.textContent= "";                                                                                                                                          = "";
};

const checkInputValidity = (formElement, inputElement) => {
   if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
   } else {
    hideInputError (formElement, inputElement);
   }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};


const toggleButtonState = (inputList, buttonElement) => {
    console.log(hasInvalidInput(inputList));
    if(hasInvalidInput(inputList)) {
        buttonElement.classList.add("modal__submit-button_inactive");
    } else {
        buttonElement.classList.remove("modal__submit-button_inactive");
    }
};

const setEventListeners = (formElement) => {
    const inputList =  Array.from(formElement.querySelectorAll(".modal__form-input"));
    const buttonElement = formElement.querySelector(".modal__submit-button");
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputELement) => {
        inputElement.addEventListener("input", function () {
            checkInputValidity(formElement, inputElement);
            toggleButtomState(inputList, buttonElement);
        });
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(".modal__form"));
    formList.forEach((formElement) => {
    formElement.addEventListener("submit", function(evt) {
        evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(".modal__form-fieldset"));
    fieldsetList.forEach((fieldset) => {
        setEventListeners(fieldset);
    });
});
};
enableValidation();
