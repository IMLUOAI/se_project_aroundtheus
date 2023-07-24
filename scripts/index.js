const initialCards = [
  {
    name: "Lonely Earth",
    link: "https://unsplash.com/photos/full-moon-during-day-yOIT88xWkbg",
  },

  {
    name: "Boys Bathing",
    link: "https://unsplash.com/photos/a-group-of-people-standing-next-to-each-other-SLtSqhLypuc",
  },

  {
    name: "Cloudy Sunrise",
    link: "https://unsplash.com/photos/9A5wyDXopWI",
  },

  {
    name: "Teran",
    link: "https://unsplash.com/photos/tmD2T6L4cWA",
  },

  {
    name: "Flowers",
    link: "https://unsplash.com/photos/a-couple-of-flowers-that-are-in-a-vase-n7XxYtxp23M",
  },

  {
    name: "No face to be shown",
    link: "https://unsplash.com/photos/a-woman-sitting-on-a-couch-with-a-paper-bag-on-her-head-479rJrzXXQw",
  },
];

console.log(initialCards);

const profileEditButton = document.querySelector("#profile-edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = document.querySelector(".modal__close-button");
// const profileTitleInput = document.querySelector("#profile-title-input");
// const profileDescriptionInput = document.querySelector(
//   "#profile-description-input"
// );
// const profileModalForm = document.querySelector(".modal__form");
// function closePopup() {
//   profileEditModal.classList.remove("modal-opened");
// }

profileEditButton.addEventListener("click", () => {
  // profileNameInput.value = profileName.textContent;
  // profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});

profileEditCloseButton.addEventListener("click", () => {
  profileEditModal.classList.remove("modal_opened");
});

// profileEditButton.addEventListener("submit", (e) => {
//   e.preventDefault();
//   profileTitle.textContent = profileTitleInput.value;
//   profileDescription.textContent = profileDescriptionInput.value;
//   closePopup();
// });
