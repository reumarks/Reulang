import { Start, Stop, Step, Load } from '/CodeRunner.js';
import { ToggleTheme } from './themeHandler.js';

const input = document.getElementById("input");
const inputLines = document.getElementById("input-line-counter");
const stepProgramButton = document.getElementById('step-program-button');
const startProgramButton = document.getElementById('start-program-button');
const stopProgramButton = document.getElementById('stop-program-button');
const loadProgramButton = document.getElementById('load-program-button');
const toggleThemeButton = document.getElementById('toggle-theme-button');

toggleThemeButton.addEventListener('click', () => {
   ToggleTheme();
});

startProgramButton.addEventListener('click', () => {
   Start();
});


stopProgramButton.addEventListener('click', () => {
   Stop();
});


stepProgramButton.addEventListener('click', () => {
   Step();
});


loadProgramButton.addEventListener('click', () => {
   Load(input.value);
});
input.addEventListener('scroll', () => {
   inputLines.scrollTop = input.scrollTop;
   inputLines.scrollLeft = input.scrollLeft;
});

input.addEventListener('keydown', function(e) {
   if (e.key == 'Tab') {
      e.preventDefault();
      var start = this.selectionStart;
      var end = this.selectionEnd;
      this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);
      this.selectionStart = this.selectionEnd = start + 1;
      handleInput();
   }
});

input.addEventListener('input', () => {
   handleInput();
});

function handleInput(e){
   let oldlineHeight = input.style.lineHeight;
   input.style.lineHeight = 10;
   input.style.height = "1px";
   let lineNumber = (input.scrollHeight - 20) / 140;
   input.style.lineHeight = oldlineHeight;
   let newHeight = Math.max(input.scrollHeight + 5, 120);
   input.style.height  = newHeight + "px";
   inputLines.style.height  = newHeight + "px";
   let lineNumbers = Array.from({length: lineNumber}, (_, i) => i + 1);
   inputLines.value = lineNumbers.join('\n');
}