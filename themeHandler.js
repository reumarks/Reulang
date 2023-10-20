export function ToggleTheme() {
   setColorModeStorage();
   toggleRootClass();
}

function isColorModeSet(){
   return localStorage.getItem("light-mode") ?? false;
}

function isDarkModeDefault(){
   return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function toggleRootClass(){
   document.querySelector(":root").classList.toggle("light");
}

function setColorModeStorage(){
   if(!isColorModeSet()){
      if (isDarkModeDefault()) {
         localStorage.setItem("light-mode", "dark");
      } else {
         localStorage.setItem("light-mode", "light");
      }
   }else if(localStorage["light-mode"] == "light"){
      localStorage.setItem("light-mode", "dark");
   }else{
      localStorage.setItem("light-mode", "light");
   }
}

function updateTheme(){
   if (isColorModeSet()){
      if(localStorage["light-mode"] == "light"){
         toggleRootClass();
      }
   }else if(!isDarkModeDefault){
      toggleRootClass();
   }
}

updateTheme();