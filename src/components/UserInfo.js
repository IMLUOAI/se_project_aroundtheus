export default class UserInfo {
  constructor(titleSelector, descriptionSelector, avatarSelector) {
    this._titleElement = document.querySelector(titleSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._titleElement.textContent,
      about: this._descriptionElement.textContent,
    };
    return userInfo;
  }

  setUserInfo(userData) {
    this._titleElement.textContent = userData.name;
    this._descriptionElement.textContent = userData.about;
  }

  setAvatar(avatar) {
    if (avatar) {
      this._avatarElement.src = avatar;
    } else {
      console.error("Avatar URL is missing or undefined");
    }
  }
}
