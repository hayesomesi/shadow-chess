(() => {
  const screen = document.getElementById("screen");
  const history = document.getElementById("history");
  let current = "0";
  let previous = null;
  let operator = null;
  let freshInput = false;

  const render = () => { screen.textContent = current; };
  const format = (value) => {
    if (!Number.isFinite(value)) return "Error";
    const rounded = Number.parseFloat(value.toPrecision(12));
    return String(rounded);
  };
  const calculate = (a, op, b) => {
    switch (op) {
      case "+": return a + b;
      case "−": return a - b;
      case "×": return a * b;
      case "÷": return b === 0 ? NaN : a / b;
      default: return b;
    }
  };

  function inputNumber(n) {
    if (current === "Error" || freshInput) {
      current = n;
      freshInput = false;
    } else if (current.length < 15) {
      current = current === "0" ? n : current + n;
    }
    render();
  }

  function chooseOperator(op) {
    if (current === "Error") return;
    const value = Number(current);
    if (operator && !freshInput) {
      const result = calculate(previous, operator, value);
      current = format(result);
      render();
      previous = Number(current);
    } else {
      previous = value;
    }
    operator = op;
    history.textContent = `${current} ${op}`;
    freshInput = true;
  }

  function equals() {
    if (!operator || previous === null || current === "Error") return;
    const right = Number(current);
    const result = calculate(previous, operator, right);
    history.textContent = `${format(previous)} ${operator} ${format(right)} =`;
    current = format(result);
    previous = null;
    operator = null;
    freshInput = true;
    render();
  }

  function action(name) {
    switch (name) {
      case "clear":
        current = "0"; previous = null; operator = null;
        freshInput = false; history.textContent = ""; break;
      case "delete":
        if (current === "Error" || freshInput) { current = "0"; freshInput = false; }
        else current = current.length > 1 ? current.slice(0, -1) : "0";
        break;
      case "decimal":
        if (current === "Error" || freshInput) { current = "0."; freshInput = false; }
        else if (!current.includes(".")) current += ".";
        break;
      case "sign":
        if (current !== "0" && current !== "Error") current = current.startsWith("-") ? current.slice(1) : "-" + current;
        break;
      case "percent":
        if (current !== "Error") current = format(Number(current) / 100);
        break;
      case "equals": equals(); return;
    }
    render();
  }

  document.querySelector(".keypad").addEventListener("click", (event) => {
    const key = event.target.closest("button");
    if (!key) return;
    if (key.dataset.number !== undefined) inputNumber(key.dataset.number);
    else if (key.dataset.op) chooseOperator(key.dataset.op);
    else if (key.dataset.action) action(key.dataset.action);
  });

  document.addEventListener("keydown", (event) => {
    if (/^[0-9]$/.test(event.key)) inputNumber(event.key);
    else if (event.key === ".") action("decimal");
    else if (event.key === "Enter" || event.key === "=") { event.preventDefault(); action("equals"); }
    else if (event.key === "Backspace") action("delete");
    else if (event.key === "Escape") action("clear");
    else if (event.key === "+") chooseOperator("+");
    else if (event.key === "-") chooseOperator("−");
    else if (event.key === "*") chooseOperator("×");
    else if (event.key === "/") { event.preventDefault(); chooseOperator("÷"); }
    else if (event.key === "%") action("percent");
  });
  render();
})();
