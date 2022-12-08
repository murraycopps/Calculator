const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');
const previousOperandTextElement = document.querySelector('.previous-operand');
const currentOperandTextElement = document.querySelector('.current-operand');

let previousOperand = '';
let currentOperand = '';
let operatorValue = '';

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        if (currentOperand === '') {
            if (previousOperand === '') return;
            operatorValue = operator.innerText;
            updateDisplay();
            return;
        }
        if (previousOperand !== '') {
            calculate();
        }
        operatorValue = operator.innerText;
        previousOperand = currentOperand;
        currentOperand = '';
        updateDisplay();
    });
});

numbers.forEach(number => {
    number.addEventListener('click', () => {
        if (number.innerText === '.' && currentOperand.includes('.')) return;
        currentOperand += number.innerText;
        updateDisplay();
    });
});

equals.addEventListener('click', () => {
    if (currentOperand === '' || previousOperand === '') return;
    calculate();
    previousOperand = currentOperand;
    currentOperand = '';
    operatorValue = '';
    updateDisplay();
});

clear.addEventListener('click', () => {
    previousOperand = '';
    currentOperand = '';
    operatorValue = '';
    updateDisplay();
});

deleteButton.addEventListener('click', () => {
    currentOperand = currentOperand.toString().slice(0, -1);
    updateDisplay();
});





calculate = () => {
    let result = '';
    switch (operatorValue) {
        case '+':
            result = parseFloat(previousOperand) + parseFloat(currentOperand);
            break;
        case '-':
            result = parseFloat(previousOperand) - parseFloat(currentOperand);
            break;
        case '×':
            result = parseFloat(previousOperand) * parseFloat(currentOperand);
            break;
        case '÷':
            result = parseFloat(previousOperand) / parseFloat(currentOperand);
            break;
        default:
            return;
    }
    currentOperand = result;
    previousOperand = '';
    operatorValue = '';
}

updateDisplay = () => {
    console.log(`previousOperand: ${previousOperand}, currentOperand: ${currentOperand}, operatorValue: ${operatorValue}`);
    currentOperandTextElement.innerText = currentOperand;
    previousOperandTextElement.innerText = previousOperand + ' ' + operatorValue;
}