export default class UserInfo {
  constructor(titleSelector, descriptionSelector) {
    this._titleElement = document.querySelector(titleSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._titleElement.textContent,
      job: this._descriptionElement.textContent,
    };
    return userInfo;
  }
  setUserInfo(name, job) {
    this._titleElement.textContent = name;
    this._descriptionElement.textContent = job;
  }
}
