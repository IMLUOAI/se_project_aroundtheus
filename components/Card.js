
export default class Card {
  constructor({name, link}, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._cardElement = null;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector("#card-template");
    const cardElement = cardTemplate.content.cloneNode(true);
    this._likeButton = this._cardElement.querySelector(".card__heart-button");
    this._deleteButton = this._cardElement.querySelector(".card__delete-button");
    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLikeButton);

    this._deleteButton.addEventListener("click", this._handleDeleteCard);
    
    this._cardImage.addEventListener("click", () => {
    this._handleImageClick(this._name, this._link)
    });
  }

  _handleLikeButton = () => {
    this._likeButton.classList.toggle("card__heart-button_active");
  }

  _handleDeleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getCard() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = `photo of ${this._name}`;
    this._setEventListeners();
    return this._cardElement;
  }
}




