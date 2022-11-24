export class Api {
  constructor({ baseUrl, headers }) {
    this._baseURL = baseUrl;
    this._headers = headers;
  }
  setToken(token){
    if (token){
      this._headers.authorization = `Bearer ${token}`
    }
    console.log(this._headers)
  }
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
  getUser() {
    return fetch(this._baseURL + "/users/me", {
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  setUserText({ name, about }) {
    return fetch(this._baseURL + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._getResponseData(res));
  }
  setUserImage(avatar) {
    return fetch(this._baseURL + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => this._getResponseData(res));
  }

  getCards() {
    return fetch(this._baseURL + "/cards", {
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  addCard({ name, link }) {
    return fetch(this._baseURL + "/cards", {
      method: "Post",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this._getResponseData(res));
  }

  deleteCard(id) {
    return fetch(this._baseURL + "/cards/" + id, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  handleLike(id, like) {
    let fetchParams;
    if (like) {
      fetchParams = {
        method: "PUT",
        headers: this._headers,
      };
    } else {
      fetchParams = {
        method: "DELETE",
        headers: this._headers,
      };
    }
    return fetch(
      this._baseURL + "/cards/" + id + "/likes",
      fetchParams
    ).then((res) => this._getResponseData(res));
  }
}
const api = new Api({
  baseUrl: "http://api.mesto.novak.nomoredomains.club",
  headers: {
    authorization: "6492d287-6bce-4552-8b4d-86cc57d9f89d",
    "Content-Type": "application/json",
  }
});
export default api;
