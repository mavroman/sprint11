class Card {
  /*
     Можно лучше: лучше передавать не отдельные параметры, а сразу весь объект с данными карточки,
     т.к. представьте что у карточки появится ещё одно свойство (например author) которое нужно будет отобразить
     Если у нас создание карточки вызывается как createCard(name,link), придется во всех местах
     где вызывается создание карточки переписывать её вызов с createCard(name,link)  на createCard(name, link, author)
     Если ли же мы передаем просто объект карточки в функцию ( createCard(cardData) ) нам придется гораздо меньше менять программу
   */
  constructor(name, link, likes, openImageCallback) {
    this.name = name;
    this.link = link;
    this.likes = likes;
    this.openImageCallback = openImageCallback;
    this.openCardImage = this.openCardImage.bind(this);
    this.removeCard = this.removeCard.bind(this);



  }

  createCard() {
    const marking = ` <div class="place-card">
        <div class="place-card__image">
          <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
          <h3 class="place-card__name"></h3>
          <div class="place-card__group">
          <button class="place-card__like-icon"></button>
          <h4 class="place-card__counter-like">${this.likes.length}</h4>
          </div>
        </div>
      </div>`;
    const element = document.createElement("div");
    element.insertAdjacentHTML("afterbegin", marking.trim());
    const newTask = element.firstElementChild;
    newTask.querySelector(".place-card__name").textContent = this.name;
    newTask.querySelector(".place-card__image").style.backgroundImage = "url(" + this.link + ")";
    newTask.querySelector(".place-card__image").setAttribute("data-url", this.link);
    this.likeElem = newTask.querySelector(".place-card__like-icon");
    this.deleteElem = newTask.querySelector(".place-card__delete-icon");
    this.openImageElem = newTask.querySelector(".place-card__image");
    this.newTask = newTask;
    this.addListeners()
    return newTask
  }


  likeCard() {
    this.classList.toggle("place-card__like-icon_liked");
  }

  removeCard() {
    this.removeListeners();
    this.newTask.remove();
  }

  openCardImage() {
    if (event.target.classList.contains("place-card__image")) {
      this.openImageCallback(this.link)
    }
  }

  addListeners() {
    this.likeElem.addEventListener('click', this.likeCard);
    this.deleteElem.addEventListener("click", this.removeCard);
    this.openImageElem.addEventListener("click", this.openCardImage);
  }

  removeListeners() {
    this.deleteElem.removeEventListener("click", this.removeCard);
    this.likeElem.removeEventListener('click', this.likeCard);
    this.openImageElem.removeEventListener("click", this.openCardImage);
  }

}