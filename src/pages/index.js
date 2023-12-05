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

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardData]) => {
    userInfo.setUserInfo(userData.name, userData.job);
    userInfo.setAvatar(userData.avatar);
    ownerId = userData._id;

    const section = new Section(
      {
        items: cardData,
        renderer: renderCard,
      },
      ".gallery__cards"
    );
    section.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

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
  handleChangeProfileAvatarFormSubmit,
  "Save",
  "Saving"
);
const editProfilePopup = new PopupWithForm(
  "#edit-modal",
  handleEditProfileFormSubmit,
  "Save",
  "Saving"
);
const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit,
  "Save",
  "Saving"
);
const deleteCardPopup = new PopupWithForm(
  "#delete-card-modal",
  handleConfirmButtonSubmit,
  "Yes",
  "Deleting"
);

// modal functions
function createCard(cardData) {
  const card = new Card(
    {
      cardData,
      handleImageClick: (cardData) => {
        imagePopup.open(cardData.name, cardData.link);
      },

      handleCardDelete: (cardElement) => {
        deleteCardPopup.open();
        deleteCardPopup.setSubmitAction(() => {
          deleteCardPopup.setLoading(true, "Deleting...");
          api
            .deleteCard(cardElement._id)
            .then((result) => {
              card.deleteCard(result), deleteCardPopup.close();
            })
            .catch((err) => {
              console.error(err);
            })
            .finally(() => {
              deleteCardPopup.setLoading(false, "Yes");
            });
        });
      },

      handleCardLike: (cardElement) => {
        if (!cardElement.isLiked) {
          api
            .likeCard(cardElement.cardId)
            .then((res) => {
              card.updateLikeStatus(res.isLiked);
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          api
            .disLikeCard(cardElement.cardId)
            .then((res) => {
              card.updateLikeStatus(res.isLiked);
            })
            .catch((err) => {
              console.error(err);
            });
        }
      },
      userId: userInfo.getId(),
    }
    // "#card-template"
  );
  return cardElement.getView();
}

function renderCard(cardData) {
  const card = createCard(cardData);
  section.addItem(card);
}
function handleConfirmButtonSubmit() {
  handleCardDelete();
}

function handleChangeProfileAvatarFormSubmit(data) {
  changeProfileAvatarPopup.setLoading(true, "saving...");
  api
    .userAvatar(data)
    .then((data) => {
      userInfo.setUserAvatar(data.avatar);
      changeProfileAvatarPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => changeProfileAvatarPopup.setLoading(false, "Save"));
}

function handleAddCardFormSubmit(cardData) {
  addCardPopup.setLoading(true, "Saving...");
  api
    .addCard(cardData)
    .then((cardData) => {
      createCard(cardData);
      addCardPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => addCardPopup.setLoading(false, "Create"));
}

function handleEditProfileFormSubmit(name, description) {
  editProfilePopup.setLoading(true, "Saving...");
  api
    .editUserInfo({ name, description })
    .then((data) => {
      userInfo.setUserInfo(data.name, data.description);
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => editProfilePopup.setLoading(false));
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
