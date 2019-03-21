let score = 0;
let isGameStarted = false;

let $start = document.getElementById('start');
let $timeHeader = document.getElementById('time-header');
let $game = document.querySelector('.game');
let $resultHeader = document.querySelector('#result-header');
let $result = document.querySelector('#result');
let $inputValue = document.querySelector('#game-time');
let $time = document.querySelector('#time');

const arrayColor = [
  'yellow',
  'blue',
  'red',
  'green',
  'steelblue',
  'black',
  'pink',
  'brown',
  'gray'
];

$start.addEventListener('click', startGame);
$game.addEventListener('click', boxClicked);
$inputValue.addEventListener('input', onChangeInput);

function startGame() {
  isGameStarted = true;
  $inputValue.disabled = true;
  this.classList.add('hide');
  $game.style.background = '#fff';
  $timeHeader.classList.remove('hide');
  $resultHeader.classList.add('hide');
  score = 0;

  let interval = setInterval(() => {
    let time = parseFloat($time.textContent);

    if(time <= 0) {
      clearInterval(interval);
      $inputValue.disabled = false;
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);

  renderBox();
}

function endGame() {
  isGameStarted = false;
  $resultHeader.classList.remove('hide');
  $timeHeader.classList.add('hide');
  $start.classList.remove('hide');
  $game.classList.remove('hide');
  $game.innerHTML = '';
  $game.style.background = '#ccc';
  $result.textContent = score;
  $time.textContent = $inputValue.value;
}

function boxClicked() {
  if (!isGameStarted) {
    return;
  }
  if (event.target.dataset.box) {
    score++;
    renderBox();
  }
}

function onChangeInput() {
  $time.textContent = this.value;
}

function renderBox() {
  $game.innerHTML = '';

  let randomSize = randomNumbers(30, 100);
  let clientRect = $game.getBoundingClientRect();  
  let box = document.createElement('div');
  let maxTop = clientRect.height - randomSize;
  let maxWidth = clientRect.width - randomSize;
  let color = randomNumbers(0, arrayColor.length - 1);

  box.style.background = arrayColor[color];
  box.style.height = box.style.width = `${randomSize}px`;
  box.style.position = 'absolute';
  box.style.top = randomNumbers(0, maxTop) + 'px';
  box.style.left = randomNumbers(0, maxWidth) + 'px';
  box.style.cursor = 'pointer';
  box.setAttribute('data-box', 'true');

  $game.appendChild(box);
  
}

function randomNumbers(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

