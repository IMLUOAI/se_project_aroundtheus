export default class UserInfo {
  constructor({ nameElement, jobElement }) {
    this._nameElement = nameElement;
    this._jobElement = jobElement;
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
