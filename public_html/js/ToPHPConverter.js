'use strict';

function ToPHPConverter(jsonReader, className){
	this.jsonReader = jsonReader;
	this.className = className;
	
	this.classString = this.writeNewClassBeginning();
	this.classString += this.writePrimitiveProperties();
	this.classString += this.writeObjects();
	this.classString += this.writeArrays();
	this.classString += this.writeConstructor();
	this.classString += this.writeGetters();
	this.classString += this.writeSetters();
	
	this.classString += this.writeClassEnding();
};

ToPHPConverter.writeClasses = function(){
	var str = "";
	for (var name in JsonClassReader.classes){
		str += new ToPHPConverter(JsonClassReader.classes[name],name).classString;
		
	}
	
	
	return str;
};

ToPHPConverter.prototype.writeObjects = function(){
	var str = "";
	for (var name in this.jsonReader.objects){
		str += "\tprivate $" + name + ";\n";
	}
	
	return str;
};

ToPHPConverter.prototype.writeArrays = function(){
	var str = "";
	for (var name in this.jsonReader.arrays){
		str += "\tprivate $" + name + ";\n";
	}
	
	return str;
};

ToPHPConverter.prototype.writePrimitiveProperties = function(){
	var str = "";
	for (var name in this.jsonReader.integers){
		str += "\tprivate $" + name + ";\n";
	}
	
	for (var name in this.jsonReader.floats){
		str += "\tprivate $" + name + ";\n";
	}
	
	for (var name in this.jsonReader.bools){
		str += "\tprivate $" + name + ";\n";
	}
	
	for (var name in this.jsonReader.strings){
		str += "\tprivate $" + name + ";\n";
	}
	
	return str;
};

ToPHPConverter.prototype.writeConstructor = function(){
	
	
	var str	= "\tfunction " + this.className + "(";
	
	for (var name in this.jsonReader.integers){
		str += " $" + name + ","; 
	}	

	for (var name in this.jsonReader.floats){
		str += " $" + name + ","; 
	}	

	for (var name in this.jsonReader.bools){
		str += " $" + name + ","; 
	}	

	for (var name in this.jsonReader.strings){
		str += " $" + name + ","; 
	}	

	for (var name in this.jsonReader.objects){
		str += " $" + name + ","; 
	}

	for (var name in this.jsonReader.arrays){
		str += " $" + name + ","; 
	}
	str = str.substring(0, str.length - 1);
	
	str += "){\n";
	
	for (var name in this.jsonReader.integers){
		str += "\t\t$this->" + name + " = $" + name + ";\n";
	}	

	for (var name in this.jsonReader.floats){
		str += "\t\t$this->" + name + " = $" + name + ";\n";
	}	

	for (var name in this.jsonReader.bools){
		str += "\t\t$this->" + name + " = $" + name + ";\n";
	}	

	for (var name in this.jsonReader.strings){
		str += "\t\t$this->" + name + " = $" + name + ";\n";
	}	

	for (var name in this.jsonReader.objects){
		str += "\t\t$this->" + name + " = $" + name + ";\n";
	}

	for (var name in this.jsonReader.arrays){
		str += "\t\t$this->" + name + " = $" + name + ";\n";
	}
	
	
	str += "\t\t\n";
	str += "\t}\n";
	
	return str;
};

ToPHPConverter.prototype.writeGetters = function(){
	var str = "\tpublic function __get($property){\n";
	str += "\t\tif (property_exists($this,$property)){\n";
	str += "\t\t\treturn $this->$property;\n";
	str += "\t\t}\n";
	str += "\t}\n";
	
	return str;
};

ToPHPConverter.prototype.writeSetters = function(){
	var str = "\tpublic function __set($property,$value){\n";
	str += "\t\tif (property_exists($this,$property)){\n";
	str += "\t\t\t$this->$property = $value;\n";
	str += "\t\t}\n";
	str += "\t\treturn $this;\n";
	str += "\t}\n";
	
	return str;
};


ToPHPConverter.writeMain = function(){
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



ToPHPConverter.prototype.writeNewClassBeginning = function(){
	return "<?php\nclass " + this.className + "{\n";
};

ToPHPConverter.prototype.writeClassEnding = function(){
	return "}\n\n";
};




