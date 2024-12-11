'use strict';


let playing = true
let score = 0;
let attempt = 10;

let scoreEl = document.querySelector('#score');
let attemptEl = document.querySelector('#attempt');


let turnEl = document.querySelector('#turn');
let gameboard = document.querySelector('#gameboard');
let coin = document.querySelector('#coin');

let resultEl = document.querySelector('#result');
let resultText = document.querySelector('#result--text');
let coinResult = document.querySelector('#coin--result');

let playerContainer = document.querySelector('.player--container');




const btnHeads = document.querySelector('#coin--heads');
const btnTails = document.querySelector('#coin--tails');

let outcome;

const disableBtn = function() {
    btnHeads.disabled = true;
    btnTails.disabled = true;
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
        } else if (score != 3 && attempt == 0) {
            playing = false;
            resultEl.textContent = 'Out of attempts. You lost.'
        }
        

        
    } else {
        disableBtn();
    }
}




// Flip Coin
btnHeads.addEventListener('click', () => flipCoin('heads'));
btnTails.addEventListener('click', () => flipCoin('tails'));