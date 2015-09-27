'use strict';

function isInt(n){
    return Number(n) === n && n % 1 === 0;
}

function isFloat(n){
    return n === Number(n) && n % 1 !== 0;
}

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};


function downloadData(text,name,fileEnding){
	var textFile = null;
	var data = new Blob([text], {type: 'text/plain'});

	if (textFile !== null) {
		window.URL.revokeObjectURL(textFile);
	}

	textFile = window.URL.createObjectURL(data);
	var link = document.getElementById('downloadlink');
	link.download = name + "." + fileEnding;
    link.href = textFile;
}

$( window ).load(function() {
	$("#downloadlink").click(function(e) {
		var json = $("#json").val();
			//'{"size": 24.5,"color":{"red":"f","green":"000628","blue": "f"}, "r" : {"rs":[{"red": "f", "green": "0"},{"red" : "0", "green" : "f"}],  "gs":[4,5,2,4], "bs":["hello","world",6]}}';
		JsonClassReader.setEnclosingClass( new JsonClassReader(json, "Window"));
		var str = ToJavaConverter.writeClasses();
		//TODO
		console.log(str);
		//downloadData(str,"ClassA","java");
		e.preventDefault();
		e.stopPropagation();
	});
});
	


