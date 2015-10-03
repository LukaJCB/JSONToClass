'use strict';

function ToPythonConverter(jsonReader, className){
	this.jsonReader = jsonReader;
	this.className = className;
	
	this.classString = this.writeNewClassBeginning();
	this.classString += this.writePrimitiveProperties();
	this.classString += this.writeObjects();
	this.classString += this.writeArrays();
	this.classString += this.writeConstructor();
	this.classString += this.writeSetters();
	
	this.classString += this.writeClassEnding();
};

ToPythonConverter.writeClasses = function(){
	var str = "";
	for (var name in JsonClassReader.classes){
		str += new ToPythonConverter(JsonClassReader.classes[name],name).classString;
		
	}
	
	
	return str;
};

ToPythonConverter.prototype.writeObjects = function(){
	var str = "";
	for (var name in this.jsonReader.objects){
		str += "\t@property\n";
		str += "\tdef " + name + "(self):\n";
		str += "\t\treturn self.__" + name + "\n";
		str += "\n";
	}
	
	return str;
};

ToPythonConverter.prototype.writeArrays = function(){
	var str = "";
	for (var name in this.jsonReader.arrays){
		str += "\t@property\n";
		str += "\tdef " + name + "(self):\n";
		str += "\t\treturn self.__" + name + "\n";
		str += "\n";
	}
	
	return str;
};

ToPythonConverter.prototype.writePrimitiveProperties = function(){
	var str = "";
	for (var name in this.jsonReader.integers){
		str += "\t@property\n";
		str += "\tdef " + name + "(self):\n";
		str += "\t\treturn self.__" + name + "\n";
		str += "\n";
	}
	
	for (var name in this.jsonReader.floats){
		str += "\t@property\n";
		str += "\tdef " + name + "(self):\n";
		str += "\t\treturn self.__" + name + "\n";
		str += "\n";
	}
	
	for (var name in this.jsonReader.bools){
		str += "\t@property\n";
		str += "\tdef " + name + "(self):\n";
		str += "\t\treturn self.__" + name + "\n";
		str += "\n";
	}
	
	for (var name in this.jsonReader.strings){
		str += "\t@property\n";
		str += "\tdef " + name + "(self):\n";
		str += "\t\treturn self.__" + name + "\n";
		str += "\n";
	}
	
	
	return str;
};

ToPythonConverter.prototype.writeConstructor = function(){
	var str	= "\tdef __init__(self	):\n";
	str += "\t\t\n";
	str += "\n";
	
	//TODO
	return "\n";
};

ToPythonConverter.prototype.writeSetters = function(){
	var str = "";
	for (var name in this.jsonReader.integers){
		str += "\t@" + name + ".setter\n";
		str += "\tdef " + name + "(self, " + name + "):\n"; 
		str += "\t\tself.__" + name + " = " + name + "\n";
		str += "\n";
	}
	
	for (var name in this.jsonReader.floats){
		str += "\t@" + name + ".setter\n";
		str += "\tdef " + name + "(self, " + name + "):\n"; 
		str += "\t\tself.__" + name + " = " + name + "\n";
		str += "\n";
	}
	
	for (var name in this.jsonReader.bools){
		str += "\t@" + name + ".setter\n";
		str += "\tdef " + name + "(self, " + name + "):\n"; 
		str += "\t\tself.__" + name + " = " + name + "\n";
		str += "\n";
	}
	
	for (var name in this.jsonReader.strings){
		str += "\t@" + name + ".setter\n";
		str += "\tdef " + name + "(self, " + name + "):\n"; 
		str += "\t\tself.__" + name + " = " + name + "\n";
		str += "\n";
	}
	
	for (var name in this.jsonReader.arrays){
		str += "\t@" + name + ".setter\n";
		str += "\tdef " + name + "(self, " + name + "):\n"; 
		str += "\t\tself.__" + name + " = " + name + "\n";
		str += "\n";
	}
	
	for (var name in this.jsonReader.objects){
		str += "\t@" + name + ".setter\n";
		str += "\tdef " + name + "(self, " + name + "):\n"; 
		str += "\t\tself.__" + name + " = " + name + "\n";
		str += "\n";
	}
	
	return str;
};



ToPythonConverter.writeMain = function(){
	var str = "\tpublic static void main(String[] args){\n";
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



ToPythonConverter.prototype.writeNewClassBeginning = function(){
	return "class " + this.className + ":\n";
};

ToPythonConverter.prototype.writeClassEnding = function(){
	return "\n\n";
};







