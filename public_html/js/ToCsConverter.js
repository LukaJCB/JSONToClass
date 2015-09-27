'use strict';

function ToCsConverter(jsonReader, className){
	this.jsonReader = jsonReader;
	this.className = className;
	
	this.classString = this.writeNewClassBeginning();
	this.classString += this.writePrimitiveProperties();
	this.classString += this.writeObjects();
	this.classString += this.writeArrays();
	this.classString += this.writeConstructor();
	
	this.classString += "}\n";
};

ToCsConverter.writeClasses = function(){
	var str = "";
	for (var name in JsonClassReader.classes){
		str += new ToCsConverter(JsonClassReader.classes[name],name).classString;
		
	}
	
	return str;
};

ToCsConverter.prototype.writeObjects = function(){
	var str = "";
	for (var name in this.jsonReader.objects){
		str += "\tpublic " + this.jsonReader.objects[name].className + " " + name + " { get; set; };\n";
	}
	
	return str;
};

ToCsConverter.prototype.writeArrays = function(){
    var str = "";
    for (var name in this.jsonReader.arrays){
        str += "\tpublic List<" + ToCsConverter.convertToSpecificName(this.jsonReader.arrays[name].type) + "> " + name + "{ get; set; }"
			+ " = new List<" + ToCsConverter.convertToSpecificName(this.jsonReader.arrays[name].type) +  ">() ;\n";
    }

    return str;
};

ToCsConverter.prototype.writePrimitiveProperties = function(){
    var str = "";
    for (var name in this.jsonReader.integers){
		str += "\tpublic int " + name + " { get; set; };\n";
    }

    for (var name in this.jsonReader.floats){
		str += "\tpublic int " + name + " { get; set; };\n";
    }

    for (var name in this.jsonReader.bools){
		str += "\tpublic int " + name + " { get; set; };\n";
    }

    for (var name in this.jsonReader.strings){
		str += "\tpublic int " + name + " { get; set; };\n";
    }

    return str;
};

ToCsConverter.prototype.writeConstructor = function(){
    var str	= "\tpublic " + this.className + "(){\n";
    str += "\t\t\n";
    str += "\t}\n";

    return str;
};


ToCsConverter.writeMain = function(){
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



ToCsConverter.prototype.writeNewClassBeginning = function(){
	return "public class " + this.className + "{\n";
};

ToCsConverter.prototype.writeClassEnding = function(){
	return "}";
};


ToCsConverter.convertToSpecificName = function(str){
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

