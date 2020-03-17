class Calculator {
  constructor(previousScreenTextElement, currentScreenTextElement) {
    this.previousScreenTextElement = previousScreenTextElement;
    this.currentScreenTextElement = currentScreenTextElement;
    this.clear();
  }

  clear() {
    this.currentScreen = '';
    this.previousScreen = '';
    this.operation = undefined;
  }

  delete() {
    this.currentScreen = this.currentScreen.toString().slice(0, -1);
  }

  appendNumber(number) {
    if(number === '.' && this.currentScreen.includes('.')) return;
    this.currentScreen = this.currentScreen.toString() + number.toString();
  }

  chooseOperation(operation) {
    if(this.currentScreen === '') return;
    if(this.previousScreen !== '') {
      this.compute()
    }
    this.operation = operation;
    this.previousScreen = this.currentScreen;
    this.currentScreen = '';
  }

  compute() {
    let computation;
    const previous = parseFloat(this.previousScreen);
    const current = parseFloat(this.currentScreen);
    if(isNaN(previous) || isNaN(current)) return;
    switch(this.operation) {
      case '+':
        computation = previous + current;
        break;
      case '-':
        computation = previous - current;
        break;
      case '*':
        computation = previous * current;
        break;
      case '/':
        computation = previous / current;
        break;
      default:
        return;
    }
    this.currentScreen = computation;
    this.operation = undefined;
    this.previousScreen = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    const floatNumber = parseFloat(number);
    let integerDisplay;
    if(isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en' , {
        maximumFractionDigits: 0
      })
    }
    if(decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentScreenTextElement.innerText = this.getDisplayNumber(this.currentScreen);
    if(this.operation != null) {
      this.previousScreenTextElement.innerText = `${this.getDisplayNumber(this.previousScreen)} ${this.operation}`;
    } else {
      this.previousScreenTextElement.innerText = '';
    }
  }
}

const numberButtons = document.querySelectorAll('[number]');
const operationButtons = document.querySelectorAll('[operation]');
const equalsButton = document.querySelector('[equals]');
const deleteButton = document.querySelector('[delete]');
const allClearButton = document.querySelector('[all-clear]');
const previousScreenTextElement = document.querySelector('[previous-screen]');
const currentScreenTextElement = document.querySelector('[current-screen]');

const calculator = new Calculator(previousScreenTextElement, currentScreenTextElement);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
})
