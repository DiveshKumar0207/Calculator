class Calculator {
    constructor(previousFieldTextElement, currentFieldTextElement) {
        this.previousFieldTextElement = previousFieldTextElement;
        this.currentFieldTextElement = currentFieldTextElement;
        this.clear();
    }

    clear() {
        this.previousField = ''; //initialising previousfield nd currentfield as = ''
        this.currentField = '';
        this.operation = undefined;
    }

    delete() {
        this.currentField = this.currentField.slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentField.includes('.')) return;
        this.currentField += number; //made this.currentField to store number -->> then display this in updatedisplay()
    }

    chooseOperation(operation) {
        if (this.currentField === '') return;
        if (this.previousField != '') {
            this.compute();
        }

        this.operation = operation; //making 'this.operation'
        this.previousField = this.currentField + operation;
        this.currentField = '';
    }
    chooseSpecialOperation(SpecialOperation) {
        this.SpecialOperation = SpecialOperation;

        if (this.currentField === '') {
            return;
        }
        if (this.previousField === '') {
            this.specialCompute();
        }
    }
    specialCompute() {
        let specialcomputation;
        const prev = parseFloat(this.previousField);
        const current = parseFloat(this.currentField);
        // if (isNaN(prev)) return;
        switch (this.SpecialOperation) {
            case '1/x':
                specialcomputation = 1 / current;
                console.log('hyyy');
                break;
            case 'x^2':
                specialcomputation = current * current;
                break;
            case '%':
                specialcomputation = current / 100;
                break;
            case '√x':
                specialcomputation = Math.sqrt(current);
                break;
        }

        this.currentField = specialcomputation;
        this.operation = undefined;
        this.previousField = '';
        // this.updateDisplay();
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousField);
        const current = parseFloat(this.currentField);

        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }

        this.currentField = computation;
        this.operation = undefined;
        this.previousField = '';
    }

    updateDisplay() {
        this.currentFieldTextElement.innerText = this.currentField;
        this.previousFieldTextElement.innerText = this.previousField;
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const specialOperationButtons = document.querySelectorAll(
    '[data-special-operation]'
);
const equalsButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-allclear]');
const deleteButton = document.querySelector('[data-delete]');
const previousFieldTextElement = document.querySelector(
    '[data-previous-field]'
);
const currentFieldTextElement = document.querySelector('[data-current-field]');

const calculator = new Calculator(
    previousFieldTextElement,
    currentFieldTextElement
);

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

specialOperationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.chooseSpecialOperation(button.innerText);
        calculator.updateDisplay();
    });
});

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});
