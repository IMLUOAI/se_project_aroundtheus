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
  profileAvatarEditButton,
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

const changeProfileAvatarForm = document.forms["avatar-form"];
const changeProfileAvatarFormValidator = new FormValidator(
  options,
  changeProfileAvatarForm
);
changeProfileAvatarFormValidator.enableValidation();

const editProfileForm = document.forms["profile-form"];
const editProfileFormValidator = new FormValidator(options, editProfileForm);
editProfileFormValidator.enableValidation();

const changeProfileAvatarPopup = new PopupWithForm(
  "#change-profile-avatar-modal",
  handleChangeProfileAvatarFormSubmit
);

const imagePopup = new PopupWithImage("#preview-image-modal");
imagePopup.setEventListeners();

const deleteCardPopup = new PopupWithForm(
  "#delete-card-modal",
  handleDeleteCardFormSubmit
);
deleteCardPopup.setEventListeners();

const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit,
  (value) => {
    const cardData = {
      name: value.Title,
      link: value.URL,
    };
    renderCard(cardData);
    addCardPopup.close();
  }
);
addCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm(
  "#edit-modal",
  handleEditProfileFormSubmit,
  (profileData) => {
    userInfo.setUserInfo(profileData.name, profileData.description);
    editProfilePopup.close();
  }
);
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

profileAvatarEditButton.addEventListener("click", () => {
  changeProfileAvatarFormValidator.toggleButtonState();
  changeProfileAvatarPopup.open();
  console.log("who are you?");
});

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleCardLike,
    handleDeleteCardFormSubmit,
    () => {
      imagePopup.open(cardData.name, cardData.link);
    }
  );
  return card.getView();
}

function renderCard(cardData) {
  const card = createCard(cardData);
  section.addItem(card);
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "017f0c48-eeeb-4059-9c3c-1a662a9e8f92",
    "Content-Type": "application/json",
  },
});
Promise.all([api.getInitialCards(), api.getProfileApi()]).then(
  ([cards, userData]) => {}
);

const userInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__avatar"
);

function handleChangeProfileAvatarFormSubmit(data) {
  changeProfileAvatarPopup.setLoading(true, "saving...");
  api
    .editUserAvatar(data.link)
    .then(() => {
      userInfo.setUserAvatar(data.link);
      changeProfileAvatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => changeProfileAvatarPopup.setLoading(false, "Save"));
}

function handleDeleteCardFormSubmit(card) {
  deleteCardPopup.open();
  deleteCardPopup.setSubmitAction(() => {
    deleteCardPopup.setLoading(true, "Saving...");
    api
      .deleteCard(card)
      .then(() => {
        card.deleteCard(), deleteCardPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => deleteCardPopup.setLoading(false, "Yes"));
  });
}

function handleCardLike(card) {
  if (!card.isLiked) {
    api
      .likeCard(card.cardId)
      .then(() => {
        card.updateLikeStatus(true);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .disLikeCard(card.cardId)
      .then(() => {
        card.updateLikeStatus(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function handleAddCardFormSubmit(cardData) {
  addCardPopup.setLoading(true, "Saving...");
  api
    .addCard(cardData)
    .then((card) => {
      let cardValue = renderCard(card);
      cardSection.addItem(cardValue);
      addCardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => addCardPopup.setLoading(false, "Create"));
}

function handleEditProfileFormSubmit(data) {
  editProfilePopup.setLoading(true, "Saving...");
  api
    .editUserInfo(data)
    .then((userData) => {
      userInfo.setUserInfo(userData.name, userData.job);
      cardSection.addItem(cardValue);
      editProfilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => editProfilePopup.setLoading(false, "Save"));
}
