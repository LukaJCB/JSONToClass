'use strict';

function ToGroovyConverter(jsonReader, className){
	this.jsonReader = jsonReader;
	this.className = className;
	
	this.classString = this.writeNewClassBeginning();
	this.classString += this.writePrimitiveProperties();
	this.classString += this.writeObjects();
	this.classString += this.writeArrays();
	
	this.classString += this.writeClassEnding();
};

ToGroovyConverter.writeClasses = function(){
	var str = "";
	for (var name in JsonClassReader.classes){
		str += new ToGroovyConverter(JsonClassReader.classes[name],name).classString;
		
	}
	
	return str;
};

ToGroovyConverter.prototype.writeObjects = function(){
	var str = "";
	for (var name in this.jsonReader.objects){
		str += "\tdef " + name + "\n";
	}
	
	return str;
};

ToGroovyConverter.prototype.writeArrays = function(){
    var str = "";
    for (var name in this.jsonReader.arrays){
       str += "\tdef " + name + " = []\n";
	}

    return str;
};

ToGroovyConverter.prototype.writePrimitiveProperties = function(){
    var str = "";
    for (var name in this.jsonReader.integers){
		str += "\tdef " + name + "\n";
    }

    for (var name in this.jsonReader.floats){
		str += "\tdef " + name + "\n";
    }

    for (var name in this.jsonReader.bools){
		str += "\tdef " + name + "\n";
    }

    for (var name in this.jsonReader.strings){
		str += "\tdef " + name + "\n";
    }

    return str;
};




ToGroovyConverter.prototype.writeNewClassBeginning = function(){
	return "class " + this.className + "{\n";
};

ToGroovyConverter.prototype.writeClassEnding = function(){
	return "}\n";
};




