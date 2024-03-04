export class User {
    firstName;
    lastName;
    email;
    password;
    isLoggedIn;
    constructor(firstName, lastName, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.isLoggedIn = `Logged Out`;

    }
    logIn(email, password) {
        if (email == this.email && password == this.password) {
            this.isLoggedIn = `Logged In`;
        }
    }

    logOut() {
        this.isLoggedIn = `Logged Out`;
    }

}