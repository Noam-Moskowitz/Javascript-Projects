import { Element } from "./elemantClass.js";
const screen = document.getElementById('screen');
const elementInput = document.getElementById('elementType');
const loadWindow = document.querySelector(`.load-window`)
let selected = screen
let fileNames = getItems(`fileNames`);


function getItems(key) {
    return JSON.parse(localStorage.getItem(key));
}

function setItem(key, items) {
    localStorage.setItem(key, JSON.stringify(items));
}

const loadFile = (file) => {
    const selectedFile = getItems(file);
    screen.innerHTML = selectedFile;
}

const displayFiles = () => {
    const savedItems = getItems(`fileNames`);
    document.getElementById(`saved-itmes`).innerHTML = ``;
    let html = ``;
    for (let item of savedItems) {
        html += `
        <option value='${item}'>${item}</option>
        `
    }
    document.getElementById(`saved-itmes`).innerHTML = html;
}

const deleteSavedItem = (key) => {
    const index = fileNames.indexOf(key)
    fileNames.splice(index, 1)
    setItem(`fileNames`, fileNames);
    localStorage.removeItem(key)
    displayFiles()
}

const createElement = (element) => {
    let item = document.createElement(element.elementType)
    if (element.width.indexOf('vw') !== -1) {
        let numValue = element.width.replace(/\D/g, "");
        element.width = numValue + '%';
    }
    if (element.height.indexOf('vh') !== -1) {
        let numValue = element.height.replace(/\D/g, "");
        element.height = numValue + '%';
    }

    item.style.width = element.width;
    item.style.height = element.height;
    item.style.backgroundColor = element.bgc;
    item.href = element.src;
    item.src = element.src;
    item.innerHTML = element.content;
    item.style.color = element.fColor;
    item.style.fontSize = element.fSize;
    item.style.textAlign = element.textAlign;
    item.style.textDecoration = element.textDecoration;
    item.style.fontFamily = element.fFamily;
    item.style.position = element.position;
    item.style.top = element.top;
    item.style.left = element.left;
    item.style.padding = element.padding;
    item.style.margin = element.margin;
    item.style.display = element.display;
    item.style.flexDirection = element.flexDirection;
    item.style.alignItems = element.alignItems;
    item.style.justifyContent = element.justifyContent;
    item.style.border = `${element.borderSize} ${element.borderStyle} ${element.borderColor}`;
    item.style.borderRadius = element.borderRadius;
    selected.appendChild(item);
    selected.classList.remove('selected')
    selected = screen;
}

//       event listeners
elementInput.addEventListener('keyup', () => {
    const source = document.getElementById('source');
    if (elementInput.value == 'a' || elementInput.value == 'img') {
        source.classList.add('input-container');
        source.classList.remove('displayNone');
    } else {
        source.classList.add('displayNone');
        source.classList.remove('input-container');
    }
})

screen.addEventListener("click", (event) => {
    selected.classList.remove('selected')
    selected = event.target;
    selected.classList.add('selected')
})

//deletes selected element
document.getElementById(`delete`).addEventListener(`click`, () => {
    if (selected !== screen) {
        selected.remove();
        selected = screen;
    }
})

//creates and appends the element with criteria from form
document.getElementById(`submit`).addEventListener(`click`, (event) => {
    event.preventDefault()
    const element = new Element(
        event.target.form['elementType'].value.trim(),
        event.target.form['width'].value,
        event.target.form['height'].value,
        event.target.form['backgroundColor'].value,
        event.target.form['src'].value,
        event.target.form['content'].value,
        event.target.form['fColor'].value,
        event.target.form['fSize'].value,
        event.target.form['textAlign'].value,
        event.target.form['textDecoration'].value,
        event.target.form['fFamily'].value,
        event.target.form['Position'].value,
        event.target.form['Top'].value,
        event.target.form['Left'].value,
        event.target.form['padding'].value,
        event.target.form['margin'].value,
        event.target.form['display'].value,
        event.target.form['flexDirection'].value,
        event.target.form['alignItems'].value,
        event.target.form['justifyContent'].value,
        event.target.form['borderSize'].value,
        event.target.form['borderColor'].value,
        event.target.form['borderRadius'].value,
        event.target.form['borderStyle'].value,
    )
    createElement(element)
    event.target.form.reset();
})

//save your file in local storage
document.getElementById(`save`).addEventListener(`click`, () => {
    const fileName = prompt('שמור קובץ בשם:', '');
    if (fileName) {
        if (!fileNames) {
            fileNames = [fileName];
        } else {
            fileNames.push(fileName);
        }
        setItem(`fileNames`, fileNames);
        setItem(`${fileName}`, screen.innerHTML);
    }
})

//displays the files available to load
document.getElementById(`load`).addEventListener(`click`, () => {
    loadWindow.style.display = `block`
    displayFiles()
})

/* -------clears the screen------------- */
document.getElementById(`clear`).addEventListener(`click`, () => {
    document.querySelector('.confirm-window').style.display = 'block';
})

/* -------confirms the clearing of the screen---------- */
document.getElementById(`confirm`).addEventListener(`click`, () => {
    screen.innerHTML = '';
    document.querySelector('.confirm-window').style.display = 'none';
})

/* -------cancels the clearing of the screen---------- */
document.getElementById(`cancel`).addEventListener(`click`, () => {
    document.querySelector('.confirm-window').style.display = 'none';
})

/* -------loads the file selected in input---------- */
document.getElementById(`confirmLoad`).addEventListener(`click`, (event) => {
    event.preventDefault()
    const selectedOption = event.target.form[0].value;
    loadFile(selectedOption)
    loadWindow.style.display = `none`
})

/* -------deletes the file selected in input---------- */
document.getElementById(`item-delete`).addEventListener(`click`, (event) => {
    event.preventDefault()
    deleteSavedItem(event.target.form[0].value);
    loadWindow.style.display = `none`
})


document.getElementById(`cancelLoad`).addEventListener(`click`, () => {
    loadWindow.style.display = `none`
})