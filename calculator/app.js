// Variables
let operator = "",
  first = 0,
  second = 0;
// Display setting
let lastInput = document.querySelector("div.last");
let currentInput = document.querySelector("div.current");
// Button control
let digits = document.querySelectorAll("div.dig");
digits.forEach((digit) => {
  digit.addEventListener("click", (e) => {
    setNum(e.target.getAttribute("data-key"));
  });
});
let ops = document.querySelectorAll("div.op");
ops.forEach((op) => {
  op.addEventListener("click", (e) => {
    // Skip operator setting for setting negative number
    if (e.target.textContent === "-" && currentInput.textContent === "") {
      currentInput.textContent = "-";
      return;
    } else if (currentInput.textContent === "-") {
      return;
    }
    setOperator(e.target.getAttribute("data-key"), e.target.textContent);
  });
});
let equal = document.querySelector(".equal");
equal.addEventListener("click", compute);

let clear = document.querySelector("div.clear");
clear.addEventListener("click", reset);

let backspace = document.querySelector("div.backspace");
backspace.addEventListener("click", delNum);
// Keyboard control
window.addEventListener("keydown", (e) => {
  if (e.key < 10 || e.key > -1 || e.key == ".") {
    setNum(e.key);
  } else if (e.key == "Escape") {
    reset();
  } else if (e.key == "Backspace") {
    delNum();
  } else if (["-", "*", "+", "/"].includes(e.key)) {
    document.querySelector(`[data-key="${e.key}"]`).click();
    // Prevent shortcut on firefox
    if (e.key == "/") {
      e.preventDefault();
      alert(
        'This page will stop you from access keyboard shortcut by pressing "/" '
      );
    }
  } else if (e.key == "=") {
    compute();
  } else {
    return;
  }
});

function setNum(numStr) {
  if (currentInput.textContent === "0" && numStr !== ".") {
    reset();
  } else if (currentInput.textContent.includes(".") && numStr == ".") {
    return;
  } else if (currentInput.textContent.length > 10) {
    alert("Out of range!");
    return;
  } else if (
    currentInput.textContent.length > 1 &&
    (currentInput.textContent.endsWith("+") ||
      currentInput.textContent.endsWith("-") ||
      currentInput.textContent.endsWith("×") ||
      currentInput.textContent.endsWith("÷"))
  ) {
    updateDisplay();
  }
  currentInput.textContent += numStr;
  function updateDisplay() {
    lastInput.textContent = currentInput.textContent;
    currentInput.textContent = "";
  }
}
function setOperator(optString, sign) {
  // Skip if there is already an input of operator
  if (
    currentInput.textContent === "" ||
    currentInput.textContent.endsWith("+") ||
    currentInput.textContent.endsWith("-") ||
    currentInput.textContent.endsWith("×") ||
    currentInput.textContent.endsWith("÷")
  ) {
    return;
  } // Compute before adding another operator
  else if (
    lastInput.textContent.endsWith("+") ||
    lastInput.textContent.endsWith("-") ||
    lastInput.textContent.endsWith("×") ||
    lastInput.textContent.endsWith("÷")
  ) {
    compute();
  }
  // Check for input length
  if (currentInput.textContent.length > 10) {
    alert("Out of range!");
    return;
  }
  operator = optString;
  first = +currentInput.textContent;
  currentInput.textContent += sign;
}
function compute() {
  // Skip for an empty string, only negative sign and input without second number
  if (
    lastInput.textContent.includes("=") ||
    currentInput.textContent === "-" ||
    currentInput.textContent.endsWith("+") ||
    currentInput.textContent.endsWith("-") ||
    currentInput.textContent.endsWith("×") ||
    currentInput.textContent.endsWith("÷")
  ) {
    return;
  }
  second = +currentInput.textContent;
  let result = operate(first, operator, second);
  let processedResult = checkLength(result);
  lastInput.textContent += currentInput.textContent + equal.textContent;
  currentInput.textContent = processedResult;
  function operate(first, operator, second) {
    if (operator === "+") {
      return add(first, second);
    } else if (operator === "-") {
      return subtract(first, second);
    } else if (operator === "*") {
      return multiply(first, second);
    } else if (operator === "/") {
      return divide(first, second);
    } else {
      return second;
    }
    function add(a, b) {
      return a + b;
    }
    function subtract(a, b) {
      return a - b;
    }
    function multiply(a, b) {
      return a * b;
    }
    function divide(a, b) {
      return b === 0 ? "DividerError" : a / b;
    }
  }
  function checkLength(num) {
    let length = num.toString().length;
    if (length > 10) {
      if (num.toString().includes(".")) {
        let arr = num.toString().split(".");
        let roundUnit = 10 - num.toString().length;
        return num.toFixed(arr[1].length + roundUnit);
      } else if (num == "DividerError") {
        return num;
      } else {
        return "Out of range";
      }
    }
    return num;
  }
}
function reset() {
  lastInput.textContent = "";
  currentInput.textContent = "";
  operator = "";
  first = 0;
  second = 0;
}
function delNum() {
  if (currentInput.textContent === "") {
    return;
  }
  let length = currentInput.textContent.length;
  currentInput.textContent = currentInput.textContent.slice(0, length - 1);
}
