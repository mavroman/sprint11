class UserInfo {
  //Класс для работы с данными пользователя.
  constructor(infoName, infoJob) {
    this.infoName = infoName;
    this.infoJob = infoJob;
    this._job = '';
    this._name = '';

  }

  setUserInfo(name, job) {// обновляем данные внутри экземпляра класса;
    this._name = name;
    this._job = job;
  }

  updateUserInfo() { //отображаем эти данные на странице.
    this.infoName.textContent = this._name;
    this.infoJob.textContent = this._job;
  }

  getUserInfo() {
    return {
      name: this._name,
      job: this._job
    };
  }
}
