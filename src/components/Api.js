export default class Api {
  constructor({ address, token }) {
    this._address = address;
    this._token = token;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(this._checkResponse)
  }

  getUserApiInfo() {
    return fetch(`${this._address}/users/me`, {
      headers: {
        authorization: this._token
      }
  })
      .then(this._checkResponse)
  }

  sendUserApiInfo(userName, userActivity) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        name: userName,
        about: userActivity
      })
    })
  }

  sendCardInfo(cardName, cardLink) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    })
    .then(this._checkResponse)
  }

  deleteApiCard(cardId) {
    return fetch(`${this._address}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
  }

  likeCard(cardId) {
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type' : 'application/json'
      }
    })
      .then(this._checkResponse)
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: 'DELETE', 
      headers: {
        authorization: this._token
      }
    })
      .then(this._checkResponse)
  }

  updateAvatar(link) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    })
  }
}