
// Click Handler

var buttons = document.getElementsByClassName("button")
for(let i = 0; i < buttons.length; i++){
	buttons[i].addEventListener("click", function(){
		processinput(this.getAttribute("value"))
	})
}

// Initialize Variables

var display = "";
var current = "";
var operand1 = ""; var operand2 = ""; var operator = ""; var result = "";

var calcs = {
	'+': (operand1, operand2) => operand1 + operand2,
	'-': (operand1, operand2) => operand1 - operand2,
	'*': (operand1, operand2) => operand1 * operand2,
	'/': (operand1, operand2) => operand1 / operand2,
}


// Process Button Click

function processinput(key){
	switch(true) {
		case ['+', '-', '*', '/', "="].includes(key):
			if (result !== ""){
				operand1 = result; 
				result = "";
			}

			if (operand2 != ""){
				result = formatNumber(calcs[operator](parseFloat(operand1), parseFloat(operand2)));
				operand1 = operand2 = operator = "";
			}
			else {
				operator = (key !== "=")  ? key : "";
			}
			
			break;
		
		case key == 'delete':
				if (result !== ""){
					result = "";
					break;
				}
				if (operand2 != ""){
					operand2 = operand2.substring(0, operand2.length - 1);
					break;
				}
				if (operator != ""){
					operator = operator.substring(0, operator.length - 1);
					break;
				}
				if (operand1 != ""){
					operand1 = operand1.substring(0, operand1.length - 1);
					break;
				}
			break;
		case key == 'clear':
				result = operand1 = operand2 = operator = "";
			break;
		default:
			if (result != ""){
				result = "";
			}
			if (operator == "") {
				operand1 += key;
			}
			else{
				operand2 += key;
			}
	}

	updateDisplay(result + " " + operand1 + " " + operator + " " + operand2)
		
}

// Update Display

function updateDisplay(value){
	value = (value.trim() == "") ? "0" : value;
	document.getElementById("screen").innerHTML = value;
}


// Format number to appropriate decimal places
function formatNumber(number){
	number = number.toString();
	let decimal_position = number.indexOf('.');
	if (decimal_position == -1){
		return parseInt(number)
	}
	else{
		let decimal_places = Math.min(8, number.length - decimal_position)
		let decimal_value = number.substring(decimal_position+1, decimal_position + 8);
		if (decimal_value == "0000000") return parseInt(number);
		return parseFloat(number).toFixed(decimal_places);
	}
}