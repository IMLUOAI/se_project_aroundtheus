
export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._cardElement.querySelector(".card__heart-button").addEventListener("click", () => 
       this._handleLikeButton()
    );

   this._cardElement.querySelector(".card__delete-button").addEventListener("click", () => 
        this._handleDeleteCard()
    );
    this._cardElement.querySelector(".card__image").addEventListener("click", () => 
    this._handleImageClick(this)
);
  }

  _handleLikeButton() {
    this._cardElement.querySelector(".card__heart-button").classList.toggle(".card__heart-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  getCard() {
     this._cardElement = document.querySelector("this._cardSelector").textContent.querySelector(".card").cloneNode(true);
this._cardElement.querySelector(".card__image").style.backgroundImage = `url(${this._image})`;
this._cardElement.querySelector(".card__title").textContent = this._title;

return this._cardElement;
  }
}




