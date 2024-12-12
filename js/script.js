'use strict';
let outcome, playing, score, attempt;

let scoreEl = document.querySelector('.score');
let attemptEl = document.querySelector('.attempt');


let turnEl = document.querySelector('#turn');
let gameboard = document.querySelector('#gameboard');
let coin = document.querySelector('#coin');

let resultEl = document.querySelector('#result');
let resultText = document.querySelector('#result--text');
let coinResult = document.querySelector('#coin--result');

let playerContainer = document.querySelector('.player--container');

const btnHeads = document.querySelector('#coin--heads');
const btnTails = document.querySelector('#coin--tails');
const newGame = document.querySelector('#new-game');

const init = function () {
    playing = true
    score = 0;
    attempt = 10;

    scoreEl.textContent = score;
    attemptEl.textContent = attempt;
    resultEl.textContent = 'Choose a Coin Side to Start';
    // resultEl.classList.remove('bg-[#50ff5f] text-white');
    // resultEl.classList.remove('bg-[#ff5e5e] text-white');
    // resultEl.classList.add('bg-white text-black');



    btnHeads.classList.remove('hidden');
    btnHeads.classList.add('flex');

    btnTails.classList.remove('hidden');
    btnTails.classList.add('flex');

    newGame.classList.add('hidden');

    coin.src = 'img/coin-unknown.png';
    coinResult.src = 'img/coin-unknown.png';
    resultText.textContent = '???';

}

// Initialize New Game
init();

document.body.style.backgroundColor = ''


const disableBtn = function () {
    btnHeads.classList.remove('flex');
    btnHeads.classList.add('hidden');
    
    btnTails.classList.remove('flex');
    btnTails.classList.add('hidden');
    
    newGame.classList.remove('hidden');
    newGame.classList.add('flex');
}

const flipCoin = function (choice) {
    if (playing) {
        coin.classList.remove('hidden');

        // Math random Heads / Tails
        outcome = Math.trunc(Math.random() * 2) + 1;
        outcome = outcome === 2 ? 'tails' : 'heads';

        // Change src
        coin.src = `img/coin-${choice}.png`;
        coinResult.src = `img/coin-${outcome}.png`;

        // If guessed correctly
        if (choice === outcome) {
            resultEl.textContent = `You guessed it correctly! The coin landed on ${outcome}`;
            resultText.textContent = outcome;
            // Increase score
            score++;
            scoreEl.textContent = score;
            attempt--;
            attemptEl.textContent = attempt;

            // if guessed incorrectly
        } else {
            attempt--;
            attemptEl.textContent = attempt;
            resultEl.textContent = `Too bad. The coin landed on ${outcome}.`
            resultText.textContent = outcome;
        }

        // Winning Prompt
        if (score == 3 && attempt != 0) {
            playing = false;
            resultEl.textContent = 'Congrats! You won the game.'
            
            disableBtn();
        } else if (score != 3 && attempt == 0) {
            playing = false;
            resultEl.textContent = 'Out of attempts. You lost.'
            disableBtn();
        }

    }
}




// Events
btnHeads.addEventListener('click', () => flipCoin('heads'));
btnTails.addEventListener('click', () => flipCoin('tails'));
newGame.addEventListener('click', () => init());