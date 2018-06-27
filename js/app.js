//Collections & Arrays
const deckLIs = document.getElementsByClassName("card"); //deck of cards listed as <li>s (HTMLCollection)
const indexedCards = []; // used inside 1st for loop to capture the index of each <li> in the deck of LIs (deckLIs)
const cardsOpened = []; //to hold the opened cards'
const myMatches = []; //to hold the cards that have been matched;

//Trackers & variables
let playerMovesCount = 0; //the amount of clicks the player makes regardless of a match
let playerPoints = 0; //keeps track of players points
let clickCount = 0; //keeps track of the amount of clicks before matching the cards
let buttonClicked; //used in 2nd for loop to hold the click event for the cards

//Nodes
let playerMoves = document.querySelector(".moves"); 
let modal = document.getElementById("modal-container");
let closeModal = document.getElementById("close-window-text");
let modalContent = document.getElementById("modal-content");
let scoreStars = document.getElementsByClassName("fa fa-star");
let restartGameButton = document.getElementById("restart");
let playAgainButton = document.createElement("button");//for restaring game from modal
let gameTimerHrs = document.getElementById("hrs");
let gameTimerMins = document.getElementById("mins");
let gameTimerSecs = document.getElementById("secs");
let startGameButon = document.getElementById("start-timer");

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
            
            console.log(buttonClicked.classList.value);
            
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
                setTimeout(aMatch, 500);
                myCardMatches();                                
                pointsEarned();                
                setTimeout(gameOver, 800);
            } else if(cardsOpened.length === 2 && cardsOpened[0].childNodes[1].className !== cardsOpened[1].childNodes[1].className){
                openCards()
                colorChange()               
                setTimeout(notAMatch, 700);         
            }        
        });
    }
}
 
//clears array that holds cards to be compared for a match
function clearArray() {
    cardsOpened.splice(0);
}

//show cards selected
function openCards(){
    cardsOpened[0].classList = "";
    cardsOpened[1].classList = "";
    cardsOpened[0].classList += "card open show";
    cardsOpened[1].classList += "card open show";
}

//Card selections match
function aMatch(){
    cardsOpened[0].classList = "";
    cardsOpened[1].classList = "";
    cardsOpened[0].classList += "card open show match";
    cardsOpened[1].classList += "card open show match";
    clearArray();
}

//arry of all card matches/pairs
function myCardMatches(){
    myMatches.push(cardsOpened[0]);
    myMatches.push(cardsOpened[1]);
}   

//resets array with matched cards
function resetMyCardMatches(){
    myMatches.splice(0);
}

//wrong match color change
function colorChange(){
    cardsOpened[0].classList = "";
    cardsOpened[1].classList = "";
    cardsOpened[0].classList += "card open show wrongMatch";
    cardsOpened[1].classList += "card open show wrongMatch";
}

//resets unmatched cards
function notAMatch(){
    cardsOpened[0].classList = "";
    cardsOpened[1].classList = "";
    cardsOpened[0].classList += "card";
    cardsOpened[1].classList += "card";
    clearArray();
}

//player points
function pointsEarned(){
    playerPoints += 2;
    if(playerPoints > 12 && playerPoints <= 16){
        scoreStars[0].style.color = "yellow";
        scoreStars[1].style.display = "none";
        scoreStars[2].style.display = "none";
    } else if(playerPoints > 8 && playerPoints <= 12){
        scoreStars[0].style.display = "yellow";
        scoreStars[1].style.color = "yellow";
        scoreStars[2].style.display = "none";
    } else if(playerPoints === 0){
        scoreStars[0].style.color = "yellow";
        scoreStars[1].style.color = "yellow";
        scoreStars[2].style.color = "yellow";
    }
}

// //reset starRating
// function resetStarRating(){
//     scoreStars[0].style.display = "";
//     scoreStars[1].style.display = "";
//     scoreStars[2].style.display = "";
//     scoreStars[0].style.display = "inline";
//     scoreStars[1].style.display = "inline";
//     scoreStars[2].style.display = "inline";
//     console.log(storeStars[0]);

// }

//resets playerPoints
function resetPointsEarned(){
    playerPoints = 0;
}

//number of moves player makes 
function movesCount(){
    playerMovesCount += 1;
    playerMoves.innerHTML = playerMovesCount;
}

//resets player moves
function resetMovesCount(){
    playerMovesCount = 0;
    playerMoves.innerHTML = playerMovesCount;
}

//all matches successful
function gameOver(){
    if(myMatches.length === 16){
       displayModal();    
    }   
}

//close modal/game status window
closeModal.addEventListener("click", function(){
    modal.style.display = "none";    
});

//displays game results
function displayModal(){
    modal.style.display = "inline";
   
    modalContent.innerHTML ="<p>Great job! <br> Points earned:  <strong>" + playerPoints + "</strong></p> <p>You made:  <strong>" + playerMovesCount + "</strong> moves</p>";
    
    //creates & styles button to restart game from modal  
    playAgainButton.innerHTML = "<strong>Play Again</strong>";
    playAgainButton.style.backgroundColor = "cadetblue";
    playAgainButton.style.fontSize = "1em";
    playAgainButton.style.color = "white";
    modalContent.appendChild(playAgainButton);   

    closeModal.style.display = "none";//hides close window text on modal since modal will be closed by play again buttonHide

    /*TO DO:
    -Display time took to complete game
    -star rating */
}

//duplicate card selections notification
function invalidMove(){
    modalContent.innerHTML ="<p>Please try again! That card has already been selected. <br> Points earned:  <strong>" + playerPoints + "</strong></p> <p>You made:  <strong>" + playerMovesCount + "</strong> moves</p>";

    modal.style.display = "inline";
}

//restart game from modal
playAgainButton.addEventListener("click", function(){
    modal.style.display = "none";
    //restart game timer
    resetStarRating();
    resetMovesCount();  
    resetGameBoard();
    resetMyCardMatches();
    resetPointsEarned();
    resetStarRating();
});

//event listener reset game board, timer & star rating
restartGameButton.addEventListener("click", function(){
    //restarts game timer
    resetStarRating();
    resetMovesCount();    
    resetGameBoard();
    resetMyCardMatches();
    resetPointsEarned();
    resetStarRating();
});

//resets game board
function resetGameBoard(){
    for(let i = 0; i < indexedCards.length; i++){
        indexedCards[i].className = "";
        indexedCards[i].className = "card";
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
startGame();
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

