/*
 * Create a list that holds all of your cards
 */

const deckLIs = document.getElementsByClassName("card"); //deck of cards listed as <li>s
const indexedCards = []; // used inside for loop to capture the index of each <li> in the deck of LIs (deckLIs)

const deckIs = document.getElementsByClassName("fa");
let cardClicked; //hold selected card

// const cardsOpened = []; //to hold more than one selected card 
// const wrongMatch = []; //to hold cards that did not match

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

function loopDeck(){
    for(let i = 0; i < deckLIs.length; i++) {
        // console.log("card in deck: ", deckLIs[i]);
        indexedCards.push(deckLIs[i]);
    }
    return indexedCards;
}   

loopDeck();
console.log(indexedCards);


//learned that attempting to console.log text + an object will print HTMLObject where the name of the object appears in the console.log statement as JS assumes that you are attempting to join the two data types together. Instead, use a , to print two different data types in a single console.log statement





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
