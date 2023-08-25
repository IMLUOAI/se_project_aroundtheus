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

// wrapers

const cardsWrap = document.querySelector(".gallery__cards");
const editProfileModal = document.querySelector("#edit-modal");
const editProfileForm = editProfileModal.querySelector("#profile-form");
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalForm = addCardModal.querySelector("#add-card-form");

// button & othre DOM nodes

const profileEditButton = document.querySelector("#profile-open-button");
const profileCloseButton = document.querySelector(".modal__close-button");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const addNewCardButton = document.querySelector(".profile__plus-button");
const addCardModalCloseButton = document.querySelector(".modal__close-button");
const likeButton = document.querySelectorAll(".card__heart-button");

// form data

const profileNameInput = editProfileForm.querySelector("#profile-name-input");
const profileJobInput = editProfileForm.querySelector(
  "#profile-description-input"
);

const addCardTitle = addCardModalForm.querySelector("#card-title-input");
const addCardUrl = addCardModalForm.querySelector("#card-url-input");

// functions
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}
function openModal(modal) {
  modal.classList.add("modal_opened");
}

function renderCard(cardData, cardsWrap) {
  const cardElement = getCardElement(cardData);
  cardsWrap.prepend("cardElement");
}
function handleProfileModalFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileJobInput.value;
  closeModal(editProfileModal);
}
function handleAddCardModalFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardImageUrlInput.value;
  renderCard({ name, link }, cardsWrap);
  closeModal(addCardModal);
}

// function toggleForm() {
//   profileNameInput.value = profileTitle.textContent;
//   profileJobInput.value = profileDescription.textContent;
// }

// function toggleForm() {
//   cardTitleInput.value = cardTitle.textContent;
//   cardImageUrlInput.value = cardImageUrl.textContent;
// }

// card-elements

const cardTemplate = document.querySelector("#card-template").content;
const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
const cardImage = cardElement.querySelector("card__image");
const cardTitle = cardElement.querySelector("card__title");

// card-functions

function getCardElement(cardData) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__heart-button");
  cardTitleElement.textContent = cardData.name;
  cardImageElement.alt = cardData.name;
  cardImageElement.src = cardData.link;
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle(".card__heart-button_active");
  });
  return cardElement;
}

//  event Listener

editProfileForm.addEventListener("submit", handleProfileModalFormSubmit);
addCardModalForm.addEventListener("submit", handleAddCardModalFormSubmit);

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
  editProfileModal.classList("#edit-modal");
  openModal(editProfileModal);
});
profileCloseButton.addEventListener("click", () =>
  closeModal(editProfileModal)
);

// add new card

addNewCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

initialCards.forEach((cardData) => {
  cardsWrap.append(getCardElement(cardData));
});

// likeButton.forEach((likeButton) => {
//   likeButton.classList.toggle(".card__heart-button_active");
// });
