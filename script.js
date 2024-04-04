const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#btns-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    // adicionar digitos na tela da calculadora
    addDigit(digit) {
        // checar se já existe ponto na operação
        if(digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    // processar todas as operações
    processOperation(operation) {
        // checar se current está vazio
        if(this.currentOperationText.innerText === "" && operation !== "C") {
            // mudar operação
            if(previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

        // pegar current e previous
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                operationValue = previous * current;
                this.processDelOperator();
                break;
            case "CE":
                operationValue = previous * current;
                this.processClearCurrentOperation();
                break;
            case "C":
                operationValue = previous * current;
                this.processClearAllOperation();
                break;
            case "=":
                operationValue = previous * current;
                this.processEqualOperator();
                break;
            default:
                return;
        }
    }

    // mudar valores na tela da calculadora
    updateScreen(operationValue = null, operation = null, current = null, previous = null) {
        console.log(operationValue,operation,current,previous);

        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            // checar se o valor é 0, se sim então adicione ao valor current
            if(previous === 0) {
                operationValue = current;
            }

            // adicionar valor current para previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }

    // mudar operação matemática 
    changeOperation(operation) {
        const mathOperations = ["+", "-", "/", "*"];

        if(!mathOperations.includes(operation)) {
            return;
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    // deletar último digito
    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    // deletar operação current
    processClearCurrentOperation() {
        this.currentOperationText.innerText = "";
    }

    // deletar tudo
    processClearAllOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    // processo da operação
    processEqualOperator() {
        const operation = previousOperationText.innerText.split(" ")[1];

        this.processOperation(operation);
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;
        
        if(+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    })
})