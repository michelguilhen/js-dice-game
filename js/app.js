/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gameOver;

newGame();

// ROLL - BTN
document.querySelector('.btn-roll').addEventListener('click', function () {
   if (!gameOver) {
      //1. Random Number
      var dice = Math.floor(Math.random() * 6) + 1;

      //2. Display the result
      var diceDOM = document.querySelector('.dice');
      diceDOM.style.display = 'block';
      diceDOM.src = '../img/dice-' + dice + '.png';

      // 3. Update the round score if rolled number wasn't ONE (1).
      if (dice !== 1) {

         //Add score 
         roundScore += dice;
         document.getElementById('current-' + activePlayer).textContent = roundScore;

      } else {

         //Next player
         nextPlayer();
      }
   }
});

// HOLD - BTN
document.querySelector('.btn-hold').addEventListener('click', function () {
   if (!gameOver) {
      //Add current score to players score
      scores[activePlayer] += roundScore;

      //Update the UI
      document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

      //Check if the game is over
      if (scores[activePlayer] >= 100) {
         document.getElementById('name-' + activePlayer).textContent = 'Winner!';
         document.querySelector('.dice').style.display = 'none';
         document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
         document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

         gameOver = true;
      } else {
         //Next player
         nextPlayer();
      }
   }
});

// NEW GAME - BTN
document.querySelector('.btn-new').addEventListener('click', newGame);

// Functions
function nextPlayer() {
   document.getElementById('current-' + activePlayer).textContent = '0';

   activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
   roundScore = 0;

   document.querySelector('.player-0-panel').classList.toggle('active');
   document.querySelector('.player-1-panel').classList.toggle('active');

   document.querySelector('.dice').style.display = 'none';
}

function newGame() {
   scores = [0, 0];
   roundScore = 0;
   activePlayer = 0;
   gameOver = false;

   document.querySelector('.dice').style.display = 'none';

   document.getElementById('score-0').textContent = '0';
   document.getElementById('score-1').textContent = '0';
   document.getElementById('current-0').textContent = '0';
   document.getElementById('current-1').textContent = '0';

   document.getElementById('name-0').textContent = 'Player 1';
   document.getElementById('name-1').textContent = 'Player 2';

   document.querySelector('.player-0-panel').classList.remove('winner');
   document.querySelector('.player-1-panel').classList.remove('winner');

   document.querySelector('.player-0-panel').classList.remove('active');
   document.querySelector('.player-1-panel').classList.remove('active');

   document.querySelector('.player-0-panel').classList.add('active');
}


// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// var x = document.querySelector('#score-0').textContent;
// document.querySelector('btn-roll').addEventListener('click', btn);
// function btn() {
//    //Do Something
// }