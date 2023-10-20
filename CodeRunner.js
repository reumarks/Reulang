let programRunning = false;
var output = document.getElementById('output');
var stopButtons = document.getElementsByClassName('stopButton');
var startButtons = document.getElementsByClassName('startButton');
let programLoop;

export function Load(input){
	stopProgram();

	// Remove any empty new lines
	let program = input.replace(/\n|\t| /gm, '');
	

	setProgram(program);
}

export function Start(){
	startProgram();
}

export function Stop(){
	stopProgram();
}

export function Step(){
	let program = getProgram();
	
	let currentSymbol = program.charAt(0);
	let nextSymbol = program.charAt(1);

	switch(currentSymbol){
		case 'P': // Pushes copy of the following symbol to end of string
			program = program.substring(1) + nextSymbol + currentSymbol;
			break;

		case 'R': // Remove the next instance of the following symbol
		{
			const indexOfNext = program.indexOf(nextSymbol, 2);
			if(indexOfNext === -1){
				program = program.substring(1) + currentSymbol;
				break;
			}

			program = program.substring(1, indexOfNext) + program.substring(indexOfNext + 1) + currentSymbol;
			break;
		}
		case 'T': // Toggle case of the following symbol, if it is a letter
			if(!nextSymbol.isLetter()){
				program = program.substring(1) + currentSymbol;
				break;
			}
			
			program = nextSymbol.toggleCase() + program.substring(2) + currentSymbol;
			break;

		case 'I': // Increment the following symbol, if it is a number
			if(!nextSymbol.isNumber()){
				program = program.substring(1) + currentSymbol;
				break;
			}

			program = ((parseInt(nextSymbol) + 1) % 10) + program.substring(2) + currentSymbol;
			break;

		case 'D': // Decrement the following symbol, if it is a number
			if(!nextSymbol.isNumber()){
				program = program.substring(1) + currentSymbol;
				break;
			}

			program = (parseInt(nextSymbol) === 0 ? 9 : (parseInt(nextSymbol) - 1)) + program.substring(2) + currentSymbol;
			break;

		case 'J': // Jump to the next instance of the following symbol.
		{
			const indexOfNext = program.indexOf(nextSymbol, 2);
			if(indexOfNext === -1){
				program = program.substring(1) + currentSymbol;
				break;
			}

			program = program.substring(indexOfNext) + program.substring(0, indexOfNext);
			break;
		}

		case 'E': // End Program
			stopProgram();
			break;

		default: 
			program = program.substring(1) + currentSymbol;
			break;
	}
	
	setProgram(program);
}

function stopProgram(){
	programRunning = false;
	Array.from(stopButtons).forEach(element => { element.style.display = 'none'; });
	Array.from(startButtons).forEach(element => { element.style.display = 'block'; });
	clearInterval(programLoop);
}

function startProgram(){
	programRunning = true;
	Array.from(stopButtons).forEach(element => { element.style.display = 'block'; });
	Array.from(startButtons).forEach(element => { element.style.display = 'none'; });
	programLoop = setInterval(() => Step(), 20);
}

function getProgram(){
	// Get value
	return output.value;
}

function setProgram(program){
	// Set value
	output.value = program;

	// Update formatting
	output.style.height = "0px";
	output.style.height = output.scrollHeight + 3 + "px";
}