
// Credit Reference: (Ania Kubow)  Youtube Tutorial for Memory Card Game: https://www.youtube.com/watch?v=tjyDOHzKN0w&ab_channel=CodewithAniaKub%C3%B3w

// Credit Reference: (Florin Pop) Youtube Tutorial for Countdown Timer: https://www.youtube.com/watch?v=x7WJEmxNlEs&ab_channel=FlorinPop

// Credit Reference: Durstend Shuffle

// pull request test


document.addEventListener('DOMContentLoaded', () => {

  async function fetchUser(){
    const response = await fetch("http://localhost:3000/app/user/")
    const user = await response.json()
  
    return user
  }

  let user;

  fetchUser().then(data => {
    user = data;
    create_board();
  });

  /******** Establishing Timer ***************** */
  const starting_minutes = 0

  let time = starting_minutes * 60 // Total Seconds for our Timer

  const timer = document.getElementById('countdown') // Get access to our paragraph html element

  let x = setInterval(updateTimer, 1000); // 1000 ms converts to 1 second which is why we will call this expression at these intervals

 function updateTimer(){
   let minutes = Math.floor(time/60)

   let seconds = time % 60

   if(seconds < 10){
     seconds = '0' + seconds
   }

   timer.innerHTML = `${minutes}:${seconds}`
   time ++;

  //  if(time == 121){ // Stop the clock and signal the user lost, also disable all cards
  //    clearInterval(x)
  //   document.body.style.background = 'FireBrick'

  //   var cards = document.querySelectorAll('img')

  //   for(let i = 0; i < cards.length; i++){
  //    cards[i].removeEventListener('click', flipcard)
  //   }

  //  }

 }
 /*************************************************************** */

  /* JS Implementation of Durstend Shuffle */
  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
/**************************************************************** */
const deckofcards = [

  {
    name: 'halloween',
  
    img: '.github/images/halloween.jpg'
  
  
  
  },

{
  name: 'coffee',

  img: '.github/images/coffee.png'

},


{ 

  name: 'dj',

  img: '.github/images/dj.jpg'



},




{
  name: 'glass',

  img: '.github/images/glass.jpg'



},

{
  name: 'coffee',

  img: '.github/images/coffee.png'

},

{
  name: 'polar_bear',

  img: '.github/images/polar_bear.jpg'



},

{
  name: 'halloween',

  img: '.github/images/halloween.jpg'



},



{
  name: 'lighthouse',

  img: '.github/images/lighthouse.jpg'



},

{
  name: 'lighthouse',

  img: '.github/images/lighthouse.jpg'



},

{
  name: 'maple',

  img: '.github/images/maple.png'



},

{
  name: 'rooster',

  img: '.github/images/rooster.png'



},

{
  name: 'polar_bear',

  img: '.github/images/polar_bear.jpg'



},

{ 

  name: 'dj',

  img: '.github/images/dj.jpg'



},

{
  name: 'maple',

  img: '.github/images/maple.png'



},

{
  name: 'tree',

  img: '.github/images/tree.jpg'



},

{
  name: 'rasberry',

  img: '.github/images/rasberry.png'



},


{
  name: 'rooster',

  img: '.github/images/rooster.png'



},



{
  name: 'temple',

  img: '.github/images/temple.jpg'



},

{
  name: 'rasberry',

  img: '.github/images/rasberry.png'



},

{
  name: 'glass',

  img: '.github/images/glass.jpg'



},

{
  name: 'umbrella',

  img: '.github/images/umbrella.png'



},

{
  name: 'tree',

  img: '.github/images/tree.jpg'



},

{
  name: 'temple',

  img: '.github/images/temple.jpg'



},



{
  name: 'umbrella',

  img: '.github/images/umbrella.png'



}

]

shuffleArray(deckofcards) // We shuffle our deck of cards here.


const board = document.querySelector('.board') // This variable represents the board we created in our html

var TwoCardsSelected = []

var TwoCardsSelectedID = []


// Each card needs a name so we can compare for a match
// Each card needs an id to ensure the user is not clicking the same card twice

function create_board(){ // Create our board with initial cards! And give each card an id. Most importantly we give each card an event listener! So when clicked it will execute our function flip!
  for (let i = 0; i < deckofcards.length; i++){
    var card = document.createElement('img')
    card.setAttribute('src', '.github/images/leaves.png')
    card.setAttribute('data-id', i)

   card.addEventListener('click', flipcard)

    board.appendChild(card)
  }

}

let number_solved = 0;


function check_for_match(){
  var cards = document.querySelectorAll('img') //List of all our cards we created for our board
  const cardoneID = TwoCardsSelectedID[0]
  const cardtwoID = TwoCardsSelectedID[1]

  if(TwoCardsSelected[0]== TwoCardsSelected[1]){
    cards[cardoneID].setAttribute('src', '.github/images/white.jpg')
    cards[cardtwoID].setAttribute('src', '.github/images/white.jpg')

    cards[cardoneID].removeEventListener('click', flipcard); // If the two cards selected match, we don't want to retoggle it!
    cards[cardtwoID].removeEventListener('click', flipcard);

    number_solved = number_solved + 2

    if(number_solved == 24){
      document.body.style.background = 'green'


      // console.log(time)
      // console.log(Math.round(time))
      const params = {
        "user_id": user["id"],
        "score": Math.round(time)
      }

      fetch("http://localhost:3000/app/new/score", {
        method: "POST",
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(params)
      })
      
      clearInterval(x) // Stop Clock if puzzle is solved!
    }

  } 

  
  
  else{
    cards[cardoneID].setAttribute('src', '.github/images/leaves.png') // If two cards don't match we revert it back
    cards[cardtwoID].setAttribute('src', '.github/images/leaves.png') // If two cards don't match we revert it back
  }

  TwoCardsSelected = [] // Cannot have more than two cards in these arrays at any instance and must clear

  TwoCardsSelectedID = []

}


function flipcard(){
  var cardId = this.getAttribute('data-id') 
  if( (TwoCardsSelected.length == 1 & cardId == TwoCardsSelectedID[0])){ // This prevents the user from selecting the same card twice to get a match And From Retoggling already Solved Cards!
    return
  }
 
  TwoCardsSelected.push(deckofcards[cardId].name) // We add the card name we decided to flip to the two cards array
  
  TwoCardsSelectedID.push(cardId) // We will add the id of the card to another array

  this.setAttribute('src', deckofcards[cardId].img) // Will set the image of card we clicked immediately to the id of card we selected

  if(TwoCardsSelected.length == 2){
    setTimeout(check_for_match, 250) // Changing this line of code fixed bugging.
  }
}





}

)