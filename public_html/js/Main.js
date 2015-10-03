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
		var json = //$("#json").val();
			'{"size": 24.5,"color":{"red":"f","green":"000628","blue": "f"}, "r" : {"rs":[{"red": "f", "green": "0"},{"red" : "0", "green" : "f"}],  "gs":[4,5,2,4], "bs":["hello","world",6]}}';
		JsonClassReader.clearAll();
		JsonClassReader.setEnclosingClass( new JsonClassReader(json, "Window"));
		
		var selected = $("input[type='radio'][name='language']:checked");
		if (selected.length > 0) {
			var str = getClassString(selected.val());
			
			
			//TODO
			console.log(str);
			//downloadData(str,"ClassA","java");
			e.preventDefault();
			e.stopPropagation();
		} else {
		
			e.preventDefault();
			e.stopPropagation();
		}
		
		
	});
});



function getClassString(language){
	var classes = "";
	switch (language){
	case "Cs":
		classes = ToCsConverter.writeClasses();
		break;
	case "Cpp":
		classes = ToCppConverter.writeClasses();
		break;
	case "Java":
		classes = ToJavaConverter.writeClasses();
		break;
	case "Fs":
		classes = ToFsConverter.writeClasses();
		break;
	case "Go":
		classes = ToGoConverter.writeClasses();
		break;
	case "Php":
		classes = ToPHPConverter.writeClasses();
		break;
	case "Scala":
		classes = ToScalaConverter.writeClasses();
		break;
	case "Swift":
		classes = ToSwiftConverter.writeClasses();
		break;
	case "Python":
		classes = ToPythonConverter.writeClasses();
		break; 
	case "Groovy":
		classes = ToGroovyConverter.writeClasses();
		break;
	case "Ruby":
		classes = ToRubyConverter.writeClasses();
		break;
	case "Perl":
		classes = ToPerlConverter.writeClasses();
		break;
	case "Delphi":
		classes = ToDelphiConverter.writeClasses();
		break;
	case "ObjC":
		classes = ToObjCConverter.writeClasses();
		break;
	case "Matlab":
		classes = ToMatlabConverter.writeClasses();
		break;

	}
	
	return classes;
}
	


