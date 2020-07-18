export class FormValidator {
    constructor(form, error) {
      this.form = form;
      this.error = error;
      this.errorElements = this.form.querySelectorAll(".error");
  }


isValidate(input) {
  input.setCustomValidity("");
  if (input.validity.valueMissing) {
    input.setCustomValidity("Это обязательное поле");
    return false;
  }

  if (input.validity.tooShort || input.validity.tooLong) {
    input.setCustomValidity("Должно быть от 2 до 30 символов");
    return false;
  }

  if (input.validity.typeMismatch && input.type === "url") {
    input.setCustomValidity("Здесь должна быть ссылка");
    return false;
  }

  return input.checkValidity();
}

validFieldInput(input) {
  this.error = input.closest(".popup__form").querySelector(`#${input.id}-error`);
  this.isValidate(input);
  this.error.textContent = input.validationMessage;
}

setSubmitButtonState(button, state) {
  if (state) {
    button.removeAttribute("disabled");
    button.classList.add(`popup__button_valid`);
    button.classList.remove(`popup__button_invalid`);
  } else {
    button.setAttribute("disabled", true);
    button.classList.add(`popup__button_invalid`);
    button.classList.remove(`popup__button_valid`);
  }
}

handlerInputForm(evt) {
  const currentForm = evt.currentTarget;

  const submit = currentForm.querySelector(".button");

  this.validFieldInput(evt.target);

  if (currentForm.checkValidity()) {
    this.setSubmitButtonState(submit, true);
  } else {
    this.setSubmitButtonState(submit, false);
  }
}

sendForm(evt) {
  evt.preventDefault();
  const currentForm = evt.target;
  currentForm.checkValidity();
}

setListeners() {
  this.form.addEventListener('input', (e) => this.sendForm(e));
  this.form.addEventListener('input', (e) => this.handlerInputForm(e));
}

deletErr() {
  this.errorElements.forEach(function (elem) {
      elem.textContent = "";
    });
 }


}