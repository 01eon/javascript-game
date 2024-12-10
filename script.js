'use strict';

// Selecting Elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');

const score0EL = document.querySelector('#score--0');
const current0EL = document.getElementById('current--0');

const score1EL = document.getElementById('score--1');
const current1EL = document.getElementById('current--1');

const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// // Starting Conditions
let scores, currentScore, activePlayer, playing;


function init() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    
    current0EL.textContent = 0;
    current1EL.textContent = 0;

    score0EL.textContent = 0;
    score1EL.textContent = 0;

    diceEL.classList.add('hidden');

    player0EL.classList.remove('player--winner');
    player1EL.classList.remove('player--winner');

    player0EL.classList.add('player--active');
    player1EL.classList.remove('player--active');
}

init();


// Function
function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;

    // console.log("Switch to Player " + activePlayer);

    activePlayer = activePlayer === 0 ? 1 : 0;
    player0EL.classList.toggle('player--active');
    player1EL.classList.toggle('player--active');
}

// Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
    console.log(playing);
    if (playing) {
        // 1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. Display Dice
        diceEL.classList.remove('hidden');
        diceEL.src = `dice-${dice}.png`;
        console.log(dice);

        // 3. Check for rolled 1
        if (dice != 1) {
            currentScore += dice;

            console.log('Current Score: ' + (currentScore));

            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer()
        }
    }

})

btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;

        console.log('Player ' + activePlayer + ' held his score of ' + currentScore + '.');

        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        console.log(scores);

        // 2. Check score if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            // Game ends
            playing = false;
            diceEL.classList.add('hidden');

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

        } else {
            // Switch to the next player
            switchPlayer();
            console.log('Player ' + activePlayer + ' is now playing.');
        }
    }




})


btnNew.addEventListener('click', init);