const banksDB = require('banks-db');
const masker = require('vanilla-masker');

window.onload = function () {
  const cardNumberField = document.getElementById('number');

  masker(cardNumberField).maskPattern("9999 9999 9999 9999 99");

  cardNumberField.oninput = function () {
    const cardNumber = cardNumberField.value;
    const bank = banksDB(cardNumber);
    const bankInfo = document.getElementById('card');
    const bankName = document.getElementById('bank-name');
    const cardType = document.getElementById('type');
    const hint = document.querySelector('.hint');

    if (typeof bank.name !== 'undefined') {
      const bankClass = 'is-' + bank.country + '-' + bank.name;
      hint.classList.remove('visible');
      bankName.innerHTML = bank.engTitle;
      bankName.classList.add('visible');
      bankInfo.classList.add(bankClass);
    } else {
      bankName.classList.remove('visible');
      bankInfo.setAttribute('class', 'card');
      bankName.innerHTML = '';

      if (cardNumber.length >= 7) {
        bankName.innerHTML = 'Unknown bank';
        bankName.classList.add('visible');
        hint.classList.add('visible');
      } else {
        hint.classList.remove('visible');
      }
    }

    if (typeof bank.type !== 'undefined') {
      cardType.innerHTML = bank.type;
      cardType.classList.add('visible');
    } else {
      cardType.innerHTML = '';
      cardType.classList.remove('visible');
    }
  };
};
