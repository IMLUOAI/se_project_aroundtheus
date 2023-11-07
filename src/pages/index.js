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
    renderer: renderCard,
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
  "#add-card-modal",
  handleAddCardFormSubmit
);
addCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm(
  "#edit-modal",
  handleEditProfileFormSubmit
);
editProfilePopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: "#profile-name-input",
  jobSelector: "#profile-description-input",
});

profileEditButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  profileNameInput.value = data.name;
  profileJobInput.value = data.job;
  editProfileFormValidator.toggleButtonState();
  editProfilePopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.toggleButtonState();
  addCardPopup.open();
});

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", (link, title) => {
    imagePopup.open(link, title);
  });
  return card.getView();
}

function renderCard(cardData) {
  const element = createCard(cardData);
  section.addItem(element);
}

// function handleImageClick(card) {
//   const data = {
//     name: card.alt,
//     link: card.src,
//   };
//   imagePopup.open(data);
// }

function handleAddCardFormSubmit(data) {
  renderCard(data);
  addCardPopup.close();
}

function handleEditProfileFormSubmit(data) {
  userInfo.setUserInfo(data);
  editProfilePopup.close();
}
