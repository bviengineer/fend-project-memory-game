/*
 * Create a list that holds all of your cards
 */

const deckLIs = document.getElementsByClassName("card"); //deck of cards listed as <li>s (HTMLCollection)
const indexedCards = []; // used inside for loop to capture the index of each <li> in the deck of LIs (deckLIs)
const cardsOpened = []; //to hold the opened cards'
let clickCount = 0;
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

//Loops through deck of HTMLCollections and places each itme in an array
function loopDeck(){
    for(let i = 0; i < deckLIs.length; i++) {
        // deckLIs[i].addEventListener("click", function(event){
        //     console.log(event.target);
        // });
        indexedCards.push(deckLIs[i]); //turns collection into an array
    }
    return indexedCards;
}  

loopDeck();
showCard();

function resetClickCount(){
    clickCount = 0;
}


//show & hide cards
function showCard(){
    // console.log("inside of showCard function: " , indexedCards);
    
    for(let i = 0; i < indexedCards.length; i++){        
        indexedCards[i].addEventListener("click", function(){
            clickCount += 1;

            buttonClicked = indexedCards[i];     

            cardsOpened.push(buttonClicked);

            console.log(buttonClicked, i);

            if(cardsOpened.length < 2 && clickCount < 2){
                cardsOpened[0].classList += " open show";
                console.log("click count of ", clickCount, " is less than 2");
            
            } else if (cardsOpened.length === 2 && cardsOpened[0].childNodes[1].className === cardsOpened[1].childNodes[1].className){
                cardsOpened[0].classList += " open show match";
                cardsOpened[1].classList += " open show match";
                console.log("you made a match");
                console.log("click count of ", clickCount, " is = 2");
                resetClickCount();
                cardsOpened.splice(0);
            
            } else if(cardsOpened.length === 2 && cardsOpened[0].childNodes[1].className !== cardsOpened[1].childNodes[1].className){
                cardsOpened[0].classList += " open show";
                cardsOpened[1].classList += " open show";
                console.log("not a match");
                console.log("click count of ", clickCount, " is = 2");
                setTimeout(notAMatch, 3000);
                resetClickCount();
                // cardsOpened.splice(0)
            
            } //else if(cardsOpened.length > 2) {
            //     console.log("only match two cards at a time")
            //     console.log("click count of ", clickCount, " is > 2");
            //     clickCount = 0;
            //     cardsOpened.splice(2);
            // } 

            //resets unmatched cards
            function notAMatch(){
                cardsOpened[0].classList = "card";
                cardsOpened[1].classList = "card";
                cardsOpened.splice(0);
            }
        });
    }
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
 1. cards are only being comparted for a match on the third click
 */
 
 /* 
LESSONS LEARNED
1. learned that attempting to console.log text + an object will print HTMLObject where the name of the object appears in the console.log statement as JS assumes that you are attempting to join the two data types together. Instead, use a , to print two different data types in a single console.log statement

2.You cannot add an event listener to an HTMLCollection unless it's indexed
*/
