export const initialCards = [
  {
    name: "Lonely Earth",
    link: "https://images.unsplash.com/photo-1507499739999-097706ad8914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=689&q=80",
  },

  {
    name: "Boys Bathing",
    link: "https://images.unsplash.com/photo-1688649102473-099b9d16aa32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80",
  },

  {
    name: "Cloudy Sunrise",
    link: "https://images.unsplash.com/photo-1680100612420-e57b14dd2c7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
  },

  {
    name: "Teran",
    link: "https://images.unsplash.com/photo-1688634219076-aa0815bfa7b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=699&q=80",
  },

  {
    name: "Flowers",
    link: "https://images.unsplash.com/photo-1687431343219-2ea06211d6bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
  },

  {
    name: "No face to be shown",
    link: "https://images.unsplash.com/photo-1689008365999-fa5224b16326?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=754&q=80",
  },

  {
    name: "cat",
    link: "https://images.unsplash.com/photo-1680638867616-374c1b78f2b3?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export const cardsWrap = document.querySelector(".gallery__cards");
export const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

export const editProfileModal = document.querySelector("#edit-modal");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const profileAvatarEditButton = document.querySelector(
  ".profile__avatar-edit-button"
);
export const profileForm = document.forms["profile-form"];
export const profileNameInput = profileForm.querySelector(
  "#profile-name-input"
);
export const profileDescriptionInput = profileForm.querySelector(
  "#profile-description-input"
);

export const addCardModal = document.querySelector("#add-card-modal");
export const addNewCardButton = document.querySelector(".profile__plus-button");

export const cardForm = document.forms["card-form"];
export const addCardTitleInput = cardForm.querySelector("#card-title-input");
export const addCardUrlInput = cardForm.querySelector("#card-url-input");

export const previewImageModal = document.querySelector("#preview-image-modal");
export const previewImage = previewImageModal.querySelector(
  ".modal__preview-image"
);
export const previewImageCaption = previewImageModal.querySelector(
  ".modal__preview-text"
);

//  Query Selectors for Close Buttons

export const profileCloseButton = document.querySelector(
  "#profile-modal-closed"
);
export const addCardModalCloseButton = addCardModal.querySelector(
  "#add-card-modal-closed"
);
export const previewImageCloseButton = document.querySelector(
  "#preview-image-closed"
);
