const displayWindow = document.getElementById('display');
const numbers = document.querySelectorAll('.numbers .num');
const operations = document.querySelectorAll('.operation');
const equalsButton = document.getElementById('equal');
const clearAllButton = document.getElementById('clearAll');
const deleteButton = document.getElementById('backspace');

// Set variables
let ongoingVal = '', currentOp = '';
let ongoingNum = 0, displayCounter = 0, result = 0;
let currentTurn = 'num';

numbers.forEach(num => num.addEventListener('click', assignNum));
operations.forEach(op => op.addEventListener('click', assignOp));
equalsButton.addEventListener('click', printResult);
clearAllButton.addEventListener('mousedown', clearAll);
deleteButton.addEventListener('click', deleteOne);

// Functions

// Assign input as start or continuation of number
function assignNum() {
    deleteButton.disabled = false;
    equalsButton.disabled = false;
    checkInvalid();
    appendVal(formatVal(this));
}

function appendVal(val) {
    if (currentOp == 'equals') clearAll();
    ongoingVal = (displayCounter == 0) ? val.toString() : ongoingVal + val;
    displayVal(ongoingVal);
    currentTurn = 'operation';
    displayCounter++;
}

function formatVal(elem) {
    let val = elem.innerHTML;
    if (val == '.') {
        if (displayCounter == 0) {
            val = '0' + val;
        }
        document.getElementById('decimal').disabled = true;
    }
    return val;
}

// Assign operation based on button clicked
function assignOp() {
    setUpOp();
    currentOp = this.id;
}

function setUpOp() {
    disableForResults();
    equalsButton.disabled = true;
    if (currentTurn !== 'num') operateOngoing();
    displayCounter = 0;
    checkInvalid();
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
        case 'exponent':
            z = Math.pow(x, y);
            break;
        case 'root':
            z = Math.pow(x, 1/y);
            break;
        case 'equals':
            z = x;
            break;
        default: 
            z = y;
    }
    if (z === Infinity || isNaN(z)) {
        z = 'BYE 0';
    }
    return z;
}

function printResult() {
    disableForResults();
    ongoingNum = Number(ongoingVal);
    result = operate(result, ongoingNum, currentOp);
    displayVal(result);
    checkInvalid();
    displayCounter = 0;
    currentOp = 'equals';
    currentTurn = 'operation';
}

// Check if result is invalid and reset values if needed
function checkInvalid() {
    if (result == 'BYE 0') setNulls();
} 

// Display exact or rounded values based on length
function displayVal(x) {
    let editedVal = (x.toString().length > 8) ? parseFloat(x).toExponential(3) : x;
    displayWindow.textContent = editedVal;
}

function clearAll() {
    setNulls();
    equalsButton.disabled = false;
    displayWindow.textContent = '';
}

function setNulls() {
    ongoingNum = 0;
    result = 0;
    displayCounter = 0;
    currentOp = '';
    ongoingVal = '';
    disableForResults();
}

function deleteOne() {
    ongoingVal = ongoingVal.slice(0,-1);
    ongoingNum = Number(ongoingVal);
    displayWindow.textContent = ongoingVal;
}

function disableForResults() {
    document.getElementById('decimal').disabled = false;
    deleteButton.disabled = true;
}