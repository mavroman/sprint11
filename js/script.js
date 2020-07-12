(function () {

  const list = document.querySelector(".places-list");
  const cardList = new CardList(list, createCardCallback);

  function createCardCallback(name, link, likes) {
    return new Card(name, link, likes, openImagePopup).createCard();
  }

  const formCard = document.forms.new;
  const inputName = formCard.elements.name;
  const inputLink = formCard.elements.link;



  function addNewCard(e) {
    e.preventDefault();
    api.addCard(inputName.value, inputLink.value)
      .then((res) => {
        inputName.value = "";
        inputLink.value = "";
        popupAddNew.close();
        cardList.addCard(res.name, res.link, res.likes);
      })
      .catch(err => console.log(err))


  }
  formCard.addEventListener("submit", addNewCard);


  function openImagePopup(imageUrl) {
    const fotoCard = document.querySelector(".popup__image");
    fotoCard.setAttribute("src", imageUrl);
    const form = document.querySelector(".popup_images");
    form.classList.add("popup_is-opened");
  }


  const popupAddNew = new Popup(document.querySelector(".popup"));
  const popupAddEdit = new Popup(document.querySelector(".popup__user_name"));
  const popupImage = new Popup(document.querySelector(".popup_images"));

  const buttonOpen = document.querySelector(".user-info__button");
  buttonOpen.addEventListener("click", function () {
    popupAddNew.open();
  })

  const closeButton = document.querySelector(".popup__close");
  closeButton.addEventListener("click", function () {
    inputName.value = "";
    inputLink.value = "";
    addValid.deletErr();
    popupAddNew.close();
  });


  const buttonEditOpen = document.querySelector(".user-info__edit-button");
  buttonEditOpen.addEventListener("click", function () {
    // Надо исправить
    // См. комментарий в UserInfo
    const getUserInfo = userInfo.getUserInfo();
    name.value = getUserInfo.name;
    job.value = getUserInfo.job;
    popupAddEdit.open();
  });


  const buttonEditClose = document.getElementById("close-name");
  buttonEditClose.addEventListener("click", function () {
    name.setCustomValidity("");
    job.setCustomValidity("");
    popupAddEdit.close();
    editValid.setSubmitButtonState(buttonSave, true)
    editValid.deletErr();
  });

  const buttonCloseImage = document.getElementById("close-image");
  buttonCloseImage.addEventListener("click", function () {
    popupImage.close();
  });

  const infoName = document.querySelector(".user-info__name");
  const infoJob = document.querySelector(".user-info__job");
  const infoAvatar = document.querySelector(".user-info__photo");
  const user = document.forms.user;
  const name = user.elements.username;
  const job = user.elements.aboutuser;
  const clear = document.querySelectorAll(".error");



  const userInfo = new UserInfo(infoName, infoJob);

  user.addEventListener("submit", function (e) {
    e.preventDefault();
    api.editProfile(name.value, job.value)
      .then(res => {
        userInfo.setUserInfo(res.name, res.about)
        userInfo.updateUserInfo()
        popupAddEdit.close();

      })


      .catch(err => {
        console.log(err)
        // $$$ Надо исправить
        // Нет нужды в открытии окна, оно же и так не закрыто.

      })

  });

  const buttonSave = document.querySelector(".popup__button_save");

  const errorMessages = {
    empty: "Это обязательное поле",
    wrongLength: "Должно быть от 2 до 30 символов",
    wrongUrl: "Здесь должна быть ссылка",
  };
  const addValid = new FormValidator(formCard, errorMessages, clear);
  addValid.setListeners()
  const editValid = new FormValidator(user, errorMessages, clear);
  editValid.setListeners()



  const config = {
    url: 'https://praktikum.tk/cohort11',
    headers: {
      authorization: '9b9d7a5a-f79c-4b1c-8839-1f183b61d8d8',
      "Content-Type": "application/json"
    }

  }

  const api = new Api(config);
  api.getNameProfile()
    .then(res => {
      userInfo.setUserInfo(res.name, res.about);
      userInfo.updateUserInfo();
      infoAvatar.style.backgroundImage = "url(" + res.avatar + ")";
    })
    .catch(err => console.lod(err))



  api.getCards()
    .then(res => {
      cardList.render(res);
    })
    .catch(err => console.log(err))

})();

// Здравствуйте!

// ## Итог

// - класс Api реализован согласно поставленной задаче
// - информация о пользователе  (имя, подпись и аватар) подгружаются с сервера (GET запрос)
// - имя и о себе можно отредактировать (отправляется PATCH запрос, новые данные)
// - карточки подгружаются с сервера (GET запрос)
// - обязательный функционал работает без багов
// - корректная работа с асинхронным кодом
// - DOM изменяется только после того, как запрос успешно выполнен
// - ошибки сервера обрабатываются

// Работа принята

// ## Можно лучше

// Большое количество параметров лучше передвать в метод или в конструктор используя деструктуризацию.

// Например в коде:
// ~~~
// const newClass = new Class({ windowOne, userForm, popupObj })
// ~~~
// А внутри класса:
// ~~~
// constructor ({ userForm, popupObj, windowOne }) {...}
// ~~~
// И тогда порядок переменных будет неважен, это удобно