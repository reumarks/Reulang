String.prototype.replaceAt = function(index, replacement) {
	return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

String.prototype.toggleCase = function() {
	return this.toUpperCase() !== this ? this.toUpperCase() : this.toLowerCase();
}

String.prototype.isNumber = function() {
   return this >= '0' && this <= '9';
}

String.prototype.isLetter = function() {
   return (/[a-zA-Z]/).test(this);
}