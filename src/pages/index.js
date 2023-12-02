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

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "017f0c48-eeeb-4059-9c3c-1a662a9e8f92",
    "Content-Type": "application/json",
  },
});

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
  handleChangeProfileAvatarFormSubmit,
  "Save"
);
changeProfileAvatarPopup.setEventListeners();

const imagePopup = new PopupWithImage("#preview-image-modal");
imagePopup.setEventListeners();

const deleteCardPopup = new PopupWithForm("#delete-card-modal");
deleteCardPopup.setEventListeners();

const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit,
  "Create",
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
  "Save",
  (profileData) => {
    userInfo.setUserInfo(profileData.name, profileData.description);
    editProfilePopup.close();
  }
);
editProfilePopup.setEventListeners();

const userInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__avatar"
);

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    () => {
      imagePopup.open(cardData.name, cardData.link);
    },
    (cardId) => {
      deleteCardPopup.open();
      deleteCardPopup.setSubmitAction(() => {
        deleteCardPopup.setLoading(true, "Deleting...");
        api
          .deleteCard(card.getId())
          .then(() => {
            card.deleteCard(), deleteCardPopup.close();
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => deleteCardPopup.setLoading(false, "Yes"));
      });
    },

    (cardId) => {
      if (!card.isLiked) {
        api
          .likeCard(card.id)
          .then(() => {
            card.updateLikeStatus(true);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        api
          .disLikeCard(card.id)
          .then(() => {
            card.updateLikeStatus(false);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  );
  return card.getView();
}

function renderCard(cardData) {
  const card = createCard(cardData);
  section.addItem(card);
}

function handleChangeProfileAvatarFormSubmit(avatar) {
  changeProfileAvatarPopup.setLoading(true, "saving...");
  api
    .userAvatar(avatar.src)
    .then((userData) => {
      userInfo.setUserAvatar(userData.avatar);
      changeProfileAvatarPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => changeProfileAvatarPopup.setLoading(false, "Save"));
}

// function handleDeleteClick(card) {
//   deleteCardPopup.open();
//   deleteCardPopup.setSubmitAction(() => {
//     deleteCardPopup.setLoading(true, "Deleting...");
//     api
//       .deleteCard(card.getId())
//       .then(() => {
//         card.deleteCard(), deleteCardPopup.close();
//       })
//       .catch((err) => {
//         console.error(err);
//       })
//       .finally(() => deleteCardPopup.setLoading(false, "Yes"));
//   });
// }

// function handleLikeClick(card) {
//   if (!card.isLiked) {
//     api
//       .likeCard(card.id)
//       .then(() => {
//         card.updateLikeStatus(true);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   } else {
//     api
//       .disLikeCard(card.id)
//       .then(() => {
//         card.updateLikeStatus(false);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }
// }

function handleAddCardFormSubmit(cardData) {
  addCardPopup.setLoading(true, "Saving...");
  api
    .addCard(cardData)
    .then((res) => {
      createCard(cardData);
      addCardPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => addCardPopup.setLoading(false, "Create"));
}

function handleEditProfileFormSubmit(name, job) {
  editProfilePopup.setLoading(true, "Saving...");
  api
    .editUserInfo(name, job)
    .then((userData) => {
      userInfo.setUserInfo(userData.name, userData.job);
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => editProfilePopup.setLoading(false));
}

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
