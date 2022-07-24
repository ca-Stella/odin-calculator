const displayWindow = document.getElementById('display');
const numbers = document.querySelectorAll('.numbers .num');
const operations = document.querySelectorAll('.operation');
const equalsButton = document.getElementById('equal');
const clearAllButton = document.getElementById('clearAll');
const deleteButton = document.getElementById('backspace');
const decButton = document.getElementById('decimal');

// Set variables
let ongoingVal = '', currentOp = '';
let ongoingNum = 0, displayCounter = 0, result = 0;
let currentTurn = 'num';

// Add event listeners
numbers.forEach(num => num.addEventListener('click', assignNum));
operations.forEach(op => op.addEventListener('click', assignOp));
equalsButton.addEventListener('click', printResult);
clearAllButton.addEventListener('mousedown', clearAll);
deleteButton.addEventListener('click', deleteOne);

// Add keyboard support
window.addEventListener('keydown', supportKeyboard);

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
    currentTurn = 'operation';
    ongoingNum = Number(ongoingVal);
    displayVal(ongoingVal);
    displayCounter++;
}

function formatVal(elem) {
    let val = elem.innerHTML;
    if (val == '.') {
        if (displayCounter == 0) {
            val = '0' + val;
        }
        decButton.disabled = true;
    }
    return val;
}

// Assign operation based on button clicked
function assignOp() {
    setUpOp();
    currentOp = this.id;
    this.classList.add('pressed');
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
    if (x.toString().length > 9) {
        editedVal = parseFloat(x).toExponential(4);
        let newVal = editedVal.substring(0, editedVal.indexOf("e")) + '&thinsp;' + editedVal.substring(editedVal.indexOf("e")).sub();
        displayWindow.innerHTML = newVal;
        } else {
        displayWindow.innerHTML = x;
    }
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
    decButton.disabled = false;
    deleteButton.disabled = true;
    operations.forEach(button => button.classList.remove('pressed'));
}

// Keyboard support
function supportKeyboard(e) {
    const ek = e.key;
    console.log(ek);
    if (ek >= 0 || ek <= 9 || ek == '.') {
        appendVal(takeKeyVal(ek));
    } else if (ek == '+') {
        assignKeyOp(document.getElementById('plus'));
    } else if (ek == '-') {
        assignKeyOp(document.getElementById('minus'));
    } else if (ek == '*') {
        assignKeyOp(document.getElementById('multiply'));
    } else if (ek == '/') {
        assignKeyOp(document.getElementById('divide'));
    } else if (ek == '^') {
        assignKeyOp(document.getElementById('exponent'));
    } else if (ek == 'Backspace') {
        deleteOne();
    } else if (ek == '=' || ek == 'Enter') {
        printResult();
    }
}

function takeKeyVal(val) {
    if (val == '.') {
        if (displayCounter == 0) {
            val = '0' + val;
        } 
        document.getElementById('decimal').disabled = true;
    }
    return val;
}

function assignKeyOp(elem) {
    setUpOp();
    currentOp = elem.id;
    elem.classList.add('pressed');
}