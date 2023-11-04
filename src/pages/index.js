import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import "../pages/index.css";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import {
  initialCards,
  options,
  cardsWrap,
  cardTemplate,
  editProfileModal,
  profileTitle,
  profileDescription,
  profileEditButton,
  profileNameInput,
  profileJobInput,
  addCardModal,
  addNewCardButton,
  addCardTitleInput,
  addCardUrlInput,
  previewImageModal,
  previewImage,
  previewImageCaption,
  profileCloseButton,
  addCardModalCloseButton,
  previewImageCloseButton,
  cardForm,
  profileForm,
} from "../utils/constant.js";

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
const addCardFormValidator = new FormValidator(options, addCardForm);
addCardFormValidator.enableValidation();

const editProfileForm = document.forms["profile-form"];
const editProfileFormValidator = new FormValidator(options, editProfileForm);
editProfileFormValidator.enableValidation();

const imagePopup = new PopupWithImage("#preview-image-modal");
imagePopup.setEventListeners();

const addCardPopup = new PopupWithForm(
  "#add-modal",
  handleAddCardModalFormSubmit
);
addCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm("#edit-profile-modal", (values) => {
  userInfo.setUserInfo(values);
});
editProfilePopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: "#profile-name-input",
  jobSelector: "#profile-description-input",
});

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
