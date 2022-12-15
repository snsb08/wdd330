let pokemon = [
    "pikachu",
    "charmander",
    "snorlax"
]

let pokeUrl = "https://pokeapi.co/api/v2/pokemon/?limit=100";
let pokeUrl2 = "https://pokeapi.co/api/v2/pokemon/1";

let answer = '';
let answer1 = '';
let answerImg = '';
let guessLeft = 8; 
let guessAmount = 0;
let guessed = [];
let wordStatus = null;
let pokeNameList = [];
let pokeImgList = [];
let pokeIdList = [];
let score = 0;

//fetch list


// fetch(pokeUrl).then(response => response.json())
// .then(json =>{
//     // console.log(json);
//     json.results.forEach(element => {
//     const pokeName = element.name
//     // answer = pokeName [Math.floor(Math.random() * element.length)]; 
//     console.log(pokeName);
//     pokeNameList.push(pokeName);
//     // console.log(pokeNameList)
//     // alert(pokeName)

//     }); //end of forEach
// }) //end of .then(json)  

// console.log(pokeUrl)
//Get random word from API list

function randomWord() {
    fetch(pokeUrl).then(response => response.json())
    
    .then(json =>{
        console.log(json);
        // const pokemon = {};
        // pokemon['name'] = json.name;
        // pokemon['image'] = json.sprites['front_default'];
        // console.log(pokemon); 
        // const pokemon = {}; 
        answer1 = json.results [Math.floor(Math.random() * json.results.length)];
        console.log(answer1)
        answer = answer1.name //this WORKS! no need of for each loop then
        fetch(answer1.url).then(response => response.json())
        .then(json =>{
            answerImg = json.sprites['front_default'];
            console.log(answerImg)
            guessedWord();
        })

    //     json.results.forEach(element => {
    //     // answer1.forEach(element => {
    //     // const pokeName = element.name;
    //     const pokeNameUrl = element.url;
    //     console.log(pokeNameUrl);
    //     fetch(pokeNameUrl).then(response => response.json())
    //     .then(json =>{
    //         // const pokemon = {};
    //         pokemon['name'] = json.name;
    //         pokemon['id'] = json.id;
    //         pokemon['image'] = json.sprites['front_default'];
    //         // console.log(pokemon); 
            
    //         pokeIdList.push(pokemon['id']);
    //         pokeIdList.push(pokemon['name']);
    //         pokeIdList.push(pokemon['image']);
    //         // console.log(pokeNameList);
    //         // console.log(pokeImgList);
    //         // console.log(pokeIdList);

    //         // answer = pokeNameList [Math.floor(Math.random() * pokeNameList.length)]; // this works for the word, but image not connected
    //         // answer = pokeIdList.name [Math.floor(Math.random() * pokeIdList.length)]; //trying to get an id number
    //         randomPokemon = pokemon['id'] [Math.floor(Math.random() * pokemon['id'].length)];
            
    //         // answer = pokemon.name 
    //         // answerId = pokemon.id
    //         // answerImg = pokemon['image']
    //         // answer = answer1.name 
    //         answerId = answer1.id
    //         answerImg = pokemon['image']
    //         console.log(answer, answerId, answerImg)
    //         // console.log(answerId);

    //         document.getElementById("pokeImg").innerHTML = `<img src="${pokemon['image']}" alt="pokemon image">`;
    //         // answer = pokemon.name [Math.floor(Math.random() * pokemon.name.length)];
            
    //     });

    //     // ------Teamwork-------------------------------------------------------------
    //     //idea: get a random id, then make a variable of the url ("https://pokeapi.co/api/v2/pokemon/${ID}";) fetch the pokemon  
        

    //     // const pokeImg = json.sprites['front_default'];
    //     // answer = pokeName [Math.floor(Math.random() * element.length)]; 
    //     // console.log(pokeName);
        
    //     // console.log(pokeNameList)
    //     // alert(pokeName)
        

        
    
    // // answer = pokemon [Math.floor(Math.random() * pokemon.length)]; //THIS WORKS WITH THE POKEMON LIST I MADE
    
    // // console.log(pokeNameList.length);
    // // console.log(answer)
    // // console.log(pokeNameList.length)
    // }); //end of forEach
    }) //end of .then(json)  



}



//Letters buttons 
function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
        `
        <button
        id= '` + letter + `'
        onClick="handleGuess('` + letter + `')"
        >
        ` + letter + `
        </button>
        `).join('');
    document.getElementById('keyboard').innerHTML = buttonsHTML;    
}


//to handle the guesses
function handleGuess(chosenLetter){
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);

    if (answer.indexOf(chosenLetter) >= 0) {
        guessedWord();
        checkIfGameWon();
    } else if (answer.indexOf(chosenLetter) === -1) {
        guessAmount++;
        updateguessAmount();
        checkIfGameLost();
        updateHangmanPicture();
    }
}

//Hangman Picture
function updateHangmanPicture() {
    document.getElementById('rocket2pika').src = './images/team2pika' + guessAmount + '.jpg'; //update the jpg here
}

let scoredBonus = 0
//Game Won
function checkIfGameWon() {
    if (wordStatus === answer) {
        document.getElementById('rocket2pika').src = './images/team2pikaWin.jpg';
        document.getElementById('keyboard').innerHTML = 'You Won!'
        document.getElementById('pokeImg').innerHTML = `<img src="${answerImg}" alt="image of ${answer}" />`
        // score += 1 + scoredBonus
        scoredBonus = guessLeft-guessAmount
        score += scoredBonus
        document.getElementById('yourScore').innerHTML = `Your Score: ${score}`
    }
}

//Game Lost 
function checkIfGameLost() {
    if (guessAmount === guessLeft) {
        document.getElementById('word2guess').innerHTML = 'The correct Pokemon was: ' + answer;
        document.getElementById('keyboard').innerHTML = 'Oh no! Team Rocket caught Pikachu!';
        document.getElementById('pokeImg').innerHTML = `<img src="${answerImg}" alt="image of ${answer}" />`
        document.getElementById('yourScore').innerHTML = `Your Final Score was ${score}`
    }
}

//spaces for word to guess display:
function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : ' _ ')).join('');
    document.getElementById('word2guess').innerHTML = wordStatus;
}

//update amount to guess
function updateguessAmount(){
    document.getElementById('guessAmount').innerHTML = guessAmount;
}

//To Play Again
function reset() {
    guessAmount = 0;
    guessed = [];
    document.getElementById('rocket2pika').src = './images/team2pika1.jpg';
    document.getElementById('pokeImg').innerHTML = ``;
    document.getElementById('yourScore').innerHTML = ``

    randomWord();
    guessedWord();
    updateguessAmount();
    generateButtons();
}

//guesses updates:
document.getElementById('guessLeft').innerHTML = guessLeft;


randomWord();
guessedWord();
generateButtons();


//+++++++++++++ nameForm.js ++++++++++++++++++++++++++++++++++
const displayNames = document.getElementById('nameList');
const getNames = document.getElementById('highScoreForm');
const listInput = document.getElementById('newListInput');

localStorageHiScore = 'name.list'; //name?

let lists = JSON.parse(localStorage.getItem(localStorageHiScore)) || [];


function renderList () {
    clearElement(displayNames);

    
    lists.forEach(element => {
        const userName = document.createElement('li');
        userName.classList.add("user_name");
        userName.innerText = `  ${element.score}  - ${element.name}  ` //element.name, element.score //list.name //list = input from form
        displayNames.appendChild(userName)
        
        // console.log(userName) //individual li item, logs all but each one individually
        // console.log(element.name) //logs each value item individually
        // // console.log(element.score) //right but individual
        // console.log(element)
        // console.log(element.id)
        // console.log(lists[id].score)
        
    });
    // console.log(lists.score) //undefined (because first item is undefined??? Nope)
    // console.log(lists.element) //undefined 
    // console.log(lists)
    // console.log(lists[id].score) //array with the inputs as separate objects
    
    sortList(lists.score) //correct place, it is sorting the list
    
    

}
const scoreList = []
getNames.addEventListener('submit', e=> {
    e.preventDefault()
    const listName = listInput.value 
    
    
    if (listName == null || listName ==='') return
    const list = createList(listName)
    listInput.value = null
    lists.push(list)
    scoreItem = list.score
    // scoreItem.push(scoreList)
    scoreList.push(scoreItem)
    // console.log(scoreList)
    // console.log(listName) //last input value
    // console.log(list.score) //gives the correct score of last input
    // console.log(list) //list last input as an object
    // console.log(lists) //an array with the inputs as separate objects
    renderList() //renders list with updated input
    save()
    // sortList(list.score)//needed here? it gets updated in renderList() may be enough
    // function sortList(list) {
    
    //     var i, switching, b, shouldSwitch;
    //     // var list, i, switching, b, shouldSwitch;
    //     // list = lists.score
    //     console.log(list)
    //     // list = document.getElementById("id01");
    //     // list = document.getElementById("nameList"); //+++++++++
    //     // list = scoreList
    //     // console.log(list);//--------------------------------------------------------
    //     // console.log(list1); //undefined
    //     switching = true;
    //     /* Make a loop that will continue until
    //     no switching has been done: */
    //     while (switching) {
    //       // start by saying: no switching is done:
    //       switching = false;
    //     // b = list.getElementsByTagName("LI");
    //     b = list.score
    //     console.log(b) //undefined-------------------------------------------------
    //       // Loop through all list-items:
    //       for (i = 0; i < (b.length - 1); i++) {
    //         // start by saying there should be no switching:
    //         shouldSwitch = false;
    //         /* check if the next item should
    //         switch place with the current item: */
            
    //         // if (Number(b[i].innerHTML) < Number(b[i + 1].innerHTML)) {
    //             if ((b[i].innerHTML) > (b[i + 1].innerHTML)) {
    //           /* if next item is numerically
    //           lower than current item, mark as a switch
    //           and break the loop: */
    //           shouldSwitch = true;
    //           break;
    //         }
    //       }
    //       if (shouldSwitch) {
    //         /* If a switch has been marked, make the switch
    //         and mark the switch as done: */
    //         b[i].parentNode.insertBefore(b[i + 1], b[i]);
    //         switching = true;
    //       }
    //     }
    //   }
    //   sortList(list)
})

console.log(listInput.value)

function createList(player) {
    //return {name: player, score: playerScore}
    return {name: player, score: score}
}

function save() {
    localStorage.setItem(localStorageHiScore, JSON.stringify(lists))
    
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

function sortList(list) {
    
    var list, i, switching, b, shouldSwitch;
    // list = lists.score
    console.log(list)
    // list = document.getElementById("id01");
    list = document.getElementById("nameList");
    // console.log(list);--------------------------------------------------------
    // console.log(list1); //undefined
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // start by saying: no switching is done:
      switching = false;
    b = list.getElementsByTagName("LI");
    //b = list.score
    //console.log(b) //undefined-------------------------------------------------
      // Loop through all list-items:
      for (i = 0; i < (b.length - 1); i++) {
        // start by saying there should be no switching:
        shouldSwitch = false;
        /* check if the next item should
        switch place with the current item: */
        
        // if (Number(b[i].innerHTML) < Number(b[i + 1].innerHTML)) {
         if ((b[i].innerHTML) < (b[i + 1].innerHTML)) {
          /* if next item is numerically
          lower than current item, mark as a switch
          and break the loop: */
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark the switch as done: */
        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;
      }
    }
  }

renderList() //renders list when entering page. (updates are rendered in getNames event)

