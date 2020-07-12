class CardList {
  constructor(container, createCardCallback) {
    this.container = container;
    this.createCardCallback = createCardCallback;

  }

  addCard(inputName, inputLink, likes) {
    const card = this.createCardCallback(inputName, inputLink, likes);
    this.container.append(card);
  }

  render(array) {
    array.forEach((elem) => {
       this.addCard(elem.name, elem.link, elem.likes);
    });
  }



  
}
