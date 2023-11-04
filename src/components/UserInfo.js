export default class UserInfo {
  constructor({ nameElement, jobElement }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    const userInfo = {
      nameElement: this._nameElement.textContent,
      jobElement: this._jobElement.textContent,
    };
    return userInfo();
  }
  setUserInfo(values) {
    this._nameElement.textContent = values.name;
    this._jobElement.textContent = values.job;
  }
}
