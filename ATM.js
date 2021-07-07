

class ATM {
    constructor(ledger = [], currentUser) {
        this.ledger = ledger;
        this.currentUser = currentUser;
    }

    mainMenu() {
        if (this.currentUser === undefined) {
            let input = prompt(`Enter (1) to register a new account or (2) to log in:`);
            console.log(input);
            if (input === '1') {
                this.register();
                this.mainMenu();
            } else if (input === '2') {
                this.login();
                this.subMenu();
            }else {
                console.log(this.ledger);
            }
            
        }
        else {
            let input = console.prompt(`User ${this.currentUser.name} is currently logged in. Would you like to log out?`);
            if (input === 'yes') {
                this.logout();
                this.mainMenu();
            } else {
                let passwordConfirm = console.prompt("Please re-enter your password:");
                if (passwordConfirm === this.currentUser.password) {
                    this.subMenu();
                } else {
                    this.logout();
                    this.mainMenu();
                }
            }
        }
    }

    subMenu() {
        let input = prompt("What action would you like to perform? 1) Check balance 2) Make a deposit 3) Make a withdrawal 4) Log out");
        
        // check balance
        if(input === '1') {
            this.checkBalance();
            this.subMenu();
        }
        // deposit
        else if(input === '2') {
            this.deposit();
            this.subMenu();
        }
        // withdraw
        else if(input === '3') {
            this.withdraw();
            this.subMenu();
        }
        else if(input === '4') {
            this.logout();
            this.mainMenu();
        }
        else {
            console.log("That was not a valid input.");
            this.subMenu();
        }
        
    }

    register() {
        let name = prompt("Please enter a name for the account:");
        let password = prompt("Please enter your password:")
        let a = new account(name, password, 0);
        this.ledger.push(a);
        console.log(`User ${a.name} has been registered.`);
    }

    login() {
        let name = prompt("Please enter the name associated with you account:");
        let password = prompt("Please enter your password:")
        let loginAttempt = new account(name, password, 0);
        if (this.currentUser === undefined) {
            for (let i = 0; i < this.ledger.length; i++)            
            {
                if(loginAttempt.name === this.ledger[i].name && loginAttempt.password === this.ledger[i].password) {
                    this.currentUser = this.ledger[i];
                    console.log(`${this.ledger[i].name} is now logged in.`);
                }
            }
        } 
        else {
            console.log("Another user is already logged in");
        }
    }

    logout() {
        let userName = this.currentUser.name;
        this.currentUser = undefined;
        console.log(`${userName} has logged out.`);
    }

    checkBalance() {
        console.log(`Your current balance is ${this.currentUser.balance}`);
    }

    deposit() {
        let amount = prompt("How much would you like to deposit?");
        this.currentUser.balance = parseFloat(this.currentUser.balance) + parseFloat(amount);
        console.log(`Your balance is now ${this.currentUser.balance}`)
    }

    withdraw() {
        let amount = prompt("How much would you like to withdraw?");
        if(this.currentUser.balance - amount >= 0) {
            this.currentUser.balance = parseFloat(this.currentUser.balance) - parseFloat(amount);
        }
        console.log(`Your balance is now ${this.currentUser.balance}`)
    }
}

class account{
    constructor(name, password, balance) {
        this.name = name;
        this.password = password;
        this.balance = balance;
    }
}

let moneyMachine = new ATM;

let a = new account('mark', '123', 1000);
let b = new account('diana', '234', 2000);
moneyMachine.ledger.push(a);
moneyMachine.ledger.push(b);
moneyMachine.mainMenu();

// moneyMachine.currentUser = a;

// moneyMachine.register();
// moneyMachine.login();


// console.log(moneyMachine.ledger);
// console.log(moneyMachine);
// moneyMachine.checkBalance();
// moneyMachine.deposit();
// moneyMachine.checkBalance();
// moneyMachine.withdraw();
// moneyMachine.checkBalance();
// console.log(moneyMachine.ledger);