/*
 * Create a list that holds all of your cards
 */

const deck = document.getElementsByClassName("card");
let i; //var for for loop
let cardClicked; //hold selected card
let cardsOpened = []; //to hold more than one selected card 

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

//displays symbol of card after its been selected & pushes selection to an array
const showSymbol = function(event){
    event.target.className += " open show";
    cardClicked = event.target.childNodes[1].className;

    if(cardsOpened.length < 2){
        cardsOpened.push(cardClicked);
        console.log(cardsOpened);
    } else {
        alert("there are two things in this array already, don't add anymore and compare what you have to see if they match - alright, carry on!");
    }
    
 }
 
//for loop w/ click event listener
 for(i = 0; i < deck.length; i++) {
    deck[i].addEventListener("click", showSymbol);      
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
