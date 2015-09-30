'use strict';

function ToJavaConverter(jsonReader, className){
	this.jsonReader = jsonReader;
	this.className = className;
	
	this.javaString = this.writeNewClassBeginning();
	this.javaString += this.writePrimitiveProperties();
	this.javaString += this.writeObjects();
	this.javaString += this.writeArrays();
	this.javaString += this.writeConstructor();
	this.javaString += this.writePrimitiveGetters();
	this.javaString += this.writePrimitiveSetters();
	this.javaString += this.writeObjectGetSetters();
	this.javaString += this.writeArrayGetSetters();
	
	this.javaString += "}\n";
};

ToJavaConverter.writeClasses = function(){
	var str = "";
	for (var name in JsonClassReader.classes){
		str += new ToJavaConverter(JsonClassReader.classes[name],name).javaString;
		
	}
	
	
	return str;
};

ToJavaConverter.prototype.writeObjects = function(){
	var str = "";
	for (var name in this.jsonReader.objects){
		str += "\tprivate " + this.jsonReader.objects[name].className + " " + name + ";\n";
	}
	
	return str;
};

ToJavaConverter.prototype.writeArrays = function(){
	var str = "";
	for (var name in this.jsonReader.arrays){
		str += "\tprivate ArrayList<" + ToJavaConverter.convertToSpecificName(this.jsonReader.arrays[name].type) + "> " + name +
				" = new ArrayList<" + ToJavaConverter.convertToSpecificName(this.jsonReader.arrays[name].type) +  ">();\n";
	}
	
	return str;
};

ToJavaConverter.prototype.writePrimitiveProperties = function(){
	var str = "";
	for (var name in this.jsonReader.integers){
		str += "\tprivate int " + name + ";\n";
	}
	
	for (var name in this.jsonReader.floats){
		str += "\tprivate float " + name + ";\n";
	}
	
	for (var name in this.jsonReader.bools){
		str += "\tprivate boolean " + name + ";\n";
	}
	
	for (var name in this.jsonReader.strings){
		str += "\tprivate String " + name + ";\n";
	}
	
	return str;
};

ToJavaConverter.prototype.writeConstructor = function(){
	var str	= "\tpublic " + this.className + "(){\n";
	str += "\t\t\n";
	str += "\t}\n\n";
	
	str += "\tpublic " + this.className + "(";
	
	
	for (var name in this.jsonReader.integers){
		str += " int " + name + ",";
	}	

	for (var name in this.jsonReader.floats){
		str += " float " + name + ",";
	}	

	for (var name in this.jsonReader.bools){
		str += " boolean " + name + ",";
	}	

	for (var name in this.jsonReader.strings){
		str += " String " + name + ",";
	}	

	for (var name in this.jsonReader.objects){
		str += " " + this.jsonReader.objects[name].className + " " + name + ",";
	}

	for (var name in this.jsonReader.arrays){
		str += " ArrayList<" + ToJavaConverter.convertToSpecificName(this.jsonReader.arrays[name].type) + "> " + name + ","; 
	}
	str = str.substring(0, str.length - 1);
	
	str += "){\n";
	
	//insert body
	for (var name in this.jsonReader.integers){
		str += "\t\tthis." + name + " = " + name + ";\n";
	}	

	for (var name in this.jsonReader.floats){
		str += "\t\tthis." + name + " = " + name + ";\n";
	}	

	for (var name in this.jsonReader.bools){
		str += "\t\tthis." + name + " = " + name + ";\n";
	}	

	for (var name in this.jsonReader.strings){
		str += "\t\tthis." + name + " = " + name + ";\n";
	}	

	for (var name in this.jsonReader.objects){
		str += "\t\tthis." + name + " = " + name + ";\n";
	}

	for (var name in this.jsonReader.arrays){
		str += "\t\tthis." + name + " = " + name + ";\n";
	}
	
	
	str += "\t}\n\n";
	return str;
};

ToJavaConverter.prototype.writePrimitiveGetters = function(){
	var str = "";
	for (var name in this.jsonReader.integers){
		str += "\tpublic int get" + name.capitalizeFirstLetter() + "(){\n";
		str += "\t\treturn " + name + ";\n";
		str += "\t}\n";
	}
	
	for (var name in this.jsonReader.floats){
		str += "\tpublic float get" + name.capitalizeFirstLetter() + "(){\n";
		str += "\t\treturn " + name + ";\n";
		str += "\t}\n";
	}
	
	for (var name in this.jsonReader.bools){
		str += "\tpublic boolean is" + name.capitalizeFirstLetter() + "(){\n";
		str += "\t\treturn " + name + ";\n";
		str += "\t}\n";
	}
	
	for (var name in this.jsonReader.strings){
		str += "\tpublic String get" + name.capitalizeFirstLetter() + "(){\n";
		str += "\t\treturn " + name + ";\n";
		str += "\t}\n";
	}
	
	
	return str;
};

ToJavaConverter.prototype.writePrimitiveSetters = function(){
	var str = "";
	for (var name in this.jsonReader.integers){
		str += "\tpublic void set" + name.capitalizeFirstLetter() + "(int " + name +  "){\n";
		str += "\t\tthis." + name + " = " + name + ";\n";
		str += "\t}\n";
	}
	
	for (var name in this.jsonReader.floats){
		str += "\tpublic void set" + name.capitalizeFirstLetter() + "(float " + name +  "){\n";
		str += "\t\tthis." + name + " = " + name + ";\n";
		str += "\t}\n";
	}
	
	for (var name in this.jsonReader.bools){
		str += "\tpublic void set" + name.capitalizeFirstLetter() + "(boolean " + name +  "){\n";
		str += "\t\tthis." + name + " = " + name + ";\n";
		str += "\t}\n";
	}
	
	for (var name in this.jsonReader.strings){
		str += "\tpublic void set" + name.capitalizeFirstLetter() + "(String " + name +  "){\n";
		str += "\t\tthis." + name + " = " + name + ";\n";
		str += "\t}\n";
	}
	
	return str;
};

ToJavaConverter.prototype.writeObjectGetSetters = function(){
	var str = "";
	for (var name in this.jsonReader.objects){
		str += "\tpublic " + this.jsonReader.objects[name].className + " get" + name.capitalizeFirstLetter() + "(){\n";
		str += "\t\treturn " + name +";\n";
		str += "\t}\n";
		
		str += "\tpublic void set" + name.capitalizeFirstLetter()  + "(" + this.jsonReader.objects[name].className + " " + name + "){\n";
		str += "\t\tthis." + name + " = " + name + ";\n";
		str += "\t}\n";
	}
	
	return str;
	
};


ToJavaConverter.prototype.writeArrayGetSetters = function(){
	var str = "";
	for (var name in this.jsonReader.arrays){
		str += "\tpublic ArrayList<" + ToJavaConverter.convertToSpecificName(this.jsonReader.arrays[name].type) + "> get" + name.capitalizeFirstLetter()+ "(){\n";
		str += "\t\treturn " + name +";\n";
		str += "\t}\n";
		
		str += "\tpublic void set" + name.capitalizeFirstLetter() + "(ArrayList<" + ToJavaConverter.convertToSpecificName(this.jsonReader.arrays[name].type) + "> " + name + "){\n";
		str += "\t\tthis." + name + " = " + name + ";\n";
		str += "\t}\n";
	}
	
	return str;
};

ToJavaConverter.writeMain = function(){
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



ToJavaConverter.prototype.writeNewClassBeginning = function(){
	return "public class " + this.className + "{\n";
};

ToJavaConverter.prototype.writeClassEnding = function(){
	return "}";
};


ToJavaConverter.convertToSpecificName = function(str){
	switch (str){
		case "int":
			return "Integer";
		case "float": 
			return "Float";
		case "boolean":
			return "Boolean";
		case "string":
			return "String";
		case "object":
			return "Object";
	}
	
	return str;
};

