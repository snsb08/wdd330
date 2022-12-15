document.addEventListener('DOMContentLoaded', () => {

    //card options
    const cardArray = [
        {
            name: 'pokemon1',
            img: 'images/pikachu.png'
        },
        {
            name: 'pokemon2',
            img: 'images/pokemon2.png'
        },
        {
            name: 'pokemon3',
            img: 'images/pokemon3.png'
        },
        {
            name: 'pokemon4',
            img: 'images/pokemon4.png'
        },
        {
            name: 'pokemon5',
            img: 'images/pokemon5.png'
        },
        {
            name: 'pokemon6',
            img: 'images/pokemon6.png'
        },
        //double for matches
        {
            name: 'pokemon1',
            img: 'images/pikachu.png'
        },
        {
            name: 'pokemon2',
            img: 'images/pokemon2.png'
        },
        {
            name: 'pokemon3',
            img: 'images/pokemon3.png'
        },
        {
            name: 'pokemon4',
            img: 'images/pokemon4.png'
        },
        {
            name: 'pokemon5',
            img: 'images/pokemon5.png'
        },
        {
            name: 'pokemon6',
            img: 'images/pokemon6.png'
        }
    ]

    cardArray.sort(() => 0.5 - Math.random())

    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')
    let cardsChosen = []
    let cardsChosenId = []
    let cardsWon = []

    //create your board
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            let card = document.createElement('img')
            card.setAttribute('src', 'images/back_pattern.png')
            card.setAttribute('data-id', i)
            card.addEventListener('click', flipcard)
            grid.appendChild(card)
        }
    }

    //check for matches
    function checkForMatch() {
        let cards = document.querySelectorAll('img')
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]
        if (cardsChosen[0] === cardsChosen[1]) {
            cards[optionOneId].setAttribute('src', 'images/ball.png')
            cards[optionTwoId].setAttribute('src', 'images/ball.png')
            cardsWon.push(cardsChosen)
        } else {
            cards[optionOneId].setAttribute('src', 'images/back_pattern.png')
            cards[optionTwoId].setAttribute('src', 'images/back_pattern.png')
        }

        cardsChosen = []
        cardsChosenId = []
        resultDisplay.textContent = cardsWon.length
        if (cardsWon.length === cardArray.length/2) {
            resultDisplay.textContent = 'Congratulations! You caught them all!'
        }
    }


    //flip your card
    function flipcard() {
        let cardId = this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src', cardArray[cardId].img)
        if (cardsChosen. length === 2) {
            setTimeout(checkForMatch, 500)
        }
    }

    createBoard()

}) //end of document