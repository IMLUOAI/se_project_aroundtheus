import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import "../pages/index.css";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import { initialCards, options } from "../utils/constant.js";

// Functions

const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      section.addItem(cardElement);
    },
  },
  ".gallery__cards"
);
section.renderItems();

const addCardForm = document.forms["card-form"];

const editProfileForm = document.forms["profile-form"];

const addCardFormValidator = new FormValidator(options, addCardForm);
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(options, editProfileForm);
editProfileFormValidator.enableValidation();

const imagePopup = new PopupWithImage("#preview-image-modal");
imagePopup.setEventListeners();

const addCardPopup = new PopupWithForm(
  addCardSelector,
  handleAddCardModalFormSubmit
);
function newPlace() {
  addCardPopup.open();
}
addCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm(
  editProfileSelector,
  handleProfileModalFormSubmit
);
function editInfo() {
  editProfilePopup.open();
}
editProfilePopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: "#profile-name-input",
  jobSelector: "#profile-description-input",
});
const user = userInfo.getUserInfo();
userInfo.setUserInfo({ name: "New Name", job: "New Job" });

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
const previewImageCaption = previewImageModal.querySelector(
  ".modal__preview-text"
);

//  Query Selectors for Close Buttons

const profileCloseButton = document.querySelector("#profile-modal-closed");
const addCardModalCloseButton = addCardModal.querySelector(
  "#add-card-modal-closed"
);
const previewImageCloseButton = document.querySelector("#preview-image-closed");

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

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

function renderCard(cardData, cardsWrap) {
  const cardElement = createCard(cardData);
  cardsWrap.prepend(cardElement);
}

// Event Handlers

function handleImageClick(name, link) {
  previewImage.src = link;
  previewImage.alt = name;
  previewImageCaption.textContent = name;
  openModal(previewImageModal);
}

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
