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
  profileJobInput,
  addNewCardButton,
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
  descriptionSelector: "#profile-description-input",
});

profileEditButton.addEventListener("click", () => {
  console.log("edit profile button clicked");
  const values = userInfo.getUserInfo({ name: "new name", job: "new job" });
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

function renderCard(cardData) {
  const card = createCard(cardData);
  section.addItem(card);
}
