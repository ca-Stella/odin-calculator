const displayWindow = document.getElementById('display');
const numbers = document.querySelectorAll('.numbers .num');

let ongoingVal = '';

numbers.forEach(num => num.addEventListener('click', assignNum));

function assignNum() {
    appendVal(this);
}

function appendVal(elem) {
    let val = elem.innerHTML;
    ongoingVal = ongoingVal + val;
    displayVal(ongoingVal);
}

function displayVal(x) {
    let editedVal = (x.toString().length > 8) ? parseFloat(x).toExponential(3) : x;
    displayWindow.textContent = editedVal;
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
    }
    return z;
}