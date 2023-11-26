export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _getRes(res) {
    return res.ok ? res.json() : Promise.reject("Error:${res.status}");
  }

  getProfileApi() {
    return fetch(this.url + "/users/me", {
      headers: this._headers,
    }).then(this._getRes);
  }

  editProfileApi(data) {
    return fetch(this._url + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        job: data.description,
      }),
    }).then(this._getRes);
  }

  getInitialCards() {
    return fetch(this._url + "/cards", {
      method: "GET",
      headers: this._headers,
    }).then(this._getRes);
  }

  createCardApi(CardData) {
    return fetch(this._url + "/cards", {
      method: "POST",
      headers: this._headers,
      boyd: JSON.stringify({
        name: cardData.title,
        link: cardData.url,
      }),
    }).then(this._getRes);
  }

  deleteCard(cardID) {
    return fetch(this._url + "/cards/${cardID}", {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getRes);
  }

  updateAvatar(data) {
    return fetch(this._url + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.url,
      }),
    }).then(this._getRes);
  }

  getLikes(cardID) {
    return fetch("${this._url}/cards/likes/${cardID}", {
      headers: this._headers,
    }).then(this._getRes);
  }

  likeCard(cardID) {
    return fetch(this._url + "/cards/${cardID}/likes", {
      method: "PUT",
      headers: this._headeres,
    }).then(this._getRes);
  }

  disLikeCard(cardID) {
    return fetch(this._url + "/cards/${cardID}/likes", {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getRes);
  }
}
