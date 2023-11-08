import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
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

const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = createCard(cardData);
      section.addItem(card);
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

const addCardPopup = new PopupWithForm("#add-card-modal", (values) => {
  const cardData = {
    name: values.name,
    link: values.link,
  };
  renderCard(cardData);
  addCardPopup.close();
});
addCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm("#edit-modal", (values) => {
  userInfo.setUserInfo(values);
  editProfilePopup.close();
});
editProfilePopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: "#profile-name-input",
  jobSelector: "#profile-description-input",
});

profileEditButton.addEventListener("click", () => {
  console.log("edit profile button clicked");
  const values = userInfo.getUserInfo();
  profileNameInput.value = values.name;
  profileJobInput.value = values.job;
  editProfileFormValidator.toggleButtonState();
  editProfilePopup.open();
});

addNewCardButton.addEventListener("click", () => {
  console.log("add card button clicked");
  addCardFormValidator.toggleButtonState();
  addCardPopup.open();
});

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", () => {
    imagePopup.open(cardData.name, cardData.link);
  });
  return card.getView();
}

// function handleImageClick(name, link) {
//   imagePopup.open(name, link);
// }

function renderCard(cardData) {
  const card = createCard(cardData);
  section.addItem(card);
}

// function handleAddCardFormSubmit(cardData) {
//   const card = createCard(cardData);
//   section.addItem(card);
//   addCardPopup.close();
// }

// function closeModal(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keydown", closeWithEsc);
//   modal.removeEventListener("mousedown", closeWithMouse);
// }

// function closeWithEsc(evt) {
//   if (evt.key === "Escape") {
//     const openModal = document.querySelector(".modal_opened");
//     closeModal(openModal);
//   }
// }
// function closeWithMouse(e) {
//   if (e.target.classList.contains("modal_opened")) {
//     closeModal(e.target);
//   }
// }

// function openModal(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keydown", closeWithEsc);
//   modal.addEventListener("mousedown", closeWithMouse);
// }

// function handleProfileModalFormSubmit(evt) {
//   evt.preventDefault();
//   profileTitle.textContent = profileNameInput.value;
//   profileDescription.textContent = profileJobInput.value;
//   editProfilePopup.close();
// }

// function handleAddCardModalFormSubmit(evt) {
//   evt.preventDefault();
//   const name = addCardTitleInput.value;
//   const link = addCardUrlInput.value;
//   renderCard({ name, link }, cardsWrap);
//   cardForm.reset();
//   addCardPopup.close();
// }

profileCloseButton.addEventListener("click", () => editProfilePopup.close());

// addNewCardButton.addEventListener("click", () => {
//   addCardFormValidator.toggleButtonState();
//   openModal(addCardModal);
// });

addCardModalCloseButton.addEventListener("click", () => addCardPopup.close());

previewImageCloseButton.addEventListener("click", () => imagePopup.close());

// initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
