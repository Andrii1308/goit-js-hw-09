import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

let choosenTime;

const refs = {
  startButton: document.querySelector('[data-start]'),
  day: document.querySelector('[data-days]'),
  hour: document.querySelector('[data-hours]'),
  minute: document.querySelector('[data-minutes]'),
  second: document.querySelector('[data-seconds]'),
  input: document.querySelector('#datetime-picker'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (!selectedDate || selectedDate < Date.now()) {
      Notify.failure('Please choose a date in the future');
      refs.startButton.disabled = true;
    } else {
      refs.startButton.disabled = false;
    }
  },
};

const flatpickrInstance = flatpickr('#datetime-picker', options);

function updateClock(formattedTime) {
  const { days, hours, minutes, seconds } = formattedTime;
  refs.day.textContent = days;
  refs.hour.textContent = hours;
  refs.minute.textContent = minutes;
  refs.second.textContent = seconds;
}

refs.startButton.disabled = true;
refs.startButton.addEventListener('click', onCheckUserDate);

function onCheckUserDate(event) {
  const selectedDate = flatpickrInstance.selectedDates[0];

  if (selectedDate > Date.now()) {
    event.target.disabled = false;

    Notify.success('The timer has started');
    event.target.disabled = true;
    clearInterval(choosenTime);

    choosenTime = setInterval(() => {
      const currentTime = Date.now();
      const calculatedTime = selectedDate - currentTime;

      if (calculatedTime <= 0) {
        Notify.info('Time is up');
        clearInterval(choosenTime);
      } else {
        const formattedTime = convertMs(calculatedTime);
        updateClock(formattedTime);
      }
    }, 1000);
  }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
