import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
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
  profileAvatarEditButton,
  previewImage,
} from "../utils/constant.js";

const userInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__avatar"
);

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "017f0c48-eeeb-4059-9c3c-1a662a9e8f92",
    "Content-Type": "application/json",
  },
});

let section;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setAvatar(userData.avatar);
    userInfo.setUserInfo({
      name: userData.name,
      description: userData.job,
    });
    section = new Section(
      {
        items: initialCards,
        renderer: renderCard,
      },
      ".gallery__cards"
    );
    section.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", {
    handleImageClick: () => imagePopup.open(cardData.name, cardData.link),
    handleCardDelete,
    handleCardLike,
  });
  return card.getView();
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
}

// form validations
const changeProfileAvatarForm = document.forms["avatar-form"];
const editProfileForm = document.forms["profile-form"];
const addCardForm = document.forms["card-form"];

const changeProfileAvatarFormValidator = new FormValidator(
  options,
  changeProfileAvatarForm
);
const editProfileFormValidator = new FormValidator(options, editProfileForm);
const addCardFormValidator = new FormValidator(options, addCardForm);

changeProfileAvatarFormValidator.enableValidation();
addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();

// modal instances
const imagePopup = new PopupWithImage("#preview-image-modal");
const changeProfileAvatarPopup = new PopupWithForm(
  "#change-profile-avatar-modal",
  handleChangeProfileAvatarFormSubmit
);
const editProfilePopup = new PopupWithForm(
  "#edit-modal",
  handleEditProfileFormSubmit
);
const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
const deleteCardPopup = new PopupWithConfirmation("#delete-card-modal");

function handleCardDelete(cardId) {
  deleteCardPopup.open();
  deleteCardPopup.setSubmitAction(() => {
    deleteCardPopup.setLoading(true, "Deleting...");
    api
      .deleteCard(cardId)
      .then((res) => {
        deleteCardPopup.close();
        cardId.removeCard();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        deleteCardPopup.setLoading(false, "Yes");
      });
  });
}

function handleChangeProfileAvatarFormSubmit(url) {
  changeProfileAvatarPopup.setLoading(true, "saving...");
  api
    .updateAvatar(url)
    .then((userData) => {
      userInfo.setAvatar(userData.avatar);
      changeProfileAvatarPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => changeProfileAvatarPopup.setLoading(false, "Save"));
}

function handleEditProfileFormSubmit(data) {
  editProfilePopup.setLoading(true, "Saving...");
  api
    .profileUpdate(data)
    .then((userData) => {
      userInfo.setUserInfo(userData.name, userData.job);
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => editProfilePopup.setLoading(false, "Save"));
}

function handleAddCardFormSubmit(cardData) {
  addCardPopup.setLoading(true, "Saving...");
  api
    .addCard(cardData)
    .then((card) => {
      createCard(cardData);
      addCardPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => addCardPopup.setLoading(false, "Create"));
}

function handleCardLike(item) {
  if (!item.isLiked) {
    api
      .likeCard(item.getId())
      .then((res) => {
        item.updateLikeStatus(res.isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .disLikeCard(item.getId())
      .then((res) => {
        item.updateLikeStatus(res.isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

// modal eventlisteners
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

profileAvatarEditButton.addEventListener("click", () => {
  changeProfileAvatarFormValidator.toggleButtonState();
  changeProfileAvatarPopup.open();
});

imagePopup.setEventListeners();
changeProfileAvatarPopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
deleteCardPopup.setEventListeners();
