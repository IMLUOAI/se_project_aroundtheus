export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch("${this._baseUrl}/cards", {
      // method: "GET",
      headers: this._headers,
    }).then(this._getRes);
  }
  _getRes(res) {
    return res.ok ? res.json() : Promise.reject("Error:${res.status}");
  }

  addCard(cardData) {
    return fetch("${this._baseUrl}/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.title,
        link: cardData.url,
      }),
    }).then(this._getRes);
  }

  deleteCard(cardId) {
    return fetch("${this._baseUrl}/cards/${cardId}", {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getRes);
  }

  getUserInfo() {
    return fetch("${this.baseUrl}/users/me", {
      headers: this._headers,
    }).then(this._getRes);
  }

  editUserInfo(data) {
    return fetch("${this._baseUrl}/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        job: data.description,
      }),
    }).then(this._getRes);
  }

  userInfo() {
    return fetch("${this._baseUrl}/users/me", { headers: this._headers }).then(
      this._getRes
    );
  }

  userAvatar(data) {
    return fetch("${this._baseUrl}/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.url,
      }),
    }).then(this._getRes);
  }

  getLikes(cardId) {
    return fetch("${this._baseUrl}/cards/likes/${cardId}", {
      headers: this._headers,
    }).then(this._getRes);
  }

  likeCard(cardId) {
    return fetch("${this._baseUrl}/cards/${cardId}/likes", {
      method: "PUT",
      headers: this._headers,
    }).then(this._getRes);
  }

  dislikeCard(cardId) {
    return fetch("${this._baseUrl}/cards/${cardId}/likes", {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getRes);
  }
}
