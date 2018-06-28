//Collections & Arrays
const deckLIs = document.getElementsByClassName("card"), //deck of cards listed as <li>s (HTMLCollection)
    indexedCards = [], // used inside 1st for loop to capture the index of each <li> in the deck of LIs (deckLIs)
    cardsOpened = [], //to hold and compare the opened cards
    myMatches = []; //to hold matched cards

//Trackers & variables
let playerMovesCount = 0, //tracks the # of clicks player makes regardless of a match
    playerPoints = 0, //track points for # of correct guesses
    playerPenaltyPoints = 0, //deducts points for incorrect guesses
    incorrectGuesses = 0, //keeps tracks of the number of incorrect guesses
    buttonClicked; //used in showCards func to hold the click event for each card 
    
//Nodes
let playerMoves = document.querySelector(".moves"),
    modal = document.getElementById("modal-container"),
    closeModal = document.getElementById("close-window-text"),
    modalContent = document.getElementById("modal-content"),
    scoreStars = document.getElementsByClassName("fa fa-star"),
    restartGameButton = document.getElementById("restart"),
    playAgainButton = document.createElement("button");//for restaring game from modal
// let gameTimerHrs = document.getElementById("hrs");
// let gameTimerMins = document.getElementById("mins");
// let gameTimerSecs = document.getElementById("secs");
    startGameButon = document.getElementById("start-timer");

/*UDACITY'S NOTES
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 //UDACITY'S NOTES
// Shuffle function from http://stackoverflow.com/a/2450976
 //array was the var that once appeared where all appereances of deck exist in the shuffle function
 function shuffle(indexedCards) {
    var currentIndex = indexedCards.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = indexedCards[currentIndex];
        indexedCards[currentIndex] = indexedCards[randomIndex];
    }
    return indexedCards;
}

//MY Logic begins here
loopDeck();
showCard();

//shuffles deck if shuff button is clicked
// shuffleDeck.addEventListener("click", function(){
//     shuffle();
// });

//Loops through deck of HTMLCollections and places each item in an array
function loopDeck(){
    for(let i = 0; i < deckLIs.length; i++) {
        indexedCards.push(deckLIs[i]); //turns collection into an array
    }
    return indexedCards;
}
 
//show & hide cards
function showCard(){    
    for(let i = 0; i < indexedCards.length; i++){        
        indexedCards[i].addEventListener("click", function(){
            buttonClicked = indexedCards[i]; 
                        
            //checks for duplicate clicks
            if(buttonClicked.className === "card open show" || buttonClicked.className === "card open show match"){
                invalidMove();
            } else {
                cardsOpened.push(buttonClicked)
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
                openCards()
                colorChange()               
                setTimeout(notAMatch, 700);  
                incorrectNoGuesses();
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
    modal.style.display = "inline";
   
    modalContent.innerHTML ="<p>Great job! <br> Points earned:  <strong>" + playerPoints + "</strong></p> <p>You made:  <strong>" + playerMovesCount + "</strong> moves</p><p>Numeber of incorrect guesses: <strong>"+ incorrectGuesses + "</strong></p";
    
    //creates, styles and append to modal, button to restart game from modal  
    playAgainButton.innerHTML = "<strong>Play Again</strong>";
    playAgainButton.style.backgroundColor = "cadetblue";
    playAgainButton.style.fontSize = "1em";
    playAgainButton.style.color = "white";
    modalContent.appendChild(playAgainButton);   

    //hides "Close Window" text on modal since modal will be closed by "Play Again" button
    closeModal.style.display = "none";

    /*
    TO DO:
    -Display time took to complete game in modal
    -DISPLAY star rating in modal
    */
}

//dislays modal once all cards are successfully matched
function gameOver(){
    if(myMatches.length === 16 && incorrectGuesses === 0){
        //player earns an addt'l 4-pts if the # no. of incorrect guesses are <= 2
        playerPoints += 4; 
        displayModal();
    } 
        else if(myMatches.length === 16 && incorrectGuesses === 1){
            playerPoints += 2;
            displayModal();    
        }
        else if(myMatches.length === 16 && incorrectGuesses === 2){
            playerPoints += 1;
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
    modal.style.display = "inline";

    modalContent.innerHTML ="<p>Please try again! That card has already been selected. <br> Points earned:  <strong>" + playerPoints + "</strong></p> <p>You've made:  <strong>" + playerMovesCount + "</strong> moves</p>";
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
   playerPenaltyPoints -= 2;
}
//resets penalty points 
function resetPenaltyPoints(){
    playerPenaltyPoints = 0;
}

//tracks player points for correct guesses
function pointsEarned   (){
    playerPoints += 12;
}
//resets playerPoints 
function resetPointsEarned(){
    playerPoints = 0;
}

//resets game board
function resetGameBoard(){
    for(let i = 0; i < indexedCards.length; i++){
        indexedCards[i].className = "";
        indexedCards[i].className = "card";
    }
}

//player points earned was PointsEarned
function starRating(){
    if(playerPoints > 8 && playerPoints <= 24){
        scoreStars[0].style.color = "yellow";
        scoreStars[1].style.display = "none";
        scoreStars[2].style.display = "none";
    } else if(playerPoints > 24 && playerPoints <= 40){
        scoreStars[0].style.display = "yellow";
        scoreStars[1].style.color = "yellow";
        scoreStars[2].style.display = "none";
    } else if(playerPoints === 0){
        scoreStars[0].style.color = "yellow";
        scoreStars[1].style.color = "yellow";
        scoreStars[2].style.color = "yellow";
    }
}
//restart star rating 
function resetStarRating(){
    for(let i = 0; i < scoreStars.length; i++){
        scoreStars[i].style.display = "inline";
    }
}

//game timer
function startGame(){
    if(gameTimerSecs.value === 0 && myMatches.length < 16){
        gameTimerSecs += 1;
        gameTimerSecs.value = gameTimerSecs;
        console.log(gameTimerSecs.value);
    }
}
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

