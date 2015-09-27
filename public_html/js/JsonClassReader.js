'use strict';

function JsonClassReader(jsonString, className){
    this.json = JSON.parse(jsonString,function(k,v){
		if (k === ''){
			return v;
		}
		if (typeof v === "number"){
			return v+"";
		}
		return v;
		
	});
	this.className = className;
    this.integers = {};
	this.floats = {};
	this.strings= {};
	this.bools = {};
	this.objects = {};
	this.arrays = {};
	
	this.fillProperties();
	this.deriveClass();
	this.deriveArrayTypes();
	
};

JsonClassReader.prototype.fillProperties = function(){
    for (var name in this.json){
        
        var element = this.json[name];
		
		if (typeof element === "string"){
			if (isNaN(element)){
				this.strings[name] = element;
			} else if (element.indexOf(".") !== -1) {
				this.floats[name] = element;
			} else {
				this.integers[name] = element;
			}
        } else if (typeof element === "boolean"){
			this.bools[name] = element;
			
		} else if (element instanceof Array || Array.isArray(element)){
			this.arrays[name] = element;
			
		} else if (typeof element === "object"){
			this.objects[name] = element;
		} 
    }
};

JsonClassReader.prototype.deriveClass = function(){
	
	for (var name in this.objects){
		
		var cName = name.capitalizeFirstLetter();
		var json = JSON.stringify(this.objects[name]);
		var jsonReader = new JsonClassReader(json,cName);
		JsonClassReader.assignCorrectClass(this.objects[name],jsonReader);
	}
};

JsonClassReader.prototype.deriveArrayTypes = function(){
	for (var name in this.arrays){
		var arr = this.arrays[name];
		if (isArrayFromOneClass(arr)){
			arr.type = JsonClassReader.getType(arr[0],name);
		} else {
			arr.type = "object";
		}
	}
};


JsonClassReader.classes = {};
JsonClassReader.classNameAppearances = {};

JsonClassReader.setEnclosingClass = function(jsonReader){
	JsonClassReader.addClass(jsonReader);
	jsonReader.isEnclosingClass = true;
};

JsonClassReader.assignCorrectClass = function(element, jsonReader){
	var newClassName;
	if (JsonClassReader.getClassOfType(jsonReader) === null){
		newClassName = JsonClassReader.addClass(jsonReader);
	} else {
		newClassName = JsonClassReader.getClassOfType(jsonReader).className;
	}
	element.className = newClassName;
	
	return newClassName;
};

JsonClassReader.addClass = function(jsonReader){
	
	if (JsonClassReader.classNameAppearances[jsonReader.className]){
		JsonClassReader.classNameAppearances[jsonReader.className]++;
		
		jsonReader.className += JsonClassReader.classNameAppearances[jsonReader.className];
	} else {
		JsonClassReader.classNameAppearances[jsonReader.className] = 1;
	}
	JsonClassReader.classes[jsonReader.className] = jsonReader;
	
	
	return jsonReader.className;

};

JsonClassReader.getType = function(element,name){
	 if (typeof element === "string"){
		if (isNaN(element)){
			return "string";
		} else if (element.indexOf(".") !== -1) {
			return "float";
		} else {
			return "int";
		}
		 
		 
		return typeof element;

	} else if (typeof element === "boolean"){
		return typeof element;

	} else if (element instanceof Array || Array.isArray(element)){
		//TODO

	} else if (typeof element === "object"){
		
		var json = JSON.stringify(element);
		var newName;
		if (name.toLowerCase().charAt(name.length-1)=== "s"){
			newName = name.substring(0,name.length-1).capitalizeFirstLetter();
		} else {
			newName = name;
		}
		var jsonReader = new JsonClassReader(json,newName);
		return JsonClassReader.assignCorrectClass(element,jsonReader);
		
	} else {
		return typeof element;
	}
		
};

JsonClassReader.getClassOfType = function(jsonReader){
	for (var name in JsonClassReader.classes){
		
		if (compareKeys(JsonClassReader.classes[name].json,jsonReader.json)){
			return JsonClassReader.classes[name];
		}
		
	}
	
	return null;
};


function compareKeys(a, b) {
  var aKeys = Object.keys(a).sort();
  var bKeys = Object.keys(b).sort();
  return JSON.stringify(aKeys) === JSON.stringify(bKeys);
}

function isArrayFromOneClass(arr){
	for (var i = 0;i < arr.length; i++){
		if (i !== 0){
			if (typeof arr[0] !== typeof arr[i]){
				//TODO
				
				return false;
			} else if (typeof arr[0] === "object" && typeof arr[i] === "object" && !compareKeys(arr[0],arr[i])){
				return false;
			}
		}
	}
	return true;
}