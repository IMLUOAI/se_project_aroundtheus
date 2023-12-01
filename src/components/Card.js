export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    _handleLikeClick
  ) {
    this._name = name;
    this._link = link;
    this.id = _id;
    this.isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._cardElement = this._getTemplate();
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = this._handleLikeClick;
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
      this._handleLikeClick();
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick();
    });
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  cardLikeStatus(isLiked) {
    this.isLiked = isLiked;
    this._renderLikes();
  }

  _renderLikes() {
    if (this.isLiked) {
      this._likeButton.classList.add("card__heart-button_active");
    } else {
      this._likeButton.classList.remove("card__heart-button_active");
    }
  }

  getView() {
    this._likeButton = this._cardElement.querySelector(".card__heart-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = `photo of ${this._name}`;
    this._setEventListeners();
    return this._cardElement;
  }
}
