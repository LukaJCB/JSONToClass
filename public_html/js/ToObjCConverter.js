'use strict';

function ToObjCConverter(jsonReader, className){
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
	this.classString += this.writeClassHeaderEnding();
	
	this.classString += this.writeConstructor();
	this.classString += this.writePrimitiveGetters();
	this.classString += this.writePrimitiveSetters();
	this.classString += this.writeObjectGetSetters();
	this.classString += this.writeArrayGetSetters();
};

ToObjCConverter.writeClasses = function(){
	var str = "";
	for (var name in JsonClassReader.classes){
		str += new ToObjCConverter(JsonClassReader.classes[name],name).classString;
		
	}
	
	
	return str;
};

ToObjCConverter.prototype.writeObjects = function(){
	var str = "";
	for (var name in this.jsonReader.objects){
		str += "\tprivate " + this.jsonReader.objects[name].className + " " + name + ";\n";
	}
	
	return str;
};

ToObjCConverter.prototype.writeArrays = function(){
	var str = "";
	for (var name in this.jsonReader.arrays){
		str += "\tvector<" + ToObjCConverter.convertToSpecificName(this.jsonReader.arrays[name].type) + "> " + name +";\n";
	}
	
	return str;
};

ToObjCConverter.prototype.writePrimitiveProperties = function(){
	var str = "";
	for (var name in this.jsonReader.integers){
		str += "\tint" + name + ";\n";
	}
	
	for (var name in this.jsonReader.floats){
		str += "\tfloat " + name + ";\n";
	}
	
	for (var name in this.jsonReader.bools){
		str += "\tbool " + name + ";\n";
	}
	
	for (var name in this.jsonReader.strings){
		str += "\tNSString *" + name + ';\n';
	}
	
	return str;
};

ToObjCConverter.prototype.writeConstructorHeader = function(){
	var str	= "public: \n";
	str += "\t" + this.className + "();\n";
	str += "\t" + this.className + "(";
	
	
	for (var name in this.jsonReader.integers){
		str += " int " + name + ",";
	}	

	for (var name in this.jsonReader.floats){
		str += " float " + name + ",";
	}	

	for (var name in this.jsonReader.bools){
		str += " bool " + name + ",";
	}	

	for (var name in this.jsonReader.strings){
		str += " string& " + name + ",";
	}	

	for (var name in this.jsonReader.objects){
		str += " " + this.jsonReader.objects[name].className + "& " + name + ",";
	}

	for (var name in this.jsonReader.arrays){
		str += " vector<" + ToObjCConverter.convertToSpecificName(this.jsonReader.arrays[name].type) + ">& " + name + ","; 
	}
	str = str.substring(0, str.length - 1);
	
	str += ");\n";
	
	str += "\tvirtual ~" + this.className + "();\n";
	
	
	return str;
};

ToObjCConverter.prototype.writeConstructor = function(){
	var str	=  this.className + "::" + this.className + "(){\n";
	str += "}\n\n";
	
	str += this.className + "::"+ this.className + "(";
	
	
	for (var name in this.jsonReader.integers){
		str += " int " + name + ",";
	}	

	for (var name in this.jsonReader.floats){
		str += " float " + name + ",";
	}	

	for (var name in this.jsonReader.bools){
		str += " bool " + name + ",";
	}	

	for (var name in this.jsonReader.strings){
		str += " string& " + name + ",";
	}	

	for (var name in this.jsonReader.objects){
		str += " " + this.jsonReader.objects[name].className + "& " + name + ",";
	}

	for (var name in this.jsonReader.arrays){
		str += " vector<" + ToObjCConverter.convertToSpecificName(this.jsonReader.arrays[name].type) + ">& " + name + ","; 
	}
	str = str.substring(0, str.length - 1);
	
	str += "): ";
	
	//insert body
	for (var name in this.jsonReader.integers){
		str +=  name + " (" + name + ")" + ", ";
	}	

	for (var name in this.jsonReader.floats){
		str +=  name + " (" + name + ")" + ", ";
	}	

	for (var name in this.jsonReader.bools){
		str +=  name + " (" + name + ")" + ", ";
	}	

	for (var name in this.jsonReader.strings){
		str +=  name + " (" + name + ")" + ", ";
	}	

	for (var name in this.jsonReader.objects){
		str +=  name + " (" + name + ")" + ", ";
	}

	for (var name in this.jsonReader.arrays){
		str +=  name + " (" + name + ")" + ", ";
	}
	str = str.substring(0, str.length - 2);
	
	str += "{\n\n";
	str += "\t\n";
	str += "}\n";
	
	str += this.className + "::~" + this.className + "(){\n";
	str += "\t\n";
	str += "}\n";
	
	return str;
};

ToObjCConverter.prototype.writePrimitiveGettersHeader = function(){
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

ToObjCConverter.prototype.writePrimitiveGetters = function(){
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

ToObjCConverter.prototype.writePrimitiveSettersHeader = function(){
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

ToObjCConverter.prototype.writePrimitiveSetters = function(){
	var str = "";
	for (var name in this.jsonReader.integers){
		str += "void " + this.className + "::set" + name.capitalizeFirstLetter() + "(int "+ name + "){\n";
		str += "\tthis->" + name + " = " + name + ";\n";
		str += "}\n";
	}
	
	for (var name in this.jsonReader.floats){
		str += "void " + this.className + "::set" + name.capitalizeFirstLetter() + "(float "+ name + "){\n";
		str += "\tthis->" + name + " = " + name + ";\n";
		str += "}\n";
	}
	
	for (var name in this.jsonReader.bools){
		str += "void " + this.className + "::set" + name.capitalizeFirstLetter() + "(bool "+ name + "){\n";
		str += "\tthis->" + name + " = " + name + ";\n";
		str += "}\n";
	}
	
	for (var name in this.jsonReader.strings){
		str += "void " + this.className + "::set" + name.capitalizeFirstLetter() + "(string& "+ name + "){\n";
		str += "\tthis->" + name + " = " + name + ";\n";
		str += "}\n";
	}
	
	
	return str;
};

ToObjCConverter.prototype.writeObjectGetSettersHeader = function(){
	var str = "";
	for (var name in this.jsonReader.objects){
		str += "\t" + this.jsonReader.objects[name].className + "& get" + name.capitalizeFirstLetter() + "();\n";
		
		str += "\tvoid set" + name.capitalizeFirstLetter()  + "(" + this.jsonReader.objects[name].className + "& " + name + ");\n";
		
	}
	
	return str;
	
};

ToObjCConverter.prototype.writeObjectGetSetters = function(){
	var str = "";
	
	for (var name in this.jsonReader.objects){
		str += "void " + this.className + "::set" + name.capitalizeFirstLetter() + "("+ this.jsonReader.objects[name].className  + "& "+ name + "){\n";
		str += "\tthis->" + name + " = " + name + ";\n";
		str += "}\n";
	}
	for (var name in this.jsonReader.objects){
		str += this.jsonReader.objects[name].className + "& " + this.className + "::get" + name.capitalizeFirstLetter() + "(){\n";
		str += "\treturn " + name + ";\n";
		str += "}\n";
	}
	
	return str;
};


ToObjCConverter.prototype.writeArrayGetSettersHeader = function(){
	var str = "";
	for (var name in this.jsonReader.arrays){
		str += "\tvector<" + ToObjCConverter.convertToSpecificName(this.jsonReader.arrays[name].type) + ">& get" + name.capitalizeFirstLetter()+ "(){\n";
	
		
		str += "\tvoid set" + name.capitalizeFirstLetter() + "(vector<" + ToObjCConverter.convertToSpecificName(this.jsonReader.arrays[name].type) + ">& " + name + "){\n";
		
	}
	
	return str;
};

ToObjCConverter.prototype.writeArrayGetSetters = function(){
	var str = "";
	
	for (var name in this.jsonReader.arrays){
		str += "void " + this.className + "::set" + name.capitalizeFirstLetter() + "(vector<"+ ToObjCConverter.convertToSpecificName(this.jsonReader.arrays[name].type)  + ">& "+ name + "){\n";
		str += "\tthis->" + name + " = " + name + ";\n";
		str += "}\n";
	}
	for (var name in this.jsonReader.arrays){
		str += "vector<" +ToObjCConverter.convertToSpecificName(this.jsonReader.arrays[name].type) + ">& " + this.className + "::get" + name.capitalizeFirstLetter() + "(){\n";
		str += "\treturn " + name + ";\n";
		str += "}\n";
	}
	
	return str;
};

ToObjCConverter.writeMain = function(){
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



ToObjCConverter.prototype.writeNewClassBeginning = function(){
	
	var str = "@interface " + this.className + " : NSObject\n";
	return str;
};

ToObjCConverter.prototype.writeClassHeaderEnding = function(){
	return "@end\n";
};


ToObjCConverter.convertToSpecificName = function(str){
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

