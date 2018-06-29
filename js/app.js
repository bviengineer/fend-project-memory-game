// let d = new Date();
//  let pageLoadSec = d.getSeconds();
//  let clickSec = d.getSeconds();
 
//  function startGame(){
//     console.log(clickSec);
//  }

//  setInterval(startGame, 1000);
//  clearInterval(startGame, 10);

//Collections & Arrays
const deckLIs = document.getElementsByClassName("card"); //deck of cards listed as <li>s (HTMLCollection)
    indexedCards = [], // used inside 1st for loop to capture the index of each <li> in the deck of LIs (deckLIs)
    cardsOpened = [], //to hold and compare the opened cards
    myMatches = []; //to hold matched cards
let shuffledDeck = []; //holds deck of shuffled cards

//Trackers & variables
let playerMovesCount = 0, //tracks the # of clicks player makes regardless of a match
    playerPoints = 0, //track points for # of correct guesses
    totalPoints = 0; //holds calculation for playerPoints - playerPenaltyPoints
    playerPenaltyPoints = 0, //deducts points for incorrect guesses
    incorrectGuesses = 0, //keeps tracks of the number of incorrect guesses
    finalStarRating = 0; //star rating to be presented after game buttonClicked; //used in showCards func to hold the click event for each card 
    
//Nodes
let deckUL = document.querySelector(".deck");
    playerMoves = document.querySelector(".moves"),
    modal = document.getElementById("modal-container"),
    closeModal = document.getElementById("close-window-text"),
    modalContent = document.getElementById("modal-content"),
    scoreStars = document.getElementsByClassName("fa fa-star"),
    restartGameButton = document.getElementById("restart"),
    playAgainButton = document.createElement("button");//for restaring game from modal
// let gameTimerHrs = document.getElementById("hrs");
// let gameTimerMins = document.getElementById("mins");
// let gameTimerSecs = document.getElementById("secs");
    startGameButton = document.getElementById("start-timer");

/*UDACITY'S NOTES
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 //UDACITY'S NOTES
// Shuffle function from http://stackoverflow.com/a/2450976
/* 
Used like so
var arr = [2, 11, 37, 42];
arr = shuffle(arr);
console.log(arr);
*/
 function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//MY Logic begins here
// setTimeout(GameInstructions, 200);
loopDeck();
listShuffledDeck();
showCard();

//Loops through deck of HTMLCollections and places each item in an array
function loopDeck(){
    for(let i = 0; i < deckLIs.length; i++) {
        indexedCards.push(deckLIs[i]); //turns collection into an array
    }
    return indexedCards;
}

//Puts shuffled deck on page
function listShuffledDeck(){
    shuffledDeck = indexedCards;
    shuffledDeck = shuffle(shuffledDeck);
    console.log("deck b4 appending to page: ", shuffledDeck); //testiting
    
    for(let j = 0; j < deckUL.length; j++){
        deckUL.removeChild(deckUL[j]);
    }
    
    for(let i = 0; i < shuffledDeck.length; i++){
        deckUL.appendChild(shuffledDeck[i]);
    }
    console.log("deck after appending shuffled cards", deckUL); //testing    
}

//show & hide cards
function showCard(event){
    for(let i = 0; i < shuffledDeck.length; i++){        
        shuffledDeck[i].addEventListener("click", function(){
            buttonClicked = shuffledDeck[i];
            
            //checks for duplicate clicks
            if(buttonClicked.className === "card open show" || buttonClicked.className === "card open show match"){
                invalidMove();
            } else {
                cardsOpened.push(buttonClicked);
                movesCount();
            }
            
            //opening and closing of cards 
            if(cardsOpened.length < 2){
                cardsOpened[0].classList += " open show";                            
            } else if (cardsOpened.length === 2 && cardsOpened[0].childNodes[1].className === cardsOpened[1].childNodes[1].className){
                openCards();
                myCardMatches();                  
                setTimeout(aMatch, 500);
                pointsEarned();
                starRating();
                setTimeout(gameOver, 800);
            } else if(cardsOpened.length === 2 && cardsOpened[0].childNodes[1].className !== cardsOpened[1].childNodes[1].className){
                openCards();
                colorChange();
                incorrectNoGuesses();
                playerPenaltyFunc();         
                setTimeout(notAMatch, 700);                  
                starRating();
                playerPenaltyFunc();       
            }        
        });
    }
}
/* [stand-alone] EVENT LISTENERS, in alaphabetical order */

//closes modal/game status window
closeModal.addEventListener("click", function(){
    modal.style.display = "none";    
});

//resets game from modal
playAgainButton.addEventListener("click", function(){
    modal.style.display = "none";
    
    //restart game timer
    resetGameBoard();
    resetPointsEarned();
    resetWrongGuesses();
    resetPenaltyPoints();
    resetStarRating();
    resetMovesCount();
    resetMyCardMatches(); 
});

//resets game from button on page
restartGameButton.addEventListener("click", function(){
    
    //restarts game timer
    resetGameBoard();
    resetPointsEarned();
    resetWrongGuesses();
    resetPenaltyPoints();
    resetStarRating();
    resetMovesCount();
    resetMyCardMatches();  
    shuffle(shuffledDeck);
    listShuffledDeck();
});
 
 
/* FUNCTIONS BEGIN HERE:
They are in alphabetical order with their corresponding reset counterpart listed immediately after, if any */

//ensures matched cards remain open
function aMatch(){
    cardsOpened[0].classList = "";
    cardsOpened[1].classList = "";
    cardsOpened[0].classList += "card open show match";
    cardsOpened[1].classList += "card open show match";
    clearArray();
}

//clears CardsOpened array after two cards are compared for a match
function clearArray() {
    cardsOpened.splice(0);
}

//changes color of cards when guesses are incorrect
function colorChange(){
    cardsOpened[0].classList = "";
    cardsOpened[1].classList = "";
    cardsOpened[0].classList += "card open show wrongMatch";
    cardsOpened[1].classList += "card open show wrongMatch";
}

//displays game results
function displayModal(){   
    modalContent.innerHTML ="<p>Great job! You matched all the cards.</p> <p>Points earned:  <strong>" + totalPoints + "</strong><br> Star rating: <strong> " + finalStarRating + "</strong><br> Moves made: <strong> " + playerMovesCount + "</strong> <br> Incorrect guesses: <strong>"+ incorrectGuesses + "</strong></p";
    
    //creates, styles and append to modal, button to restart game from modal  
    playAgainButton.innerHTML = "<strong>Play Again</strong>";
    playAgainButton.style.backgroundColor = "cadetblue";
    playAgainButton.style.fontSize = "1em";
    playAgainButton.style.color = "white";
    modalContent.appendChild(playAgainButton);   

    //hides "Close Window" text on modal since modal will be closed by "Play Again" button
    closeModal.style.display = "none";

    modal.style.display = "inline";

    /*
    TO DO:
    -Display time took to complete game in modal
    -DISPLAY star rating in modal
    */
}

//appears after the page loads
function GameInstructions(){
    modalContent.innerHTML =`<p>Welcome to <strong>Memory Game</strong>. To play:
        <ul>
            <li>Select two matching cards by clicking on the cards to reveal their images</li>
            <li>You earn 12.5 points for each matching guess</li>
            <li>You loose 2 points for each incorrect guess</li>
            <li>You earn 4 extra points if you complete the game without any incorrect gueses, OR</li>
            <li>You earn 2 extra points if you complete the game with 2 incorrect guesses, OR</li>
            <li>You earn 1 extra point if you complete the game with 1 incorrect guess</li>
            <li>The game timer will begin as soon as you click your first card and stop once the game is completed or if you restart the game</li>
            <li>Your total points, star rating and moves, will be displayed after you match all cards</li>
        </ul>
    </p>`;      
    modal.style.display = "inline";
}

//dislays modal once all cards are successfully matched
function gameOver(){
    if(myMatches.length === 16 && incorrectGuesses === 0){
        //player earns an addt'l 4-pts if the # no. of incorrect guesses are <= 2
        totalPoints += 4; 
        displayModal()
    } 
        else if(myMatches.length === 16 && incorrectGuesses === 1){
            totalPoints += 2;
            displayModal();    
        }
        else if(myMatches.length === 16 && incorrectGuesses === 2){
            totalPoints += 1;
            displayModal();    
        }
        else if(myMatches.length === 16 && incorrectGuesses > 2){
        displayModal();    
        }
}

//incorrect guesses tracker
function incorrectNoGuesses(){
    incorrectGuesses += 1;
}
//resets incorrect guesses
function resetWrongGuesses(){
    incorrectGuesses = 0;
}

//duplicate card selections notification
function invalidMove(){
    modalContent.innerHTML ="<p>Please try again! That card has already been selected. <br> <p>You've made:  <strong>" + playerMovesCount + "</strong> moves</p>";

    modal.style.display = "inline";
}

//tracks & displays number of moves player makes 
function movesCount(){
    playerMovesCount += 1;
    playerMoves.innerHTML = playerMovesCount;
}
//resets player moves
function resetMovesCount(){
    playerMovesCount = 0;
    playerMoves.innerHTML = playerMovesCount;
}

//array of matched cards/pairs
function myCardMatches(){
    myMatches.push(cardsOpened[0]);
    myMatches.push(cardsOpened[1]);
}
//resets array of matched cards
function resetMyCardMatches(){
    myMatches.splice(0);
}

//closes unmatched cards & clears the cardsOpened array
function notAMatch(){
    cardsOpened[0].classList = "";
    cardsOpened[1].classList = "";
    cardsOpened[0].classList += "card";
    cardsOpened[1].classList += "card";
    clearArray();
}

//opens selected cards
function openCards(){
    cardsOpened[0].classList = "";
    cardsOpened[1].classList = "";
    cardsOpened[0].classList += "card open show";
    cardsOpened[1].classList += "card open show";
}

//deducts points for incorrect guesses & for use with starRating function
function playerPenaltyFunc(){
   playerPenaltyPoints += 2;
}
//resets penalty points 
function resetPenaltyPoints(){
    playerPenaltyPoints = 0;
}

//tracks player points for correct guesses
function pointsEarned   (){
    playerPoints += 12.5;
    totalPoints = playerPoints - playerPenaltyPoints;
}
//resets playerPoints 
function resetPointsEarned(){
    playerPoints = 0;
    totalPoints = 0;
}

//resets game board
function resetGameBoard(){
    for(let i = 0; i < indexedCards.length; i++){
        indexedCards[i].className = "";
        indexedCards[i].className = "card";
    }
}

//star rating
const starRating = function(){
    if(incorrectGuesses === 0 || incorrectGuesses <= 4){
        scoreStars[0].style.display= "inline";
        scoreStars[1].style.display = "inline";
        scoreStars[2].style.display = "inline";
        finalStarRating = 3;
    } else if(incorrectGuesses >= 5 && incorrectGuesses <= 10){
        scoreStars[0].style.display = "inline";
        scoreStars[1].style.display = "inline";
        scoreStars[2].style.display = "none";
        finalStarRating = 2;
    } else if(incorrectGuesses > 10){
        scoreStars[0].style.display = "inline";
        scoreStars[1].style.display = "none";
        scoreStars[2].style.color = "none";
        finalStarRating = 1;
    } 
}
//restart star rating 
function resetStarRating(){
    for(let i = 0; i < scoreStars.length; i++){
        scoreStars[i].style.display = "inline";
    }
}

//game timer
// function startGame(){
//     if(gameTimerSecs.value === 0 && myMatches.length < 16){
//         gameTimerSecs += 1;
//         gameTimerSecs.value = gameTimerSecs;
//         console.log(gameTimerSecs.value);
//     }
// }
//My logic endds here

/* UDACITY'S NOTES
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 
 /*My Observations
 BUGS
NONE at this time  
 */

 
 

