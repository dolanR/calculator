import "./App.css";
import { useState } from "react";

const buttons = [
	{ id: "clear", value: "AC" },
	{ id: "divide", value: "/" },
	{ id: "multiply", value: "*" },
	{ id: "seven", value: "7" },
	{ id: "eight", value: "8" },
	{ id: "nine", value: "9" },
	{ id: "subtract", value: "-" },
	{ id: "four", value: "4" },
	{ id: "five", value: "5" },
	{ id: "six", value: "6" },
	{ id: "add", value: "+" },
	{ id: "one", value: "1" },
	{ id: "two", value: "2" },
	{ id: "three", value: "3" },
	{ id: "equals", value: "=" },
	{ id: "zero", value: "0" },
	{ id: "decimal", value: "." },
];

function App() {
	const [display, setDisplay] = useState("0");
	const [formula, setFormula] = useState([]);
	const [lastClickedWasEquals, setLastClickedWasEquals] = useState(false);
	const [decimalAllowed, setDecimalAllowed] = useState(true);

	let tempFormula = [];
	let formulaIndex = formula.length - 1;

	const handleClick = (e) => {
		if (e.target.value === ".") {
			if (!decimalAllowed) {
				return;
			} else {
				setDecimalAllowed(false);
			}
		}
		if (e.target.value === "AC") {
			setDisplay("0");
			setFormula([]);
			tempFormula = [];
			formulaIndex = 0;
			setLastClickedWasEquals(false);
			setDecimalAllowed(true);
		} else if (
			e.target.value === "+" ||
			e.target.value === "-" ||
			e.target.value === "*" ||
			e.target.value === "/"
		) {
			setDecimalAllowed(true);
			setDisplay(e.target.value);
			setLastClickedWasEquals(false);
			if (
				formula[formulaIndex] === "+" ||
				formula[formulaIndex] === "-" ||
				formula[formulaIndex] === "*" ||
				formula[formulaIndex] === "/"
			) {
				tempFormula[0] = e.target.value;
				setFormula([...formula.slice(0, formulaIndex), ...tempFormula]);
			} else if (formula[formulaIndex] === ".") {
				tempFormula.push("0");
				tempFormula.push(e.target.value);
				setFormula([...formula.slice(0, formulaIndex + 1), ...tempFormula]);
			} else {
				tempFormula.push(e.target.value);
				setFormula([...formula, ...tempFormula]);
			}
		} else if (e.target.value !== "=") {
			if (
				display === "+" ||
				display === "-" ||
				display === "*" ||
				display === "/"
			) {
				setLastClickedWasEquals(false);
				setDisplay(e.target.value);
				tempFormula.push(e.target.value);
				setFormula([...formula, ...tempFormula]);
			} else if (display === "0") {
				if (e.target.value === "0") {
					return;
				}
				setDisplay(e.target.value);
				tempFormula.push(e.target.value);
				setFormula([...tempFormula]);
			} else {
				if (lastClickedWasEquals) {
					setDisplay(e.target.value);
					setFormula([e.target.value]);
					setLastClickedWasEquals(false);
				} else {
					setDisplay(display + e.target.value);
					tempFormula.push(e.target.value);
					setFormula([...formula, ...tempFormula]);
				}
			}
		} else if (e.target.value === "=") {
			setDecimalAllowed(true);
			setLastClickedWasEquals(true);
			let finalForm = "";
			let evalFormula = "";
			let check = false;
			for (let i = 0; i < formula.length; i++) {
				if (formula[i] === "=") {
					check = true;
					let temp = formula.slice(i + 1);
					finalForm = temp.join("");
					evalFormula = eval(finalForm);
					setFormula([...temp, "=", evalFormula]);
					setDisplay(evalFormula);
					break;
				}
			}
			if (!check) {
				finalForm = formula.join("");
				evalFormula = eval(finalForm);
				setFormula([...formula, "=", evalFormula]);
				setDisplay(evalFormula);
			}
			tempFormula = [];
			tempFormula.push(evalFormula);
		}
	};
	return (
		<div className='App'>
			<div id='calculator' className='flex'>
				<div id='display'>
					<div id='display-formula'>{formula.join("")}</div>
					<div id='display-value'>{display}</div>
				</div>
				<div id='buttons' className='grid'>
					{buttons.map((button) => {
						return (
							<button
								id={button.id}
								className='button flex'
								value={button.value}
								onClick={handleClick}
								key={button.value}
							>
								{button.value}
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default App;
