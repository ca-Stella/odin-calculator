const displayWindow = document.getElementById('display');
const numbers = document.querySelectorAll('.numbers .num');
const operations = document.querySelectorAll('.operation');
const equalsButton = document.getElementById('equal');

// set variables
let ongoingVal = currentOp = '';
let ongoingNum = displayCounter = result = 0;
let currentTurn = 'num';

numbers.forEach(num => num.addEventListener('click', assignNum));
operations.forEach(op => op.addEventListener('click', assignOp));
equalsButton.addEventListener('click', printResult);

function assignNum() {
    appendVal(this);
}

function appendVal(elem) {
    if (currentOp == 'equals') clearAll();
    let val = elem.innerHTML;
    ongoingVal = (displayCounter == 0) ? val.toString() : ongoingVal + val;
    displayVal(ongoingVal);
    currentTurn = 'operation';
    displayCounter++;
}

function assignOp() {
    setUpOp();
    currentOp = this.id;
}

function setUpOp() {
    if (currentTurn !== 'num') operateOngoing();
    displayCounter = 0;
}

function operateOngoing() {
    ongoingNum = Number(ongoingVal);
    result = operate(result, ongoingNum, currentOp);
    displayVal(result);
    currentTurn = 'num';
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
    displayVal(result);
    displayCounter = 0;
    currentOp = 'equals';
    currentTurn = 'operation';
}

function displayVal(x) {
    displayWindow.textContent = x;
}

function clearAll() {
    ongoingNum = 0;
    result = 0;
    displayCounter = 0;
    currentOp = '';
    ongoingVal = '';
    displayWindow.textContent = '';
}