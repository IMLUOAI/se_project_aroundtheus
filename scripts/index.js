const initialCards = [
  {
    name: "Lonely Earth",
    link: "https://unsplash.com/photos/full-moon-during-day-yOIT88xWkbg",
  },

  {
    name: "Boys Bathing",
    link: "https://unsplash.com/photos/a-group-of-people-standing-next-to-each-other-SLtSqhLypuc",
  },

  {
    name: "Cloudy Sunrise",
    link: "https://unsplash.com/photos/9A5wyDXopWI",
  },

  {
    name: "Teran",
    link: "https://unsplash.com/photos/tmD2T6L4cWA",
  },

  {
    name: "Flowers",
    link: "https://unsplash.com/photos/a-couple-of-flowers-that-are-in-a-vase-n7XxYtxp23M",
  },

  {
    name: "No face to be shown",
    link: "https://unsplash.com/photos/a-woman-sitting-on-a-couch-with-a-paper-bag-on-her-head-479rJrzXXQw",
  },
];

// console.log(initialCards);

/* Elements */

const profileOpenButton = document.querySelector("#profile-open-button");
const profileCloseButton = document.querySelector(".modal__close-button");
const modal = document.querySelector(".modal");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileModalForm = document.querySelector(".modal__form");

const galleryCardsElement = document.querySelector(".gallery__cards");
const cardTemplate = document.querySelector("#card-template").content;
const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
const cardImage = cardElement.querySelector("card__image");
const cardTitle = cardElement.querySelector("card__title");

const profilePlusButton = document.querySelector(".profile__plus-button");

/* Functions */

function handleProfileModalFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
}

function toggleForm() {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  modal.classList.toggle("modal_opened");
}

function getCardElement(cardData) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  cardTitleElement.textContent = "cardData.name";
  cardImageElement.alt = "cardData.name";
  cardImageElement.src = "cardData.link";
  return cardElement;
}

/* Event Listeners */

profileOpenButton.addEventListener("click", toggleForm);
profileCloseButton.addEventListener("click", toggleForm);
profileModalForm.addEventListener("submit", handleProfileModalFormSubmit);

// for (i = 0; i < initialCards.length; i++) {
//   console.log(initialCards[i]);
// }
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  galleryCardsElement.append(cardElement);
});
