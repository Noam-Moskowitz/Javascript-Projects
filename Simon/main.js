let arrRound = [];
let arrUserMoves = [];
let gameCounter; // Game counter
let userCounter;
let isUserTurn;
const buttons = document.querySelectorAll(`.button`)

// Function (A)
// Resets the game and ready to play
// This does NOT start the game, you need to press a button to start the game
const initGame = () => {
    gameCounter = userCounter = 0;
    arrRound = [];
}

// Function (C)
// 2. Returns the color to display
const createStep = () => {
    const arrColors = [`red`, `blue`, `green`, `yellow`]
    return arrColors[Math.floor(Math.random() * 4)];
}

// Function (B)
const playRound = async () => {
    const newStep = createStep();
    arrRound.push(newStep);
    await displayRound()
    isUserTurn = true;
}

const displayRound = async () => {
    return new Promise((resolve, reject) => {
        isUserTurn = false;
        gameCounter++;
        document.getElementById(`round`).innerHTML = gameCounter;
        setTimeout(() => {
            arrRound.forEach((color, index) => {
                setTimeout(() => {
                    document.getElementById(color).style.opacity = `.5`;
                    document.getElementById(`${color}Sound`).play();
                    setTimeout(() => {
                        document.getElementById(color).style.opacity = `1`;
                        if (index === arrRound.length - 1) {
                            resolve();
                        }
                    }, 700);
                }, index * 1000);
            });
        }, 1500);
    });
}

const userTurn = (userInput) => {
    if (userInput == arrRound[userCounter]) {
        userCounter++;
        if (userCounter == arrRound.length) {
            userCounter = 0;
            playRound()
        }
    } else {
        setHighScore(gameCounter);
        showScore();
        initGame()
    }
}

// saves highscore  
const setHighScore = (score) => {
    const currentHighScore = localStorage.getItem(`highscore`);
    if (!currentHighScore || currentHighScore < score) {
        localStorage.setItem(`highscore`, score)
    }
}

/* displays lose screen */
const showScore = () => {
    const savedHighscore = localStorage.getItem(`highscore`);
    document.querySelector(`.scoreBanner`).style.display = `flex`
    document.querySelector(`.board`).style.display = `none`
    document.querySelector(`.highscoreReveal`).textContent = savedHighscore;
    document.querySelector(`.scoreReveal`).textContent = gameCounter;
}

initGame();

//event listeners

document.getElementById(`restartBtn`).addEventListener(`click`, () => {
    initGame();
    playRound();
    document.querySelector(`.scoreBanner`).style.display = `none`
    document.querySelector(`.board`).style.display = `grid`
})

buttons.forEach((button) => {
    button.addEventListener(`click`, (event) => {
        if (isUserTurn) {
            document.getElementById(event.target.id).style.opacity = `.5`
            document.getElementById(`${event.target.id}Sound`).play()
            setTimeout(() => {
                document.getElementById(event.target.id).style.opacity = `1`
            }, 700)
            userTurn(event.target.id)
        }
    })
})

document.getElementById('btnStart').addEventListener('click', () => {
    document.querySelector(`.startState`).style.display = `none`;
    document.querySelector(`.board`).style.display = `grid`
    playRound()
});