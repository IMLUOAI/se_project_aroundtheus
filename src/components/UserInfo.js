export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
    return userInfo;
  }
  setUserInfo(values) {
    this._nameElement.textContent = values.name;
    this._jobElement.textContent = values.job;
  }
}
