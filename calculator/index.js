// alert to check connection
alert("working bhai!!");

// get reference to display
const display = document.getElementById("display");

// store current input
let currentInput = "";
let resultDisplayed = false;

// get all buttons
const buttons = document.querySelectorAll(".parent button");
buttons.forEach((button) => {
    button.addEventListener("click", () => handleInput(button.textContent));
});

// handle keyboard input
document.addEventListener("keydown", (event) => {
    const key = event.key;

    // allow digits, operators, dot
    if (
        (key >= "0" && key <= "9") || ["+", "-", "*", "/", "%", "."].includes(key)
    ) {
        handleInput(key);
    }
    // Enter or = → evaluate
    else if (key === "Enter" || key === "=") {
        handleInput("=");
    }
    // Escape → clear (like AC)
    else if (key === "Escape") {
        handleInput("AC");
    }
    // Backspace → delete last char
    else if (key === "Backspace") {
        currentInput = currentInput.slice(0, -1);
        display.textContent = currentInput;
    }
});

function handleInput(value) {
    // AC clears everything
    if (value === "AC") {
        currentInput = "";
        display.textContent = "";
        return;
    }

    // Evaluate the expression
    if (value === "=") {
        try {
            currentInput = eval(currentInput).toString();
            display.textContent = currentInput;
            resultDisplayed = true;
        } catch (err) {
            display.textContent = "error";
            currentInput = "";
        }
        return;
    }

    // If result already shown and next input is a number, start fresh
    if (resultDisplayed) {
        if (!isNaN(value) || value === ".") {
            currentInput = value;
        }
        resultDisplayed = false;
    } else {
        currentInput += value;
    }

    display.textContent = currentInput;
}