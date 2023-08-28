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

// DOMS

const cardsWrap = document.querySelector(".gallery__cards");
const cardTemplate = document.querySelector("#card-template").content;
const editProfileModal = document.querySelector("#edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const previewImageModal = document.querySelector("#preview-image-modal");
const PreviewImageText = previewImageModal.querySelector(
  ".modal__preview-image-text"
);
const PreviewImage = previewImageModal.querySelector(".modal__preview-image");

const addCardModal = document.querySelector("#add-card-modal");

// button & othre DOM nodes

const profileEditButton = document.querySelector("#profile-open-button");
const profileCloseButton = document.querySelector(".modal__close-button");
const addNewCardButton = document.querySelector(".profile__plus-button");
const addCardModalCloseButton = addCardModal.querySelector(
  ".modal__close-button"
);
const likeButton = document.querySelectorAll(".card__heart-button");
const PreviewImageCloseButton = document.querySelector(".modal__close-button");

// form data

const editProfileForm = editProfileModal.querySelector("#profile-form");
const profileNameInput = editProfileForm.querySelector("#profile-name-input");
const profileJobInput = editProfileForm.querySelector(
  "#profile-description-input"
);

const addCardModalForm = addCardModal.querySelector("#add-card-form");
const addCardTitleInput = addCardModalForm.querySelector("#card-title-input");
const addCardUrlInput = addCardModalForm.querySelector("#card-url-input");

// functions

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}
function openModal(modal) {
  modal.classList.add("modal_opened");
}

function renderCard(cardData, cardsWrap) {
  const cardElement = getCardElement(cardData);
  cardsWrap.append(cardElement);
}

// card-functions

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__heart-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardTitleElement.textContent = cardData.name;
  cardImageElement.alt = cardData.name;
  cardImageElement.src = cardData.link;

  cardDeleteButton.addEventListener("click", () => {
    cardsWrap.remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__heart-button_active");
  });

  cardImageElement.addEventListener("click", () => {
    PreviewImage.src = cardData.link;
    PreviewImage.alt = cardData.name;
    PreviewImageText.textContent = cardData.name;
    openModal(previewImageModal);
  });

  cardImageElement.src = cardData.link;
  cardTitleElement.alt = cardData.name;
  cardTitleElement.textContent = cardData.name;

  return cardElement;
}

// event handlers

function handleProfileModalFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileJobInput.value;
  closeModal(editProfileModal);
}

function handleAddCardModalFormSubmit(evt) {
  evt.preventDefault();
  const name = addCardTitleInput.value;
  const link = addCardUrlInput.value;
  renderCard({ name, link }, cardsWrap);
  closeModal(addCardModal);
}

// function handleAddCardModalFormSubmit(evt) {
//   evt.preventDefault();
//   const cardTitle = addCardTitleInput.value;
//   const cardLink = addCardUrlInput.value;
//   const newCardData = { name: cardTitle, link: cardLink };
//   renderCard(newCardData, cardsWrap);
//   closeModal(addCardModal);
//   addCardTitleInput.value = "";
//   addCardUrlInput.value = "";
// }

//  event listeners

editProfileForm.addEventListener("submit", handleProfileModalFormSubmit);
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
  openModal(editProfileModal);
});
profileCloseButton.addEventListener("click", () =>
  closeModal(editProfileModal)
);

addCardModalForm.addEventListener("submit", handleAddCardModalFormSubmit);
addNewCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});
addCardModalCloseButton.addEventListener("click", () => {
  closeModal(addCardModal);
});

PreviewImageCloseButton.addEventListener("click", () => {
  closeModal(previewImageModal);
});

// imageModal.addEventListener("click", (event) => {
//   if (event.target === imageModal) {
//     modalImage.src = "";
//   }
// });
// cardDeleteButton.forEach((deleteButton) => {});
