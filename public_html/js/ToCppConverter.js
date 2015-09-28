'use strict';

function ToCppConverter(jsonReader, className){
	this.jsonReader = jsonReader;
	this.className = className;
	
	this.classString = this.writeNewClassBeginning();
	this.classString += this.writeConstructorHeader();
	this.classString += this.writePrimitiveGettersHeader();
	this.classString += this.writePrimitiveSettersHeader();
	this.classString += this.writeObjectGetSettersHeader();
	this.classString += this.writeArrayGetSettersHeader();
	this.classString += this.writePrimitiveProperties();
	this.classString += this.writeObjects();
	this.classString += this.writeArrays();
	this.classString += this.writeClassEnding();
	
	this.classString += this.writeConstructor();
	this.classString += this.writePrimitiveGetters();
	this.classString += this.writePrimitiveSetters();
	this.classString += this.writeObjectGetSetters();
	this.classString += this.writeArrayGetSetters();
};

ToCppConverter.writeClasses = function(){
	var str = "";
	for (var name in JsonClassReader.classes){
		str += new ToCppConverter(JsonClassReader.classes[name],name).classString;
		
	}
	
	
	return str;
};

ToCppConverter.prototype.writeObjects = function(){
	var str = "";
	for (var name in this.jsonReader.objects){
		str += "\tprivate " + this.jsonReader.objects[name].className + " " + name + ";\n";
	}
	
	return str;
};

ToCppConverter.prototype.writeArrays = function(){
	var str = "";
	for (var name in this.jsonReader.arrays){
		str += "\tvector<" + ToCppConverter.convertToSpecificName(this.jsonReader.arrays[name].type) + "> " + name +";\n";
	}
	
	return str;
};

ToCppConverter.prototype.writePrimitiveProperties = function(){
	var str = "private:\n";
	for (var name in this.jsonReader.integers){
		str += "\tint " + name + " = 0;\n";
	}
	
	for (var name in this.jsonReader.floats){
		str += "\tfloat " + name + " = 0.0;\n";
	}
	
	for (var name in this.jsonReader.bools){
		str += "\tbool " + name + " = false;\n";
	}
	
	for (var name in this.jsonReader.strings){
		str += "\tstring " + name + ';\n';
	}
	
	return str;
};

ToCppConverter.prototype.writeConstructorHeader = function(){
	var str	= "public: \n";
	str += "\t" + this.className + "();\n";
	str += "\tvirtual ~" + this.className + "();\n";
	
	return str;
};

ToCppConverter.prototype.writeConstructor = function(){
	var str	=  this.className + "::" + this.className + "(){\n";
	str += "\t\n";
	str += "}\n";
	
	str += this.className + "::~" + this.className + "(){\n";
	str += "\t\n";
	str += "}\n";
	
	return str;
};

ToCppConverter.prototype.writePrimitiveGettersHeader = function(){
	var str = "";
	for (var name in this.jsonReader.integers){
		str += "\tint get" + name.capitalizeFirstLetter() + "();\n";
	}
	
	for (var name in this.jsonReader.floats){
		str += "\tfloat get" + name.capitalizeFirstLetter() + "();\n";
	}
	
	for (var name in this.jsonReader.bools){
		str += "\tbool get" + name.capitalizeFirstLetter() + "();\n";
	}
	
	for (var name in this.jsonReader.strings){
		str += "\tstring& get" + name.capitalizeFirstLetter() + "();\n";
	}
	
	
	return str;
};

ToCppConverter.prototype.writePrimitiveGetters = function(){
	var str = "";
	for (var name in this.jsonReader.integers){
		str += "int " + this.className + "::get" + name.capitalizeFirstLetter() + "(){\n";
		str += "\treturn " + name + ";\n";
		str += "}\n";
	}
	
	for (var name in this.jsonReader.floats){
		str += "float " + this.className + "::get" + name.capitalizeFirstLetter() + "(){\n";
		str += "\treturn " + name + ";\n";
		str += "}\n";
	}
	
	for (var name in this.jsonReader.bools){
		str += "bool " + this.className + "::get" + name.capitalizeFirstLetter() + "(){\n";
		str += "\treturn " + name + ";\n";
		str += "}\n";
	}
	
	for (var name in this.jsonReader.strings){
		str += "string& " + this.className + "::get" + name.capitalizeFirstLetter() + "(){\n";
		str += "\treturn " + name + ";\n";
		str += "}\n";
	}
	
	
	return str;
};

ToCppConverter.prototype.writePrimitiveSettersHeader = function(){
	var str = "";
	for (var name in this.jsonReader.integers){
		str += "\tvoid set" + name.capitalizeFirstLetter() + "(int " + name +  ");\n";
	}
	
	for (var name in this.jsonReader.floats){
		str += "\tvoid set" + name.capitalizeFirstLetter() + "(float " + name +  ");\n";
	}
	
	for (var name in this.jsonReader.bools){
		str += "\tvoid set" + name.capitalizeFirstLetter() + "(bool " + name +  ");\n";
	}
	
	for (var name in this.jsonReader.strings){
		str += "\tvoid set" + name.capitalizeFirstLetter() + "(string& " + name +  ");\n";
	}
	
	return str;
};

ToCppConverter.prototype.writePrimitiveSetters = function(){
	var str = "";
	for (var name in this.jsonReader.integers){
		str += "void " + this.className + "::set" + name.capitalizeFirstLetter() + "(int "+ name + "){\n";
		str += "\tthis-> " + name + " = " + name + ";\n";
		str += "}\n";
	}
	
	for (var name in this.jsonReader.floats){
		str += "void " + this.className + "::set" + name.capitalizeFirstLetter() + "(float "+ name + "){\n";
		str += "\tthis-> " + name + " = " + name + ";\n";
		str += "}\n";
	}
	
	for (var name in this.jsonReader.bools){
		str += "void " + this.className + "::set" + name.capitalizeFirstLetter() + "(bool "+ name + "){\n";
		str += "\tthis-> " + name + " = " + name + ";\n";
		str += "}\n";
	}
	
	for (var name in this.jsonReader.strings){
		str += "void " + this.className + "::set" + name.capitalizeFirstLetter() + "(string& "+ name + "){\n";
		str += "\tthis-> " + name + " = " + name + ";\n";
		str += "}\n";
	}
	
	
	return str;
};

ToCppConverter.prototype.writeObjectGetSettersHeader = function(){
	var str = "";
	for (var name in this.jsonReader.objects){
		str += "\t" + this.jsonReader.objects[name].className + "& get" + name.capitalizeFirstLetter() + "();\n";
		
		str += "\tvoid set" + name.capitalizeFirstLetter()  + "(" + this.jsonReader.objects[name].className + "& " + name + ");\n";
		
	}
	
	return str;
	
};

ToCppConverter.prototype.writeObjectGetSetters = function(){
	var str = "";
	
	for (var name in this.jsonReader.objects){
		str += "void " + this.className + "::set" + name.capitalizeFirstLetter() + "("+ this.jsonReader.objects[name].className  + "& "+ name + "){\n";
		str += "\tthis-> " + name + " = " + name + ";\n";
		str += "}\n";
	}
	for (var name in this.jsonReader.objects){
		str += this.jsonReader.objects[name].className + "& " + this.className + "::get" + name.capitalizeFirstLetter() + "(){\n";
		str += "\treturn " + name + ";\n";
		str += "}\n";
	}
	
	return str;
};


ToCppConverter.prototype.writeArrayGetSettersHeader = function(){
	var str = "";
	for (var name in this.jsonReader.arrays){
		str += "\tvector<" + ToCppConverter.convertToSpecificName(this.jsonReader.arrays[name].type) + ">& get" + name.capitalizeFirstLetter()+ "(){\n";
	
		
		str += "\tvoid set" + name.capitalizeFirstLetter() + "(vector<" + ToCppConverter.convertToSpecificName(this.jsonReader.arrays[name].type) + ">& " + name + "){\n";
		
	}
	
	return str;
};

ToCppConverter.prototype.writeArrayGetSetters = function(){
	var str = "";
	
	for (var name in this.jsonReader.arrays){
		str += "void " + this.className + "::set" + name.capitalizeFirstLetter() + "(vector<"+ ToCppConverter.convertToSpecificName(this.jsonReader.arrays[name].type)  + ">& "+ name + "){\n";
		str += "\tthis-> " + name + " = " + name + ";\n";
		str += "}\n";
	}
	for (var name in this.jsonReader.arrays){
		str += "vector<" +ToCppConverter.convertToSpecificName(this.jsonReader.arrays[name].type) + ">& " + this.className + "::get" + name.capitalizeFirstLetter() + "(){\n";
		str += "\treturn " + name + ";\n";
		str += "}\n";
	}
	
	return str;
};

ToCppConverter.writeMain = function(){
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



ToCppConverter.prototype.writeNewClassBeginning = function(){
	
	var str = "#include <string>\n\n";

	str += "using std::string;\n\n";
	str += "class " + this.className + "{\n";
	return str;
};

ToCppConverter.prototype.writeClassEnding = function(){
	return "};\n";
};


ToCppConverter.convertToSpecificName = function(str){
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
			return "void*";
	}
	
	return str;
};

