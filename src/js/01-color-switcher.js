const bodyEL = document.querySelector('body');
// console.log(bodyEL);
const buttonStartEl = bodyEL.querySelector('[data-start]');
// console.log(buttonStartEl);
const buttonStopEl = bodyEL.querySelector('[data-stop]');
// console.log(buttonStopEl);

buttonStartEl.addEventListener('click', onStartButtonClick);
buttonStopEl.addEventListener('click', onStopButtonClick);

buttonStopEl.disabled = true;
let timerInterval = null;

function onStartButtonClick(e) {
  buttonStopEl.disabled = false;
  timerInterval = setInterval(() => {
    bodyEL.style.backgroundColor = getRandomHexColor();
  }, 1000);
  if (e.target) {
    buttonStartEl.setAttribute('disabled', true);
  }
}

function onStopButtonClick(e) {
  buttonStopEl.disabled = true;
  clearInterval(timerInterval);
  if (e.target) {
    buttonStartEl.removeAttribute('disabled');
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
