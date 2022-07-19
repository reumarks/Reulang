(function(self){
   function compile(input, wrapWithEval, runInParentScope){
     var output = [];
     if (!input){
       return "";
     }

     // Do everything here
     output = input;
    
     return output;
   }

   self.forglang = {
     compile: compile
   };
 })(typeof(exports) === "undefined" ? window : exports);
 