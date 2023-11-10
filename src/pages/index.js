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
  profileEditButton,
  profileNameInput,
  addNewCardButton,
  profileDescriptionInput,
  profileTitle,
  profileDescription,
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

const addCardPopup = new PopupWithForm("#add-card-modal", (value) => {
  const cardData = {
    name: value.Title,
    link: value.URL,
  };
  renderCard(cardData);
  addCardPopup.close();
});
addCardPopup.setEventListeners();

const userInfo = new UserInfo(
  "#profile-name-input",
  "#profile-description-input"
);

const editProfilePopup = new PopupWithForm("#edit-modal", (profileData) => {
  // debugger;
  userInfo.setUserInfo(profileData.name, profileData.description);
  profileTitle.textContent = profileData.name;
  profileDescription.textContent = profileData.description;
  editProfilePopup.close();
});
editProfilePopup.setEventListeners();

profileEditButton.addEventListener("click", () => {
  debugger;
  console.log("edit profile button clicked");
  const user = userInfo.getUserInfo();
  profileTitle.value = user.name;
  profileDescription.value = user.job;

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

function renderCard(cardData) {
  const card = createCard(cardData);
  section.addItem(card);
}
