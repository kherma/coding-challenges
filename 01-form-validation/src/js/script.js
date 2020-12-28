import { select } from './settings.js';

class FormValidator {
  constructor() {
    const thisForm = this;
    thisForm.selectFormElements();
    thisForm.initApp();
  }

  selectFormElements() {
    const thisForm = this;
    thisForm.form = document.getElementById(select.elements.form);
    thisForm.username = document.getElementById(select.elements.username);
    thisForm.email = document.getElementById(select.elements.email);
    thisForm.password = document.getElementById(select.elements.password);
    thisForm.passwordConfirm = document.getElementById(
      select.elements.confirmation
    );
    thisForm.inputFields = [
      thisForm.username,
      thisForm.email,
      thisForm.password,
      thisForm.passwordConfirm,
    ];
  }

  errorMessage(field, message) {
    field.parentElement.classList.remove(select.statusClass.success);
    field.parentElement.classList.add(select.statusClass.error);
    field.nextElementSibling.textContent = `${
      field.id.slice(0, 1).toUpperCase() + field.id.slice(1)
    } ${message}`;
  }

  successMessage(field) {
    field.parentElement.classList.remove(select.statusClass.error);
    field.parentElement.classList.add(select.statusClass.success);
  }

  checkFieldEmpty() {
    const thisForm = this;
    thisForm.inputFields.forEach((input) => {
      if (input.value.trim() === '') {
        thisForm.errorMessage(input, `is empty`);
      } else {
        thisForm.successMessage(input);
      }
    });
  }

  checkEmailValid() {
    const thisForm = this;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(thisForm.email.value.trim()).toLowerCase())) {
      thisForm.errorMessage(thisForm.email, 'not valid');
    }
  }

  checkPasswordMatch() {
    const thisForm = this;
    if (thisForm.password.value !== thisForm.passwordConfirm.value) {
      thisForm.errorMessage(thisForm.password, 'must be the same');
      thisForm.errorMessage(thisForm.passwordConfirm, 'must be the same');
    }
  }

  checkFieldLength(field, min) {
    const thisForm = this;
    if (field.value.length < min) {
      thisForm.errorMessage(field, `mus be at least ${min} characters`);
    }
  }

  initApp() {
    const thisForm = this;
    thisForm.form.addEventListener('submit', (event) => {
      event.preventDefault();
      thisForm.checkFieldEmpty();
      thisForm.checkEmailValid();
      thisForm.checkFieldLength(thisForm.username, 3);
      thisForm.checkFieldLength(thisForm.password, 6);
      thisForm.checkPasswordMatch();
    });
  }
}

const app = new FormValidator();
