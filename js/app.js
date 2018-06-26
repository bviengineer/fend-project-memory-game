//Collections & Arrays
const deckLIs = document.getElementsByClassName("card"); //deck of cards listed as <li>s (HTMLCollection)
const indexedCards = []; // used inside 1st for loop to capture the index of each <li> in the deck of LIs (deckLIs)
const cardsOpened = []; //to hold the opened cards'
const myMatches = []; //to hold the cards that have been matched;

//Trackers
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
let shuffleDeck = document.getElementsByClassName("restart");

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
        
            cardsOpened.push(buttonClicked); //pushes initial card to cardsOpened array

            clickCount += 1;
                      
            //may not need the clickCounter
            if(cardsOpened.length < 2 && clickCount < 2){
                cardsOpened[0].classList += " open show";
                            
            } else if (cardsOpened.length === 2 && cardsOpened[0].childNodes[1].className === cardsOpened[1].childNodes[1].className){
                openCards();                  
                myCardMatches();
                setTimeout(aMatch, 500);                
                pointsEarned();
                movesCount();
                setTimeout(gameOver, 600);
                console.log("These are the classes for the cards I've matched, so far:", myMatches);
                console.log("you made a match");movesCount(); //testing purposes
                console.log("click count ", clickCount, " of ", clickCount); //testing purposes

            } else if(cardsOpened.length === 2 && cardsOpened[0].childNodes[1].className !== cardsOpened[1].childNodes[1].className){
                openCards();
                colorChange();
                setTimeout(notAMatch, 800);
                movesCount();
                console.log("not a match"); //testing purposes
                console.log("click count ", clickCount, " of ", clickCount) //testing purposes;                       
            }        
        });
    }
}
 
//resets click counter
 function resetClickCount(){
    clickCount = 0;
}

//resets classList on LIs
// function clearClassList(){
//     cardsOpened[0].classList = "";
//     cardsOpened[1].classList = ""; 
// }

//clears array that holds cards to be compared for a match
function clearArray() {
    cardsOpened.splice(0);
}

 //checks for duplicate clicks
 function duplicateClicks(){
    if(cardsOpened.length > 1 && buttonClicked.childNodes[1] === cardsOpened[0].childNodes[1]){
       console.log("you clicked on that card already, please try anohter"); //for testing
       console.log(buttonClicked.childNodes[1]);
       cardsOpened.shift();
        clickCount = 1;
    } else if(cardsOpened.length > 1 && buttonClicked.childNodes[1] === cardsOpened[1].childNodes[1]){
       cardsOpened.pop();
       clickCount = 1;
   }
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

//card matches
function myCardMatches(){
    myMatches.push(cardsOpened[0]);
    myMatches.push(cardsOpened[1]);
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
    resetClickCount();
    clearArray();
}

//player points
function pointsEarned(){
    playerPoints += 2;
    if(playerPoints > 2 && playerPoints <= 7){
        scoreStars[0].style.color = "yellow";
    } else if(playerPoints > 8 && playerPoints <= 12){
        scoreStars[0].style.color = "yellow";
        scoreStars[1].style.color = "blue";
    } else if(playerPoints === 16){
        scoreStars[0].style.color = "yellow";
        scoreStars[1].style.color = "blue";
        scoreStars[2].style.color = "green";
    }
}

//number of moves player makes 
function movesCount(){
    playerMovesCount += 1;
    playerMoves.innerHTML = playerMovesCount;
}

//all matches successful
function gameOver(){
    if(myMatches.length === 16){
       displayModal();    
    }   
}

//closes modal
closeModal.addEventListener("click", function(){
    modal.style.display = "none";    
});

//displays modal with results
function displayModal(){
    modalContent.innerHTML +="<p>Great job! <br> Points earned:  <strong>" + playerPoints+ "</strong></p> <p>You made:  <strong>" + playerMovesCount + "</strong> moves</p>" ;
    modal.style.display = "inline";
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
 1. if card is already open & the same card is clicked again, it's registere as a click and compared to the card already in the array
 2. Since implementing the color change for incorrect matches, there's a delay after clicking card either a correct after a match or incorrect match
 */
 
 /* My Lessons
LESSONS LEARNED
1. learned that attempting to console.log text + an object will print HTMLObject where the name of the object appears in the console.log statement as JS assumes that you are attempting to join the two data types together. Instead, use a , to print two different data types in a single console.log statement

2.You cannot add an event listener to an HTMLCollection unless it's indexed
*/
