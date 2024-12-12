'use strict';
let outcome, playing, score, attempt;

let scoreEl = document.querySelector('#score');
let scoreMobileEl = document.querySelector('#scoreMobile')
let attemptEl = document.querySelector('#attempt');
let attemptMobileEl = document.querySelector('#attemptMobile');


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



    btnHeads.classList.remove('hidden');
    btnHeads.classList.add('flex');

    btnTails.classList.remove('hidden');
    btnTails.classList.add('flex');

    newGame.classList.add('hidden');

    coin.src = 'img/coin-unknown.png';
    coinResult.src = 'img/coin-unknown.png';
    resultText.textContent = '???';

    // For Testing Purposes
    console.clear();
    
}

// Initialize New Game
init();



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
            scoreMobileEl.textContent = score;
            attempt--;
            attemptEl.textContent = attempt;
            attemptMobileEl.textContent = attempt;

            // if guessed incorrectly
        } else {
            attempt--;
            attemptEl.textContent = attempt;
            attemptMobileEl.textContent = attempt;
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

    // For Testing Purposes
    console.log('MOBILE')
    console.log(`Attempt: ${attemptMobileEl.textContent} | Score: ${scoreMobileEl.textContent} `);
    console.log("");

    console.log('TABLET')
    console.log(`Attempt: ${attemptEl.textContent} | Score: ${scoreEl.textContent} `);
    console.log("");

    

}




// Events
btnHeads.addEventListener('click', () => flipCoin('heads'));
btnTails.addEventListener('click', () => flipCoin('tails'));
newGame.addEventListener('click', () => init());