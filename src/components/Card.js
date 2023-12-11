export default class Card {
  constructor(
    { name, link, id, isLiked },
    cardSelector,
    { handleImageClick, handleCardDelete, handleCardLike }
  ) {
    this._name = name;
    this._link = link;
    this._id = id;
    this._isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    this._cardElement = this._getTemplate();
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector);
    const cardElement = cardTemplate.content
      .querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleCardLike();
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleCardDelete();
    });
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  updateLikeStatus(isLiked) {
    this._isLiked = isLiked;
    this._renderLikes();
  }

  _renderLikes() {
    this._cardLikes.textContent = this.isLiked;
    if (this.isLiked) {
      this._likeButton.classList.add("card__heart-button_active");
    } else {
      this._likeButton.classList.remove("card__heart-button_active");
    }
  }

  removeCard() {
    this._cardElement.remove();
  }

  getView() {
    this._likeButton = this._cardElement.querySelector(".card__heart-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardLikes = this._cardElement.querySelector(".card__heart-count");

    this._setEventListeners();
    this._renderLikes();

    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = `photo of ${this._name}`;
    return this._cardElement;
  }

  getId() {
    return this._id;
  }
}
