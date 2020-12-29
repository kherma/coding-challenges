const switchIcon = document.querySelector('.header__toogler--image');
const header = document.getElementById('main-header');
const main = document.getElementById('main-cheatsheet');
const footer = document.getElementById('main-footer');

switchIcon.addEventListener('click', (event) => {
  header.classList.toggle('day__mode');
  main.classList.toggle('day__mode');
  footer.classList.toggle('day__mode');
  if (header.classList.value === 'day__mode') {
    switchIcon.src = './images/moon.svg';
  } else {
    switchIcon.src = './images/sun.svg';
  }
});
