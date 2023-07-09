const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

let timer = null;

refs.start.addEventListener('click', onChangeColorClick);
refs.stop.addEventListener('click', onStopClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function onChangeColorClick(event) {
  event.target.disabled = true;
  refs.stop.disabled = false;

  timer = setInterval(() => {
    const changeBgColor = getRandomHexColor();
    refs.body.style.backgroundColor = changeBgColor;
  }, 1000);
}

function onStopClick(event) {
  event.target.disabled = true;
  refs.start.disabled = false;
  clearInterval(timer);
}
