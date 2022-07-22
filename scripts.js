const displayWindow = document.getElementById('display');
const numbers = document.querySelectorAll('.numbers .num');
const operations = document.querySelectorAll('.operation');
const equalsButton = document.getElementById('equal');
const clearAllButton = document.getElementById('clearAll');
const deleteButton = document.getElementById('backspace');


// set variables
let ongoingVal = currentOp = '';
let ongoingNum = displayCounter = result = 0;
let currentTurn = 'num';

numbers.forEach(num => num.addEventListener('click', assignNum));
operations.forEach(op => op.addEventListener('click', assignOp));
equalsButton.addEventListener('click', printResult);
clearAllButton.addEventListener('mousedown', clearAll);
deleteButton.addEventListener('click', deleteOne);

// Functions
function assignNum() {
    checkInvalid();
    appendVal(this);
}

function appendVal(elem) {
    if (currentOp == 'equals') clearAll();
    let val = elem.innerHTML;
    if (val == '.') {
        if (displayCounter == 0) {
            val = '0' + val;
        }
    }
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
    ongoingNum = Number(ongoingVal);
    result = operate(result, ongoingNum, currentOp);
    displayVal(result);
    checkInvalid();
    displayCounter = 0;
    currentOp = 'equals';
    currentTurn = 'operation';
}

function checkInvalid() {
    if (result == 'BYE 0') setNulls();
} 

function displayVal(x) {
    displayWindow.textContent = x;
}

function clearAll() {
    setNulls();
    displayWindow.textContent = '';
}

function setNulls() {
    ongoingNum = 0;
    result = 0;
    displayCounter = 0;
    currentOp = '';
    ongoingVal = '';
}

function deleteOne() {
    ongoingVal = ongoingVal.slice(0,-1);
    ongoingNum = Number(ongoingVal);
    displayWindow.textContent = ongoingVal;
}