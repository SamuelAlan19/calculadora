const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""

    }

    // Adiciona o número digitado na tela 
    addDigito(digito) {
        // checa se a operação já contem um dígito
        if (digito === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digito
        this.updateScreen()
    }

    // Processa as operações da calculadora
    processOperation(operation) {
        // checar se o valor atual está vazio 
        if (this.currentOperationText.innerText === "" && operation !== "C") {
            if (this.previousOperationText.innerText !== "") {
                //Mudar de operação 
                this.changeOperation(operation)
            }
            return;
        }

        // Solicitar os valores atuais e anteriores 
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;


        switch (operation) {

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
                this.processDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperation();
                break;
            case "C":
                this.processClearAllOperation();
                break;
            case "=":
                this.processEqualOperator();
                break;
            default:
                return;

        }
    }



    // Muda valores da tela 
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {

        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            // Verificar se o valor é zero
            if (previous === 0) {
                operationValue = current;
            }
            // Adiciona o valor ao previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";
        }
    }

    // Mudar operação matematica
    changeOperation(operation) {

        const mathOperations = ["*", "/", "+", "-"]

        if (!mathOperations.includes(operation)) {
            return
        }
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    // Deleta o último digito
    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    // Limpa o campo current operation
    processClearCurrentOperation() {
        this.currentOperationText.innerText = "";
    }

    // Clear all operations
    processClearAllOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    // Executa o comando desejado 
    processEqualOperator() {

        const operation = previousOperationText.innerText.split(" ")[1]; 
        this.processOperation(operation); 
    }

}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value > 0 || value === ".") {
            calc.addDigito(value);
        } else {
            calc.processOperation(value);
        }



    });
});