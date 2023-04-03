// Описаний в документації
import flatpickr from 'flatpickr';
// console.log(flatpickr);
import Notiflix from 'notiflix';
// console.log(Notiflix);
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  buttonEl: document.querySelector('[data-start]'),
  timerDivEl: document.querySelector('.timer'),
  daysSpanEl: document.querySelector('[data-days]'),
  hoursSpanEl: document.querySelector('[data-hours]'),
  minutesSpanEl: document.querySelector('[data-minutes]'),
  secondsSpanEl: document.querySelector('[data-seconds]'),
  spansValueEL: document.querySelectorAll('.value'),
  spansLabelEL: document.querySelectorAll('.label'),
};

// console.log(refs.inputEl);
// console.log(refs.buttonEl);
// console.log(refs.timerDivEl);
// console.log(refs.daysSpanEl);
// console.log(refs.hoursSpanEl);
// console.log(refs.minutesSpanEl);
// console.log(refs.secondsSpanEl);
// console.log(refs.spansValueEL);
// console.log(refs.spansLabelEL);

refs.buttonEl.disabled = true;

refs.inputEl.addEventListener('input', onInput);
// refs.buttonEl.addEventListener('click', onButtonClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      refs.buttonEl.disabled = false;
    }
  },
};

// console.log(options);
flatpickr(refs.inputEl, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function onInput(e) {
  const chosenDate = new Date(e.currentTarget.value).getTime();
  //   console.log(chosenDate);
  refs.buttonEl.addEventListener('click', () => {
    refs.buttonEl.disabled = true;
    const timerInterval = setInterval(() => {
      const currentDate = new Date().getTime();
      const timeLeft = chosenDate - currentDate;
      // console.log(currentDate);
      // console.log(timeLeft);
      refs.daysSpanEl.textContent = addLeadingZero(convertMs(timeLeft).days);
      refs.hoursSpanEl.textContent = addLeadingZero(convertMs(timeLeft).hours);
      refs.minutesSpanEl.textContent = addLeadingZero(
        convertMs(timeLeft).minutes
      );
      refs.secondsSpanEl.textContent = addLeadingZero(
        convertMs(timeLeft).seconds
      );

      if (timeLeft < 0) {
        clearInterval(timerInterval);
        refs.daysSpanEl.textContent = addLeadingZero(0);
        refs.hoursSpanEl.textContent = addLeadingZero(0);
        refs.minutesSpanEl.textContent = addLeadingZero(0);
        refs.secondsSpanEl.textContent = addLeadingZero(0);
      }
    }, 1000);
  });
}
