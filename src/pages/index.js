import Api from "../components/Api.js";
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
  addNewCardButton,
  profileNameInput,
  profileDescriptionInput,
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

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "017f0c48-eeeb-4059-9c3c-1a662a9e8f92",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__avatar"
);

const editProfilePopup = new PopupWithForm("#edit-modal", (profileData) => {
  userInfo.setUserInfo(profileData.name, profileData.description);
  editProfilePopup.close();
});
editProfilePopup.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const user = userInfo.getUserInfo();
  profileNameInput.value = user.name;
  profileDescriptionInput.value = user.job;
  editProfileFormValidator.toggleButtonState();
  editProfilePopup.open();
});

addNewCardButton.addEventListener("click", () => {
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

Promise.all([api.getInitialCards(), api.getProfileApi()]).then(
  ([cards, userData]) => {}
);
