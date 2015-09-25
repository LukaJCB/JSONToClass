'use strict';

function ToJavaConverter(jsonReader, className){
	this.jsonReader = jsonReader;
	this.className = className;
	
	this.javaString = this.writeNewClassBeginning(className);
	this.javaString += this.writePrimitiveProperties();
	this.javaString += this.writePrimitiveGetters();
	this.javaString += this.writePrimitiveSetters();
	this.javaString += this.writeMain();
	
	this.javaString += "}";
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
		str += "\tpublic bool is" + name.capitalizeFirstLetter() + "(){\n";
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

ToJavaConverter.prototype.writeMain = function(){
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


ToJavaConverter.prototype.writeNewClassBeginning = function(className){
	return "public class " + className + "{\n";
};

ToJavaConverter.prototype.writeClassEnding = function(){
	return "}";
};


