const displayWindow = document.getElementById('display');
const numbers = document.querySelectorAll('.numbers .num');
const operations = document.querySelectorAll('.operation');
const equalsButton = document.getElementById('equal');

// set variables
let ongoingVal= '';
let result = 0;
let displayCounter = 0;
let currentTurn = 'num';
let currentOp = '';
let ongoingNum = 0;

numbers.forEach(num => num.addEventListener('click', assignNum));
operations.forEach(op => op.addEventListener('click', assignOp));
equalsButton.addEventListener('click', printResult);

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
    displayVal(ongoingVal);
    currentTurn = 'operation';
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
        case 'equals':
            z = x;
            break;
        default: 
            z = y;
    }
    return z;
}

function printResult() {
    ongoingNum = Number(ongoingVal);

    result = operate(result, ongoingNum, currentOp);
    displayCounter = 0;
    currentOp = 'equals';
    currentTurn = 'operation';
    displayVal(result);
}