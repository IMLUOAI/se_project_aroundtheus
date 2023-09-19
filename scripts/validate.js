console.log("hello, julian & Romeo");

// enabling validation by calling enableValidation()
// pass all the settings on call
function enableValidation() {
  const formList = document.querySelector(".modal__form");
}

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(config);

const showInputError = (formElement, inputElement, errorElement) => {
    const errorElement = formElement.querySelector(`.${inputElement}-error`);
    inputElement.classList.add("form__input-type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("form__input_a_active");
};

const hideInputError = (formElement, inputElement) => {
const errorElement = formElement.querySelector(".${inputElement.id}-error");
inputElement.classList.remove(".fomr__input_type_error");
errorElement.classList.remove(".form__input_error_active");
errorElement.textContent= "";                                                                                                                                          = "";
};

const checkInputValidity = (formElement, inputElement) => {
   if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
   } else {
    hideInputError (formElement, inputElement);
   }
};

const setEventListeners = (formElement) => {
    const inputList =  Array.from(formElement.querySelectorAll(".form__input"));
    inputList.forEach((inputELement) => {
        inputElement.addEventListener("input", function(){
            checkInputValidity(forElement, inputElement);
        });
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(".modal__form"));
    formList.forEach((formElement) => {
    formList.addEventListener("submit", function(evt) {
        evt.preventDefault();
    });
    setEventListeners(formElement);
    });
};
enableValidation();
