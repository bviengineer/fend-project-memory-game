/*
 * Create a list that holds all of your cards
 */
const deckLIs = document.getElementsByClassName("card"); //deck of cards listed as <li>s (HTMLCollection)
const indexedCards = []; // used inside for loop to capture the index of each <li> in the deck of LIs (deckLIs)
const cardsOpened = []; //to hold the opened cards'
const myMatches = []; //to hold the cards that have been matched;

let playerMoves = document.querySelector(".moves");
let playerMovesCount = 0; //the amount of clicks the player makes regardless of a match
let clickCount = 0; //keeps track of the amount of clicks before matching the cards
let playerPoints = 0; //keeps track of players points
let buttonClicked;

// let cardClicked; //hold selected card
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
 //array was the var that once appeared where all appereances of deck exist in the shuffle function
function shuffle(deck) {
    var currentIndex = deck.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = deck[currentIndex];
        deck[currentIndex] = deck[randomIndex];
    }
    return deck;
}

loopDeck();
showCard();

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
            clickCount += 1;

            buttonClicked = indexedCards[i];     

            cardsOpened.push(buttonClicked); //pushes initial card to cardsOpened array

            console.log(buttonClicked, i);

            if(cardsOpened.length < 2 && clickCount < 2){
                cardsOpened[0].classList += " open show";
                console.log("click count ", clickCount, " of 2");
                movesCount();

            } else if (cardsOpened.length === 2 && cardsOpened[0].childNodes[1].className === cardsOpened[1].childNodes[1].className){
                openCards();
                myCardMatches();                   
                setTimeout(aMatch, 1000);                
                pointsEarned();
                movesCount();
                console.log(myCardMatches);
                console.log("you made a match");
                console.log("click count ", clickCount, " of ", clickCount);

            } else if(cardsOpened.length === 2 && cardsOpened[0].childNodes[1].className !== cardsOpened[1].childNodes[1].className){
                openCards();
                setTimeout(notAMatch, 3000);
                console.log("not a match");
                console.log("click count ", clickCount, " of ", clickCount);
                movesCount();           
            }            
        });
    }
}
 
//resets click counter
 function resetClickCount(){
    clickCount = 0;
}

//clears array that holds cards to be compared for a match
function clearArray() {
    cardsOpened.splice(0);
}

//shows cards selected
function openCards(){
    cardsOpened[0].classList = "";
    cardsOpened[1].classList = "";
    cardsOpened[0].classList += "card open show";
    cardsOpened[1].classList += "card open show";
}

//Cards selections match
function aMatch(){
    cardsOpened[0].classList = "";
    cardsOpened[1].classList = "";
    cardsOpened[0].classList += "card open show match";
    cardsOpened[1].classList += "card open show match";
    resetClickCount();
    clearArray();
}

//card matches
function myCardMatches(){
    myMatches.push(cardsOpened);
}

//resets unmatched cards
function notAMatch(){
    cardsOpened[0].classList = "";
    cardsOpened[1].classList = "";
    cardsOpened[0].classList = "card";
    cardsOpened[1].classList = "card";
    resetClickCount();
    clearArray();
}

function pointsEarned(){
    playerPoints += 1;
}

function movesCount(){
    playerMovesCount += 1;
    playerMoves.innerHTML = playerMovesCount;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 
 /*
 BUGS
 1. if card is already open & the same card is clicked again, it's registere as a click and compared to the card already in the array
 */
 
 /* 
LESSONS LEARNED
1. learned that attempting to console.log text + an object will print HTMLObject where the name of the object appears in the console.log statement as JS assumes that you are attempting to join the two data types together. Instead, use a , to print two different data types in a single console.log statement

2.You cannot add an event listener to an HTMLCollection unless it's indexed
*/
