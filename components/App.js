import React, { Component } from 'react';
import Card from './Card';

class App extends Component {
    constructor() {
        super()
        this.state = {
            flipCount: 1,
            cards: [{word: "hello", id: "1", flipped: false, matched: false}, {word: "hello", id: "2", flipped: false, matched: false}, {word: "test", id: "3", flipped: false, matched: false}, {word: "test", id: "4", flipped: false, matched: false}],
        }
    }

    render() {
        const { cards } = this.state;
        // create an array of cards that are "matched"
        const matchedCards = cards.filter((card) => card.matched === true)
        // create an array for all of the cards
        const allCards = cards.map((card) => card.matched === false && <Card key={card.id} word={card.word} id={card.id} flipped={card.flipped} matched={card.matched} onClick={() => this.flipCard(card.id - 1)}/>)
        // always show allCards (it will disappear on its own when all "matched" values are true)
        // only show the winner message when the matchedCards array in memory is full - every card is matched
        return (
            <div>
                <p>Click a card to reveal a hidden word. Then, click another card to reveal another hidden word. If the two words match, those two cards are removed from the playing field. If they don't match, they will go back to being "face-down." Get rid of all of the cards to win.</p>
                {allCards}
                {matchedCards.length === cards.length && this.renderWinningScreen()}
            </div>
        )
    }

    renderWinningScreen = () => {
        // display a winner message
        console.log("the winning screen has appeared!")
        return (
            <div>
                <div>You're winner</div>
                <button>New Game</button>
            </div>
        )
    }

    flipCard = (idx) => {
        const { cards, flipCount } = this.state;

        // if the card at the given index is flipped,
        // don't execute the rest of this function
        if(cards[idx].flipped === true) {
            console.log("you tried to flip a card, but it was already flipped");
            return;
        }

        // set the value of flipped at the card's index
        // to true to indicate that it's been flipped over
        cards[idx].flipped = true;
        console.log("the instructions here say to flip the card at the index specified. The value of card[idx].flipped is " + cards[idx].flipped)

        // set the state of flipCount to the previous state of 
        // flipCount plus one. 
        this.setState((prevState) => ({
            flipCount: prevState.flipCount + 1,
        }))
        console.log("the state of flipcount is now: " + flipCount)
        
        // do the matchCards check after every flip
        this.matchCards();
        console.log("The match cards check has run.")

        // only call hideAllCards if the flip count equals two
        // because there can be no more than two cards flipped at a time. 
        if (flipCount === 2) {
            this.hideAllCards();
            console.log("the hide all cards function has run")
        }

        console.log("this function has finished executing");
        console.log("=======================================")
    }

    hideAllCards = () => {
        const { cards } = this.state;
    
        // loop through every card in the cards array and set the "flipped"
        // value for each of them to be false
        for(let idx = 0; idx < cards.length; idx++) {
            cards[idx].flipped = false;
        }

        // reset the flipCount to zero to ensure that no more than two cards are
        // ever flipped at a time
        this.setState({
            flipCount: 1,
        })
        console.log("hide all cards is running. the state of the flip count is now: " + this.state.flipCount)
    }

    matchCards = () => {
        const { cards } = this.state;
        // create an array from the cards array, but only include the cards that are flipped
        let cardsToMatch = cards.filter((card) => card.flipped === true);
        console.log("the cards that are now flipped are: " + cardsToMatch)

        // if the filtered array has 2 items in it and both items have the same value for "word"...
        if (cardsToMatch.length === 2 && cardsToMatch[0].word === cardsToMatch[1].word) {
            // set the value of "matched" to true for each of these to ensure that they will not render
            // in the main render when the map occurs
            // also un-flip them to avoid pushing more of them into the array
            alert("match")
            cardsToMatch[0].matched = true;
            cardsToMatch[1].matched = true;
            // cardsToMatch[0].flipped = false;
            // cardsToMatch[1].flipped = false;
            console.log("the cards match! the value of " + "cardsToMatch[0].matched" + " is " + cardsToMatch[0].matched + " and the value of cardsToMatch[1].matched is " + cardsToMatch[1].matched) 
            cardsToMatch = [];
        }
        // otherwise, if the filtered array has two items but the values of the words do NOT match...
        else if (cardsToMatch.length === 2 && cardsToMatch[0].word !== cardsToMatch[1].word) {
            // set the value of "flipped" to each card in the filtered array to false.
            alert("no match")
            cardsToMatch[0].flipped = false;
            cardsToMatch[1].flipped = false;

            console.log("the cards don't match... the value of " + "cardsToMatch[0].flipped" + " is " + cardsToMatch[0].flipped + " and the value of cardsToMatch[1].matched is " + cardsToMatch[1].flipped)
        }
        else if (cardsToMatch.length < 2) {
            console.log("the match check array is less than two");
        }
        else {
            console.log("something weird is going on here. Fix this code.")
        }
    }

    // maybe add a function for shuffling cards after winning. See stack overflow for details.
    // shuffleCards = (arrayOfCards) => {
    //     var currentIndex = arrayOfCards.length, temporaryValue, randomIndex;
      
    //     // While there remain elements to shuffle...
    //     while (0 !== currentIndex) {
      
    //       // Pick a remaining element...
    //       randomIndex = Math.floor(Math.random() * currentIndex);
    //       currentIndex -= 1;
      
    //       // And swap it with the current element.
    //       temporaryValue = arrayOfCards[currentIndex];
    //       arrayOfCards[currentIndex] = arrayOfCards[randomIndex];
    //       arrayOfCards[randomIndex] = temporaryValue;
    //     }
      
    //     return arrayOfCards;
    //   }
}

export default App;