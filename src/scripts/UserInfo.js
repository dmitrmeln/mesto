class UserInfo {
  constructor({ name, occupation }) {
    this._name = name;
    this._occupation = occupation;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      occupation: this._occupation.textContent,
    };
  }

  setUserInfo(data) {
    this._name.textContent = data.popup__name;
    this._occupation.textContent = data.popup__occupation;
  }
}

export default UserInfo;
