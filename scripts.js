const displayWindow = document.getElementById('display');
const numbers = document.querySelectorAll('.numbers .num');
const operations = document.querySelectorAll('.operation');

// set variables
let ongoingVal= '';
let result = 0;
let displayCounter = 0;
let currentTurn = 'num';
let currentOp = '';
let ongoingNum = 0;

numbers.forEach(num => num.addEventListener('click', assignNum));
operations.forEach(op => op.addEventListener('click', assignOp));

function assignNum() {
    appendVal(this);
}

function assignOp() {
    displayCounter = 0;
    ongoingNum = Number(ongoingVal);
    if (currentTurn !== 'num') result = operate(result, ongoingNum, currentOp);
    displayVal(result);
    currentTurn = 'num';
    currentOp = this.id;
}

function appendVal(elem) {
    let val = elem.innerHTML;
    ongoingVal = (displayCounter == 0) ? val.toString() : ongoingVal + val;
    currentTurn = 'operation';
    displayVal(ongoingVal);
    displayCounter++;
}

function displayVal(x) {
    displayWindow.textContent = x;
}

function operate(x, y, op) {    
    let z = 0;
    switch (op) {
        case 'plus': 
            z = x + y;
            break;
        case 'minus':
            z = ((x*100000000) - (y*100000000))/100000000;
            break;
        case 'multiply':
            z = x * y;
            break;
        case 'divide':
            z = x / y;
            break;
        default: 
            z = y;
    }
    return z;
}