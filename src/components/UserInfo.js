export default class UserInfo {
  constructor(nameSelector, descriptionSelector) {
    debugger;
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._nameElement.textContent,
      job: this._descriptionElement.textContent,
    };
    return userInfo;
  }
  setUserInfo(name, job) {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = job;
  }
}
