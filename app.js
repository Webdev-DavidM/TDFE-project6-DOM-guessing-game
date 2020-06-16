const keyboard = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const startGame = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');
let misses = document.querySelectorAll('.tries');
let button = document.querySelector('button');
const letter = document.getElementsByClassName('letter');
let missed = 0;
let youLose = document.querySelector('.title');
let heartNo = 0;
let li = document.getElementsByTagName('li');
const liTest = document.getElementsByTagName('li');
const ul = document.querySelector('ul');
let unChoose = document.getElementsByClassName('chosen');
let ol = document.getElementsByTagName('ol');

// This button starts the game and removes the overlay

startGame.addEventListener('click', () => {
  let youLose = document.querySelector('.title');
  console.log(youLose.textContent);
  overlay.style.display = 'none';
  if (
    youLose.textContent == 'You lose!' ||
    youLose.textContent == 'You win, well done!'
  ) {
    clearBoard();
    random = getRandomPhraseArray(team);
    addPhraseToDisplay(random);
  }
});

// Below is the array of possible answers

const team = [
  'Manchester United',
  'Liverpool',
  'Crystal Palace',
  'Chelsea',
  'Manchester City',
];

// Below randomly selects one of the answers and stores it in the
// variable randomAnswers

function getRandomPhraseArray(arrayName) {
  randomAnswers = arrayName[Math.floor(Math.random() * arrayName.length)];
  return randomAnswers;
}

let random = getRandomPhraseArray(team);
console.log(random);

// Below creates an array and put each letter of the answer
// into an array separately

function addPhraseToDisplay(random) {
  let lettersArray = [];
  for (let i = 0; i < randomAnswers.length; i++)
    lettersArray.push(randomAnswers.charAt(i));
  for (let j = 0; j < randomAnswers.length; j++) {
    li = document.createElement('li');
    li.textContent = lettersArray[j];
    if (li.textContent === ' ') {
      li.className = 'space';
    } else {
      li.className = 'letter';
    }
    ul.appendChild(li);
  }
}

addPhraseToDisplay(random);

function checkLetter(button) {
  letterFound = false;
  const phraseLetters = document.querySelectorAll('.letter');
  for (let i = 0; i < phraseLetters.length; i += 1) {
    let phraseLetter = letter[i];
    if (phraseLetter.textContent.toLowerCase() === button) {
      phraseLetter.classList.add('show');
      letterFound = true;
    }
  }
  return letterFound;
}

keyboard.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    e.target.classList.add('chosen');
    e.target.disabled = true;
    let chosenButton = e.target.textContent.toLowerCase();
    checkLetter(chosenButton);
    if (!letterFound) {
      i = 0;
      let testChild = document.querySelectorAll('li.tries');
      let testParent = testChild[i].parentNode;
      testParent.removeChild(testChild[i]);
      // heartNo ++;
      missed++;
      letterFound = null;
    }
    checkWin(missed);
  }
});

function checkWin(missed) {
  show = document.querySelectorAll('.show');
  if (show.length === letter.length) {
    overlay.style.display = 'flex';
    overlay.className = 'win';
    startGame.textContent = 'Have another go?';
    youLose.textContent = 'You win, well done!';
  }
  if (missed >= 5) {
    overlay.style.display = 'flex';
    overlay.className = 'lose';
    startGame.textContent = 'Try again';
    youLose.textContent = 'You lose!';
  }
}

function clearBoard() {
  let removeLi = document.querySelectorAll('ul li');
  let unChoose = document.querySelectorAll('.chosen');
  let ula = document.querySelector('ul');
  let ol = document.querySelector('ol');
  let heartsLeft = document.querySelectorAll('.tries');

  for (i = 0; i < removeLi.length; i++) {
    ula.removeChild(removeLi[i]);
  }
  for (i = 0; i < unChoose.length; i++) {
    unChoose[i].disabled = false;
    unChoose[i].classList.remove('chosen');
  }
  for (i = 0; i < heartsLeft.length; i++) {
    ol.removeChild(heartsLeft[i]);
  }
  for (let i = 0; i < 5; i++) {
    let liHeart = document.createElement('LI');
    liHeart.classList.add('tries');
    liHeart.innerHTML =
      '<img src="images/liveHeart.png" height="35px" width="30px">';
    ol.appendChild(liHeart);
  }
  missed = 0;
}
