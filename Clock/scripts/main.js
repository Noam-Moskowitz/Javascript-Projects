function hide(element) {
    element.style.display = `none`;
}
function display(element) {
    element.style.display = `block`;
}

//navbar
const timerContainer = document.querySelector(`.timer`);
const clockContainer = document.querySelector(`.world-clock`);
const stopwatchContainer = document.querySelector(`.stopwatch`);
function removeActive() {
    document.getElementById(`timer-icon`).classList.remove(`active`)
    document.getElementById(`clock-icon`).classList.remove(`active`)
    document.getElementById(`stopwatch-icon`).classList.remove(`active`)
}

document.getElementById(`timer-icon`).addEventListener(`click`, (event) => {
    removeActive()
    display(timerContainer)
    hide(clockContainer)
    hide(stopwatchContainer)
    document.getElementById(`timer-icon`).classList.add(`active`);
})
document.getElementById(`clock-icon`).addEventListener(`click`, (event) => {
    removeActive()
    display(clockContainer)
    hide(stopwatchContainer)
    hide(timerContainer)
    document.getElementById(`clock-icon`).classList.add(`active`);
})
document.getElementById(`stopwatch-icon`).addEventListener(`click`, (event) => {
    removeActive()
    display(stopwatchContainer)
    hide(timerContainer)
    hide(clockContainer)
    document.getElementById(`stopwatch-icon`).classList.add(`active`);
})

//timer
const pauseBtn = document.getElementById(`pauseBtn`);
const resumeBtn = document.getElementById(`resumeBtn`);
const timerScreen = document.getElementById(`countdown-screen`)
const timerForm = document.getElementById(`timer-form`);
let timerStop = false;
let timerInterval;

function timer(duration) {
    timerInterval = setInterval(() => {
        if (!timerStop) {
            duration--
            let durationInMins = Math.floor(duration / 60);
            let leftOverScnds = duration % 60;
            let hrs = Math.floor(durationInMins / 60)
            let leftOverMins = durationInMins % 60;
            if (duration == 0) {
                alert(`Times Up!`)
                clearInterval(timerInterval);
                display(timerForm);
                hide(timerScreen);
            }
            let timeToDisplay = `${hrs.toString().padStart(2, `0`)}:${leftOverMins.toString().padStart(2, `0`)}:${leftOverScnds.toString().padStart(2, `0`)}`;
            document.getElementById(`timer-screen`).textContent = timeToDisplay
        }
    }, 1000)
}

document.getElementById(`startBtn`).addEventListener('click', (event) => {
    display(timerScreen);
    hide(timerForm);
    event.preventDefault()
    timerStop = false;
    let hrs = event.target.form[0].value;
    let mns = event.target.form[1].value;
    let scnds = event.target.form[2].value;
    let hrsInSeconds = hrs * 60 * 60;
    let mnsInSeconds = mns * 60;
    let duration = hrsInSeconds + mnsInSeconds + Number(scnds)
    timer(duration + 1)
    event.target.form.reset()
})

document.getElementById(`clearBtn`).addEventListener(`click`, () => {
    timerStop = true;
    clearInterval(timerInterval);
    document.getElementById(`timer-screen`).textContent = ``;
    hide(timerScreen);
    hide(resumeBtn);
    display(timerForm);
    display(pauseBtn);
})
pauseBtn.addEventListener(`click`, () => {
    timerStop = true;
    hide(pauseBtn);
    display(resumeBtn);
})
resumeBtn.addEventListener(`click`, () => {
    timerStop = false;
    hide(resumeBtn);
    display(pauseBtn);
})

//worldClock
import { Clock } from "./clockClass.js";
const wcSubmit = document.getElementById(`wcSubmit`);
const delBtn = document.getElementById(`del`);
const addBtn = document.getElementById(`add`);
const editBtn = document.getElementById(`edit`);
const cancelBtn = document.getElementById(`cancel`);
const addForm = document.getElementById(`addClock`);
const deleteForm = document.getElementById(`removeClock`);

addBtn.addEventListener(`click`, () => {
    hide(addBtn);
    hide(editBtn);
    display(addForm);
    display(cancelBtn);
})
editBtn.addEventListener(`click`, () => {
    hide(addBtn);
    hide(editBtn);
    display(deleteForm);
    display(cancelBtn);
})

wcSubmit.addEventListener(`click`, (event) => {
    event.preventDefault()
    addClock(event.target.form[0].value)
    event.target.form.reset()
    hide(addForm)
    hide(cancelBtn)
    display(addBtn)
    display(editBtn)
})

delBtn.addEventListener(`click`, (event) => {
    event.preventDefault()
    removeClock(event.target.form[0].value);
    event.target.form.reset()
    hide(deleteForm)
    hide(cancelBtn)
    display(addBtn)
    display(editBtn)
})
cancelBtn.addEventListener(`click`, () => {
    hide(deleteForm)
    hide(addForm)
    hide(cancelBtn)
    display(addBtn)
    display(editBtn)
})

function removeClock(cityName) {
    const clocksArray = JSON.parse(localStorage.getItem('clocks')) || [];
    const indexToRemove = clocksArray.findIndex(obj => obj.city.trim().toLowerCase() === cityName.trim().toLowerCase());
    if (indexToRemove !== -1) {
        clocksArray.splice(indexToRemove, 1);
        document.getElementById(`clocks-container`).innerHTML = ``;
        localStorage.setItem('clocks', JSON.stringify(clocksArray));
    } else {
        alert(`You dont have any clocks that match '${cityName}'`)
    }
}

async function addClock(fetchData) {
    let timezone = await getData(fetchData);
    let timezoneOffset = timezone.utc_offset;
    const offsetNum = splitText(timezoneOffset);
    const clockName = splitText(fetchData);
    newInstance(clockName, offsetNum)
}

function createHour(offset) {
    const time = new Date();
    const utcHrs = time.getHours() - 2;
    let hour = utcHrs + offset;
    switch (hour) {
        case -1:
            hour = 23;
            break;
        case -2:
            hour = 22;
            break;
        case -3:
            hour = 21;
            break;
        case -4:
            hour = 20;
            break;
        case -5:
            hour = 19;
            break;
        case -6:
            hour = 18;
            break;
        case -7:
            hour = 17;
            break;
        case -8:
            hour = 16;
            break;
        case -9:
            hour = 15;
            break;
        case -10:
            hour = 14;
            break;
        case -11:
            hour = 13;
            break;
        case -12:
            hour = 12;
            break;
        case 24:
            hour = 0;
            break;
        case 25:
            hour = 1;
            break;
        case 26:
            hour = 2;
            break;
        case 27:
            hour = 3;
            break;
        case 28:
            hour = 4;
            break;
        case 29:
            hour = 5;
            break;
        case 30:
            hour = 6;
            break;
        case 31:
            hour = 7;
            break;
        case 32:
            hour = 8;
            break;
        case 33:
            hour = 9;
            break;
        case 34:
            hour = 10;
            break;
        case 35:
            hour = 11;
            break;
        case 36:
            hour = 12;
            break;
        case 37:
            hour = 13;
            break;
        case 38:
            hour = 14;
            break;
    }
    return hour;
}

setInterval(displayClock, 1000)
function displayClock() {
    const time = new Date();
    const mns = time.getMinutes().toString().padStart(2, `0`);
    const scnds = time.getSeconds().toString().padStart(2, `0`);
    let html = ``;
    let clocks = JSON.parse(localStorage.getItem(`clocks`));
    if (clocks) {
        for (let clock of clocks) {
            let hour = createHour(clock.utcOffset).toString().padStart(2, `0`);
            html += `<tr>
         <td>${clock.city}</td>
         <td style='text-align: center;'>${hour}:${mns}:${scnds}</td>
         </tr>`
            document.getElementById(`clocks-container`).innerHTML = html;
        }
    }

}

function newInstance(city, utcOffset) {
    const newClock = new Clock(city, utcOffset);
    const existingData = JSON.parse(localStorage.getItem('clocks')) || [];
    let isDuplicate = false;

    for (let i of existingData) {
        if (i.city === newClock.city && i.utcOffset === newClock.utcOffset) {
            isDuplicate = true;
            break;
        }
    }

    if (!isDuplicate) {
        existingData.push(newClock);
    }

    localStorage.setItem('clocks', JSON.stringify(existingData));
}

function splitText(text) {
    if (text.indexOf(`/`) == -1) {
        let offsetNum = Number(text.slice(0, 3))
        return offsetNum
    } else {
        const clockNameArr = text.split(`/`)
        let cityName = clockNameArr[clockNameArr.length - 1];
        if (cityName.indexOf(`_`) == -1) {
        } else {
            let cityNameArr = cityName.split(`_`);
            cityName = `${cityNameArr[0]} ${cityNameArr[1]}`
        }
        return cityName
    }

}

async function getData(data) {
    let response = await fetch(`https://worldtimeapi.org/api/timezone/${data}`);
    if (response.ok) {
        return response.json();
    } else {
        console.log(response.statusText);
    }
}

//stopwatch
let stopwatchScreen = document.getElementById(`stopwatch-screen`);
let lapContainer = document.getElementById(`laps-container`);
let stopwatchStart = document.getElementById(`startSwBtn`);
let stopwatchLap = document.getElementById(`LapBtn`);
let stopwatchStop = document.getElementById(`stopSwBtn`);
let stopwatchReset = document.getElementById(`resetBtn`);
let stopwatchResume = document.getElementById(`resumeSwBtn`);

let lapCounter = 1;
let lapMillieSeconds = 0;
let lapSeconds = 0;
let lapMinutes = 0;
let counterStop = true;
let swMillieSeconds = 0;
let swSeconds = 0;
let swMinutes = 0;
let lapTime;

let lapInterval = setInterval(() => {
    if (!counterStop) {
        lapMillieSeconds++;
        if (lapMillieSeconds == 100) {
            lapMillieSeconds = 0
            lapSeconds++;
        } else if (lapSeconds == 60 && lapMillieSeconds == 100) {
            lapMinutes++;
        }
        lapTime = `${lapMinutes.toString().padStart(2, `0`)}:${lapSeconds.toString().padStart(2, `0`)}.${lapMillieSeconds.toString().padStart(2, `0`)}`
    }
}, 10)

function reset() {
    stopwatchScreen.innerHTML = ``;
    lapContainer.innerHTML = ``;
    swMillieSeconds = 0;
    swSeconds = 0;
    swMinutes = 0;
    lapMillieSeconds = 0
    lapSeconds = 0;
    lapMinutes = 0;
    lapCounter = 1;
}
function startCount() {

    setInterval(() => {
        if (!counterStop) {
            swMillieSeconds++;
            if (swMillieSeconds == 100) {
                swMillieSeconds = 0
                swSeconds++;
            } else if (swSeconds == 60 && swMillieSeconds == 100) {
                swMinutes++;
            }
            stopwatchScreen.textContent = `${swMinutes.toString().padStart(2, `0`)}:${swSeconds.toString().padStart(2, `0`)}.${swMillieSeconds.toString().padStart(2, `0`)}`
        }

    }, 10)
}
function displayLap() {
    let lapHtml = `<div class='lap-text'>Lap ${lapCounter}     ${lapTime}</div>`
    lapContainer.innerHTML += lapHtml;
    lapCounter++;
}

stopwatchStart.addEventListener(`click`, () => {
    hide(stopwatchStart);
    display(stopwatchStop);
    counterStop = false;
});
stopwatchLap.addEventListener(`click`, () => {
    displayLap();
    lapMillieSeconds = 0;
    lapSeconds = 0;
    lapMinutes = 0;
})
stopwatchStop.addEventListener(`click`, () => {
    hide(stopwatchStop);
    hide(stopwatchLap);
    display(stopwatchResume);
    display(stopwatchReset);
    counterStop = true;
})

stopwatchResume.addEventListener(`click`, () => {
    hide(stopwatchResume);
    hide(stopwatchReset);
    display(stopwatchStop);
    display(stopwatchLap);
    counterStop = false;
})

stopwatchReset.addEventListener(`click`, () => {
    hide(stopwatchResume);
    hide(stopwatchReset);
    display(stopwatchStart);
    display(stopwatchLap);
    reset();
})

startCount();