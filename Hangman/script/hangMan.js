/* All Words Array */
const options = ['Oranges', 'Chocolate', 'Banana', 'Africa', 'Develop', 'Cutlery', 'Piano', 'Eleven', 'Favorite', 'Memories', 'Idea', 'Area', 'India', 'Canada', 'Media', 'Family', 'Energy', 'Memory', 'Fireboard', 'Celebrate', 'Adventure', 'Important', 'Consonant', 'Dangerous', 'Bicycle', 'Syllable', 'Holiday', 'Potato', 'Musical', 'Elephant', 'Tomato', 'Oxygen', 'Strawberry', 'Anteater', 'Buffalo', 'Octopus', 'Tropical', 'Crocodile', 'Dinosaur', 'Withering', 'Serious', 'Imperfect', 'Warrior', 'Curious', 'Genius', 'Graduate', 'Radical', 'Weathering', 'Amazing', 'Bullying', 'Worrying', 'Packaging', 'Provoking', 'Thanksgiving', 'Consuming', 'January', 'Independence', 'Technology', 'Ordinary', 'Alternative', 'Community', 'Relaxation', 'Aberration', 'America', 'Virginia', 'February', 'Eternity', 'Identical', 'Irregular', 'Secretary', 'Alligator', 'Intermittent', 'Intelligence', 'Undemanding', 'Information', 'Preposition', 'Belligerent', 'Literature', 'Watermelon', 'Television', 'Invisible', 'Everyday', 'Education', 'Aquarium', 'Cinderella', 'Caterpillar', 'Macaroni', 'Original', 'Elevator', 'Orangutan', 'Ecosystem', 'Amphibian', 'Avocado', 'Biology', 'Bacteria', 'Peninsula', 'Evolution', 'Pollination', 'Pomegranate', 'Remarkable', 'Promiscuous', 'Victorious', 'Overrated', 'Experienced', 'Dedicated', 'Charismatic', 'Embarrassing', 'Admirable', 'Integrity', 'Adversity', 'Equality', 'Celebrity', 'Necessary', 'Obesity', 'Authority', 'Military', 'Cemetery'];

/*        Global Variables             */

const LetterInpt = document.getElementById('letter');
const letterSBMT = document.getElementById('letter-sbmt');
const wordInpt = document.getElementById('word');
const wordSBMT = document.getElementById('word-sbmt');
const hangman = document.getElementById('hangman');
const restart = document.getElementById('restart');
const vcRestart = document.getElementById('bannerRestart')
const statusBanner = document.getElementById('statusBanner')
const solveButton = document.getElementById('solve');
const solveBanner = document.getElementById('solve-banner');
const back2Game = document.getElementById('btg');
const bank = document.getElementById('bank');
const boardSlots = document.querySelectorAll(`.slot`);
let answer;
let a;

/* --------------callback functions----------- */
const display = (element) => {
    element.style.display = `block`;
}
const hide = (element) => {
    element.style.display = `none`;
}

const getWord = () => {
    return options[Math.floor(Math.random() * options.length)]
}

const initGame = () => {
    for (let slot of boardSlots) {
        slot.classList.remove(`board`);
        slot.innerHTML = ``;
    }
    hide(solveBanner);
    hide(statusBanner);
    hangman.style.backgroundImage = `url(../images/Hangman.png)`
    LetterInpt.value = wordInpt.value = bank.innerHTML = ``;
    a = 0;
    answer = getWord();
    console.log(answer);
    for (x = 1; x <= answer.length; x++) {
        const iteration = document.getElementById(x);
        iteration.classList.add('board');
        iteration.innerHTML = ``;
    }
}

const updateScore = () => {
    a++
    hangman.style.backgroundImage = `url(../images/Hangman${a}.png)`
    if (a > 5) {
        displayWinOrLose(`Defeat`)
    }
}

const checkLetter = (letter) => {
    let letterIndex = answer.toLowerCase().indexOf(letter);
    const indices = [];
    if (letterIndex !== -1) {
        while (letterIndex !== -1) {
            indices.push(letterIndex);
            letterIndex = answer.toLowerCase().indexOf(letter, letterIndex + 1);
        }
        for (z = 0; z < indices.length; z++) {
            let indicesElement = indices[z] + 1;
            document.getElementById(indicesElement).innerHTML = "<p class = 'ptag'>" + letter + "</p>";
        }
        return `true`;
    } else {
        let existsInBank = bank.textContent;
        if (existsInBank.indexOf(letter) == -1) {
            updateScore();
            bank.textContent += `${letter}, `;
        }
        return `false`
    }
}

const checkForWin = () => {
    let BoardStatus = document.querySelectorAll('.ptag');
    if (BoardStatus.length == answer.length) {
        displayWinOrLose(`Victory`);
    }
}

const gameLoop = (input) => {
    const playerMove = checkLetter(input);
    if (playerMove) {
        checkForWin();
    } else {
        updateScore();
    }
}

function checkWord(word) {
    if (word.toLowerCase().trim() == answer.toLowerCase()) {
        displayWinOrLose(`Victory`)
    } else {
        displayWinOrLose(`Defeat`);
    }
    hide(solveBanner)
}

const displayWinOrLose = (status) => {
    display(statusBanner)
    let htmlContent = `
<img src="../images/${status}.png">
 <h2>${status}!</h2>
`
    if (status == `Defeat`) {
        htmlContent = `
        <img src="../images/${status}.png">
        <h2>${status}!</h2>
    <p class='reveal'>The answer was <span class='bigger'>${answer}</span></p>
        `
    }
    document.querySelector(`.banner-text`).innerHTML = htmlContent;
}


/* -------event listeners------- */

restart.addEventListener("click", initGame)
bannerRestart.addEventListener("click", initGame)

LetterInpt.addEventListener("keyup", function (event) {
    if (event.key == 'Enter') {
        if (LetterInpt.value) {
            gameLoop(LetterInpt.value.toLowerCase());
            LetterInpt.value = "";
        }
    }
})
letterSBMT.addEventListener("click", () => {
    if (LetterInpt.value) {
        gameLoop(LetterInpt.value.toLowerCase());
        LetterInpt.value = "";
    }
});

wordInpt.addEventListener("keyup", function (event) {
    if (event.key == 'Enter') {
        if (wordInpt.value) {
            checkWord(wordInpt.value)
        }
    }
})
wordSBMT.addEventListener("click", () => {
    if (wordInpt.value) {
        checkWord(wordInpt.value);
    }
});

solveButton.addEventListener("click", () => {
    display(solveBanner)
})

back2Game.addEventListener("click", () => {
    hide(solveBanner)
})

initGame()