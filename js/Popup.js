class Popup {
  constructor(popup) {
    this.popup = popup; 

    /*
      Можно лучше: в каждом попапе есть кнопка закрытия
      можно повесить на неё обработчик здесь
      this.close = this.close.bind(this);   
      this.popup.querySelector('.popup__close').addEventListener('click', this.close);
    */
  }

  open() {
    this.popup.classList.add("popup_is-opened");
  }

  close() {
    this.popup.classList.remove("popup_is-opened");
  }
}
