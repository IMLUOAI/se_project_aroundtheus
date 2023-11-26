export default class UserInfo {
  constructor(titleSelector, descriptionSelector, avatarSelector) {
    this._titleElement = document.querySelector(titleSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._titleElement.textContent,
      job: this._descriptionElement.textContent,
    };
    return userInfo;
  }
  setUserInfo(name, job, avatar, _id) {
    this._titleElement.textContent = name;
    this._descriptionElement.textContent = job;
    this._avatarElement.src = avatar;
    this._userID = _id;
  }
  getID() {
    return this._userID;
  }
}
