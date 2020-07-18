export class UserInfo {
  constructor(infoName, infoJob) {
    this.infoName = infoName;
    this.infoJob = infoJob;
    this._job = "";
    this._name = "";
  }

  setUserInfo(name, job) {
    this._name = name;
    this._job = job;
  }

  updateUserInfo() {
    this.infoName.textContent = this._name;
    this.infoJob.textContent = this._job;
  }

  getUserInfo() {
    return {
      name: this._name,
      job: this._job,
    };
  }
}
