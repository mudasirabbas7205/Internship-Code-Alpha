const display = document.getElementById("display");

let currentInput = "";

// Update display
function updateDisplay() {
    display.textContent = currentInput || "0";
}

// Button click handling
document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (button.classList.contains("clear")) {
            currentInput = "";
        }
        else if (button.classList.contains("delete")) {
            currentInput = currentInput.slice(0, -1);
        }
        else if (button.classList.contains("equal")) {
            try {
                currentInput = eval(currentInput).toString();
            } catch {
                currentInput = "Error";
            }
        }
        else {
            currentInput += value;
        }

        updateDisplay();
    });
});

// Keyboard support
document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (!isNaN(key) || "+-*/.%".includes(key)) {
        currentInput += key;
    }
    else if (key === "Enter") {
        try {
            currentInput = eval(currentInput).toString();
        } catch {
            currentInput = "Error";
        }
    }
    else if (key === "Backspace") {
        currentInput = currentInput.slice(0, -1);
    }
    else if (key === "Escape") {
        currentInput = "";
    }

    updateDisplay();
});