'use strict';

function ToFsConverter(jsonReader, className){
	this.jsonReader = jsonReader;
	this.className = className;
	
	this.classString = this.writeNewClassBeginning();
	this.classString += this.writeConstructor();
	this.classString += this.writePrimitiveProperties();
	this.classString += this.writeObjects();
	this.classString += this.writeArrays();
	
	this.classString += this.writeClassEnding();
};

ToFsConverter.writeClasses = function(){
	var str = "";
	for (var name in JsonClassReader.classes){
		str += new ToFsConverter(JsonClassReader.classes[name],name).classString;
		
	}
	
	return str;
};

ToFsConverter.prototype.writeObjects = function(){
	var str = "";
	for (var name in this.jsonReader.objects){
		str += "    member this." + name.capitalizeFirstLetter() + " = " + name + "\n";
	}
	
	return str;
};

ToFsConverter.prototype.writeArrays = function(){
    var str = "";
    for (var name in this.jsonReader.arrays){
		str += "    member this." + name.capitalizeFirstLetter() + " = " + name + "\n";
	}

    return str;
};

ToFsConverter.prototype.writePrimitiveProperties = function(){
    var str = "";
    for (var name in this.jsonReader.integers){
		str += "    member this." + name.capitalizeFirstLetter() + " = " + name + "\n";
    }

    for (var name in this.jsonReader.floats){
		str += "    member this." + name.capitalizeFirstLetter() + " = " + name + "\n";
    }

    for (var name in this.jsonReader.bools){
		str += "    member this." + name.capitalizeFirstLetter() + " = " + name + "\n";
    }

    for (var name in this.jsonReader.strings){
		str += "    member this." + name.capitalizeFirstLetter() + " = " + name + "\n";
    }

    return str;
};

ToFsConverter.prototype.writeConstructor = function(){
	var str = " (";
	
	
	for (var name in this.jsonReader.integers){
		str +=  name +": int, ";
	}	

	for (var name in this.jsonReader.floats){
		str +=  name +": float, ";
	}	

	for (var name in this.jsonReader.bools){
		str +=  name +": bool, ";
	}	

	for (var name in this.jsonReader.strings){
		str +=  name +": string, ";
	}	

	for (var name in this.jsonReader.objects){
		str += name + ": " + this.jsonReader.objects[name].className + ", ";
	}

	for (var name in this.jsonReader.arrays){
		str += name + ": " +ToFsConverter.convertToSpecificName(this.jsonReader.arrays[name].type) + " list, "; 
	}
	str = str.substring(0, str.length - 2);
	
	str += ") =\n";
	
	return str;
};



ToFsConverter.prototype.writeNewClassBeginning = function(){
	return "type " + this.className;
};

ToFsConverter.prototype.writeClassEnding = function(){
	return "\n\n";
};


ToFsConverter.convertToSpecificName = function(str){
	switch (str){
		case "int":
			return "int";
		case "float": 
			return "float";
		case "boolean":
			return "bool";
		case "string":
			return "string";
		case "object":
			return "Object";
	}
	
	return str;
};

