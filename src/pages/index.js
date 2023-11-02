import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/constant.js";
import PopupWithForm from "../components/Popup.js";
import PopupWithImage from "../components/Popup.js";
import Popup from "../components/Popup.js";
import initialCards from "../utils/constant.js";
import "../pages/index.css";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
// Functions

const section = new Section(
  { items: data, renderer: renderCard },
  ".gallery__cards"
);

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
