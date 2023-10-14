
export default class Card {
  constructor({name, link}, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._cardElement = null;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).cloneNode(true);
    return cardElement();
  }

  _setEventListeners() {
    this._cardElement.querySelector(".card__heart-button").addEventListener("click", () => 
       this._handleLikeButton()
    );

   this._cardElement.querySelector(".card__delete-button").addEventListener("click", () => 
        this._handleDeleteCard()
    );
    this._cardElement.querySelector(".card__image").addEventListener("click", () => 
    this._handleImageClick(this._name, this._link)
);
  }

  _handleLikeButton() {
    this._cardElement.querySelector(".card__heart-button").classList.toggle("card__heart-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  getCard() {
     this._cardElement = this._getTemplate();
const cardImageElement = this._cardElement.querySelector(".card__image");
const cardTitleElement = this._cardElement.querySelector(".card__title");

cardImageElement.src = `url(${this._link})`;
cardTitleElement.textContent = this._name;
this._setEventListeners();

return this._cardElement;
  }
}




