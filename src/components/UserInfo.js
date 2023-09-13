class UserInfo {
  constructor({ name, about, avatar, _id }) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
    this._id = _id;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
      id: this._id,
    };
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
    this._id = _id;
  }
}

export default UserInfo;
