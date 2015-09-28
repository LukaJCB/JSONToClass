'use strict';

function ToSwiftConverter(jsonReader, className){
	this.jsonReader = jsonReader;
	this.className = className;
	
	this.classString = this.writeNewClassBeginning();
	this.classString += this.writePrimitiveProperties();
	this.classString += this.writeObjects();
	this.classString += this.writeArrays();
	this.classString += this.writeConstructor();
	
	this.classString += "}\n";
};

ToSwiftConverter.writeClasses = function(){
	var str = "";
	for (var name in JsonClassReader.classes){
		str += new ToSwiftConverter(JsonClassReader.classes[name],name).classString;
		
	}
	
	return str;
};

ToSwiftConverter.prototype.writeObjects = function(){
	var str = "";
	for (var name in this.jsonReader.objects){
		str += "\tpublic var " + name + ": " + this.jsonReader.objects[name].className + "\n";
	}
	
	return str;
};

ToSwiftConverter.prototype.writeArrays = function(){
    var str = "";
    for (var name in this.jsonReader.arrays){
        str += "\tpublic var " + name + ": [" + ToSwiftConverter.convertToSpecificName(this.jsonReader.arrays[name].type) + "] = []\n";
    }

    return str;
};

ToSwiftConverter.prototype.writePrimitiveProperties = function(){
    var str = "";
    for (var name in this.jsonReader.integers){
		str += "\tpublic var " + name + ": Int\n";
    }

    for (var name in this.jsonReader.floats){
		str += "\tpublic var " + name + ": Float\n";
    }

    for (var name in this.jsonReader.bools){
		str += "\tpublic var " + name + ": Bool\n";
    }

    for (var name in this.jsonReader.strings){
		str += "\tpublic var " + name + ": String\n";
    }

    return str;
};

ToSwiftConverter.prototype.writeConstructor = function(){
    var str	= "\tpublic init(){\n";
    str += "\t\t\n";
    str += "\t}\n";

    return str;
};


ToSwiftConverter.writeMain = function(){
    var str = "\tpublic static void Main(String[] args){\n";
    str += "\t\t" + this.className + " obj = new " + this.className + "();\n";

    for (var name in this.jsonReader.integers){
	    str += "\t\tobj.set" + name.capitalizeFirstLetter() + "(" + this.jsonReader.integers[name] +  ");\n";
    }

    for (var name in this.jsonReader.floats){
	    str += "\t\tobj.set" + name.capitalizeFirstLetter() + "(" + this.jsonReader.floats[name] +  "f);\n";
    }

    for (var name in this.jsonReader.bools){
	    str += "\t\tobj.set" + name.capitalizeFirstLetter() + "( " + this.jsonReader.bools[name] +  ");\n";
    }

    for (var name in this.jsonReader.strings){
	    str += "\t\tobj.set" + name.capitalizeFirstLetter() + '("' + this.jsonReader.strings[name] +  '");\n';
    }

    str += "\t}\n";

    return str;
};



ToSwiftConverter.prototype.writeNewClassBeginning = function(){
	return "public class " + this.className + "{\n";
};

ToSwiftConverter.prototype.writeClassEnding = function(){
	return "}";
};


ToSwiftConverter.convertToSpecificName = function(str){
	switch (str){
		case "int":
			return "Int";
		case "float": 
			return "Float";
		case "boolean":
			return "Bool";
		case "string":
			return "String";
		case "object":
			return "Any";
	}
	
	return str;
};


