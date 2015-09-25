'use strict';

function JsonReader(jsonString){
    this.json = JSON.parse(jsonString);
    this.integers = [];
	this.floats = [];
	this.strings= [];
	this.bools = [];
	this.objects = [];
	this.arrays = [];
	
	this.fillProperties();
};

JsonReader.prototype.fillProperties = function(){
    for (var name in this.json){
        
        var element = this.json[name];
		
        if (isInt(element)){
            this.integers[name] = element;
			
        } else if(isFloat(element)){
			this.floats[name] = element;
			
        } else if (typeof element === "string"){
			this.strings[name] = element;
			
        } else if (typeof element === "boolean"){
			this.bools[name] = element;
			
		} else if (typeof element === "object"){
			this.objects[name] = element;
			
		} else if (typeof element === "array"){
			this.arrays[name] = element;
		}
    }
};

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
	var conv = new JsonReader('{"firstName":"John", "lastName":"Doe" , "bro": 2.3, "breh": 50}');
	var str = new ToJavaConverter(conv,"ClassA").javaString;
	downloadData(str,"ClassA","java");
});
	


