
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
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
];

console.log(initialCards);

// Card.js

const cardData = {
  name: "Lonely Earth",
    link: "https://images.unsplash.com/photo-1507499739999-097706ad8914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=689&q=80",
};

function createCard(cardData, cardSelector, handleImageClick) {
const card = new Card(cardData);
return card.getELement();
}

function handImageClick(name, link) {
  modalImage.src = link;
  modalImage.alt = name;
  modalImageCaption.textContent = name;
  openModal(imageModal);
}

const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};


const addCardFormValidator = new FormValidator(options, cardForm);
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(options, profileForm);
editProfileFormValidator.enableValidation();



// Query Selectors

const cardsWrap = document.querySelector(".gallery__cards");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const editProfileModal = document.querySelector("#edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button");

const profileForm = document.forms["profile-form"];
const profileNameInput = profileForm.querySelector("#profile-name-input");
const profileJobInput = profileForm.querySelector("#profile-description-input");

const addCardModal = document.querySelector("#add-card-modal");
const addNewCardButton = document.querySelector(".profile__plus-button");
const cardForm = document.forms["card-form"];
const addCardTitleInput = cardForm.querySelector("#card-title-input");
const addCardUrlInput = cardForm.querySelector("#card-url-input");

const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = previewImageModal.querySelector(".modal__preview-image");
const previewImageText = previewImageModal.querySelector(
  ".modal__preview-text"
);

//  Query Selectors for Close Buttons

const profileCloseButton = document.querySelector("#profile-modal-closed");
const addCardModalCloseButton = addCardModal.querySelector(
  "#add-card-modal-closed"
);
const previewImageCloseButton = document.querySelector("#preview-image-closed");

// Functions

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeWithEsc);
  modal.removeEventListener("mousedown", closeWithMouse);
}

function closeWithEsc(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    closeModal(openModal);
  }
}
function closeWithMouse(e) {
  if (e.target.classList.contains("modal_opened")) {
    closeModal(e.target);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeWithEsc);
  modal.addEventListener("mousedown", closeWithMouse);
}

function renderCard(cardData, cardsWrap) {
  const cardElement = getCardElement(cardData);
  cardsWrap.prepend(cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__heart-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__heart-button_active");
  });

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageElement.addEventListener("click", () => {
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    previewImageText.textContent = cardData.name;
    openModal(previewImageModal);
  });

  cardTitleElement.textContent = cardData.name;
  cardImageElement.alt = cardData.name;
  cardImageElement.src = cardData.link;

  return cardElement;
}

// Event Handlers

function handleProfileModalFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileJobInput.value;
  profileForm.reset();
  closeModal(editProfileModal);
}

function handleAddCardModalFormSubmit(evt) {
  evt.preventDefault();
  const name = addCardTitleInput.value;
  const link = addCardUrlInput.value;
  renderCard({ name, link }, cardsWrap);
  cardForm.reset();
  closeModal(addCardModal);
}

profileForm.addEventListener("submit", handleProfileModalFormSubmit);

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
  editProfileFormValidator.toggleButtonState();
  openModal(editProfileModal);
});

profileCloseButton.addEventListener("click", () =>
  closeModal(editProfileModal)
);

cardForm.addEventListener("submit", handleAddCardModalFormSubmit);

addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.toggleButtonState();
  openModal(addCardModal);
});

addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

previewImageCloseButton.addEventListener("click", () =>
  closeModal(previewImageModal)
);

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
