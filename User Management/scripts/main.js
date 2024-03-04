import { User } from "./users.js";
const submitBtn = document.querySelector('#submitBtn');
const logInSubmit = document.getElementById(`loginSbmt`);
const editSubmit = document.getElementById(`submitEdit`);
const registerForm = document.getElementById(`regForm`);
let indexToEdit;
let formInputArr = [];
let users = getUsers();

function addUser(user) {
    if (users == null) {
        users = [user]
    } else {
        users.push(user)
    }
    localStorage.setItem(`users`, JSON.stringify(users))
}

function getUsers() {
    const users = JSON.parse(localStorage.getItem(`users`));
    return users
}

function createInstance(obj) {
    const newUser = new User(obj.firstName, obj.lastName, obj.email, obj.password)
    return newUser
}

function displayUsers() {
    const users = getUsers()
    let html = ``;
    let index = 0
    if (users !== null) {
        for (let user of users) {
            html += `<tr>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.isLoggedIn}</td>
        <td>
        <button title='${index}' class='delete'>מחיקה</button>
        <button title='${index}' class='edit'>עריכה</button>
        <button title='${index}' class='logOut'>התנתקות</button>
        </td>
        </tr>
        `
            index++
        }
        document.querySelector(`tbody`).innerHTML = html;
    }
}

function logInUser(email, password) {
    const userIndex = users.findIndex(obj => obj.email === email && obj.password === password);
    let querriedUser;
    if (userIndex !== -1) {
        querriedUser = createInstance(users[userIndex])
        querriedUser.logIn(email, password)
    } else {
        alert(`Unable to log in,\n email or password are incorrect`)
    }
    users[userIndex] = querriedUser;
    localStorage.setItem(`users`, JSON.stringify(users))
    displayUsers()
}

function switchToEdit(userInfo) {
    submitBtn.style.display = `none`;
    editSubmit.style.display = `block`;
    document.querySelector(`.regHeading`).textContent = `עריכה`;
    document.querySelector(`.regPara`).textContent = `שנו את הפרטים שלכם`;
    registerForm[0].value = userInfo.firstName;
    registerForm[1].value = userInfo.lastName;
    registerForm[2].value = userInfo.email;
    registerForm[3].value = userInfo.password;
}
function switchToRegister() {
    submitBtn.style.display = `block`;
    editSubmit.style.display = `none`;
    document.querySelector(`.regHeading`).textContent = `הרשמה`;
    document.querySelector(`.regPara`).textContent = `להרשמה למערכת יש למלא את הפרטים.`;
}

function validateForm(array) {
    for (let i of array) {
        if (!i.value) {
            i.style.boxShadow = `2px 2px 10px darkred`;
            return false
        }
        i.style.boxShadow = `none`;
    }
    return true
}


//event listeners

document.addEventListener(`click`, (event) => {
    const elementClass = event.target.className;
    if (elementClass == `delete` || elementClass == `edit` || elementClass == `logOut`) {
        const index = event.target.title;
        const selectedObj = users[index];
        const selectedUser = createInstance(selectedObj)
        if (elementClass == `logOut`) {
            selectedUser.logOut()
            users[index] = selectedUser;
        } else if (elementClass == `delete`) {
            users.splice(index, 1)
        } else if (elementClass == `edit`) {
            switchToEdit(selectedUser)
            indexToEdit = index;
        }

        localStorage.setItem(`users`, JSON.stringify(users))
        displayUsers()
    }
})

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    formInputArr = [
        event.target.form['fname'],
        event.target.form['lname'],
        event.target.form['email'],
        event.target.form['password'],
    ]
    const formValidated = validateForm(formInputArr);
    if (formValidated) {
        const user = new User(
            formInputArr[0].value,
            formInputArr[1].value,
            formInputArr[2].value,
            formInputArr[3].value,
        )
        addUser(user)
        event.target.form.reset()
        displayUsers();
    }
});

logInSubmit.addEventListener(`click`, (event) => {
    event.preventDefault();
    formInputArr = [event.target.form[0], event.target.form[1]];
    const formValidated = validateForm(formInputArr);
    if (formValidated) {
        logInUser(formInputArr[0].value, formInputArr[1].value)
        event.target.form.reset()
    }

})
editSubmit.addEventListener(`click`, (event) => {
    event.preventDefault()
    formInputArr = [
        event.target.form['fname'],
        event.target.form['lname'],
        event.target.form['email'],
        event.target.form['password'],
    ]

    const formValidated = validateForm(formInputArr)
    if (formValidated) {
        const editedUser = new User(
            formInputArr[0].value,
            formInputArr[1].value,
            formInputArr[2].value,
            formInputArr[3].value,
        )
        users[indexToEdit] = editedUser;
        localStorage.setItem(`users`, JSON.stringify(users))
        displayUsers()
        switchToRegister()
        event.target.form.reset()
    }

})

displayUsers();