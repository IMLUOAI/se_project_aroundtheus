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

// profile-Elements

const profileOpenButton = document.querySelector("#profile-open-button");
const profileCloseButton = document.querySelector(".modal__close-button");
const modal = document.querySelector(".modal");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileModalForm = document.querySelector("#edit-profile-form");

// profile-functions

function handleProfileModalFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
}

function toggleForm() {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  modal.classList.toggle("#edit-modal");
}

// wrapers

const galleryCardsElement = document.querySelector(".gallery__cards");
const editProfileModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-card-modal");

// card-elements

const cardTemplate = document.querySelector("#card-template").content;
const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
const cardImage = cardElement.querySelector("card__image");
const cardTitle = cardElement.querySelector("card__title");

const profilePlusButton = document.querySelector(".profile__plus-button");

// card-functions

function getCardElement(cardData) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  cardTitleElement.textContent = cardData.name;
  cardImageElement.alt = cardData.name;
  cardImageElement.src = cardData.link;
  return cardElement;
}

/* Event Listeners */

function addCardsToPage(initialCards) {
  const galleryCardsElement = document.querySelector(".gallery__cards");

  profileOpenButton.addEventListener("click", toggleForm);
  profileCloseButton.addEventListener("click", toggleForm);
  profileModalForm.addEventListener("submit", handleProfileModalFormSubmit);

  initialCards.forEach((cardData) => {
    galleryCardsElement.prepend(getCardElement(cardData));
  });
}

addCardsToPage(initialCards);
