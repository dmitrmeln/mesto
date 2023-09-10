class UserInfo {
  constructor({ name, occupation, avatar }) {
    this._name = name;
    this._occupation = occupation;
    this._avatar = avatar;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      occupation: this._occupation.textContent,
      avatar: this._avatar.src,
      id: this._id
    };
  }

  setUserInfo(data) {
    this._name.textContent = data.popup__name;
    this._occupation.textContent = data.popup__occupation;
  }
}

export default UserInfo;
