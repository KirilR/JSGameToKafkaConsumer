'use strict';
// first thing to do is that we are going to make the already given numbers and the dice to disappear
// here we see two methods of selecting elements by ID
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); // there is no need to use hash here
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
//const btnNew = document.querySelector('.btn--new');
//getElemetByID is a bit faster than the query selector
let scores, currentScore, activePlayer;
let playing;
const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  // hide the dice

  //Rolling the dice
  //Rolling event
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  currentScore = 0;

  playing = true;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    // generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display th egenerated dice by removing the hidden class
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //check for rolled 1 and if true - switch to next
    if (dice !== 1) {
      currentScore += dice;
      //current0El.textContent = currentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to the active player`s score
    scores[activePlayer] += currentScore;
    console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //check if the score is up to 100
    if (scores[activePlayer] >= 20) {
      playing = false;
      //assign the player with the winner class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      //addActivePlayerClass();
      //remove the active player class as well in order not to have both classes
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
    //finish the game

    //switch to the next player
  }
});

btnNew.addEventListener('click', init);
