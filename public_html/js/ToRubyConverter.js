'use strict';

function ToRubyConverter(jsonReader, className){
	this.jsonReader = jsonReader;
	this.className = className;
	
	this.classString = this.writeNewClassBeginning();
	this.classString += this.writePrimitiveProperties();
	this.classString += this.writeObjects();
	this.classString += this.writeArrays();
	this.classString += this.writeConstructor();
	
	this.classString += this.writeClassEnding();
};

ToRubyConverter.writeClasses = function(){
	var str = "";
	for (var name in JsonClassReader.classes){
		str += new ToRubyConverter(JsonClassReader.classes[name],name).classString;
		
	}
	
	return str;
};

ToRubyConverter.prototype.writeObjects = function(){
	var str = "";
	for (var name in this.jsonReader.objects){
		str += "\tattr_accessor :" + name + "\n";
	}
	
	return str;
};

ToRubyConverter.prototype.writeArrays = function(){
    var str = "";
    for (var name in this.jsonReader.arrays){
        str += "\tattr_accessor :" + name + "\n";
	}
    return str;
};

ToRubyConverter.prototype.writePrimitiveProperties = function(){
    var str = "";
    for (var name in this.jsonReader.integers){
		str += "\tattr_accessor :" + name + "\n";
    }

    for (var name in this.jsonReader.floats){
		str += "\tattr_accessor :" + name + "\n";
    }

    for (var name in this.jsonReader.bools){
		str += "\tattr_accessor :" + name + "\n";
    }

    for (var name in this.jsonReader.strings){
		str += "\tattr_accessor :" + name + "\n";
    }

    return str;
};

ToRubyConverter.prototype.writeConstructor = function(){
    var str	= "\tdef initialize()\n";
	str += "\t\t\n";
	str += "\tend\n\n";
	
	str += "\tdef initialize(";
	
	
	for (var name in this.jsonReader.integers){
		str += " " + name + ",";
	}	

	for (var name in this.jsonReader.floats){
		str += " " + name + ",";
	}	

	for (var name in this.jsonReader.bools){
		str += " boolean " + name + ",";
	}	

	for (var name in this.jsonReader.strings){
		str += " " + name + ",";
	}	

	for (var name in this.jsonReader.objects){
		str += " " + name + ",";
	}

	for (var name in this.jsonReader.arrays){
		str += " " + name + ",";
	}
	str = str.substring(0, str.length - 1);
	
	str += ")\n";
	
	//insert body
	for (var name in this.jsonReader.integers){
		str += "\t\t@" + name + " = " + name + "\n";
	}	

	for (var name in this.jsonReader.floats){
		str += "\t\t@" + name + " = " + name + "\n";
	}	

	for (var name in this.jsonReader.bools){
		str += "\t\t@" + name + " = " + name + "\n";
	}	

	for (var name in this.jsonReader.strings){
		str += "\t\t@" + name + " = " + name + "\n";
	}	

	for (var name in this.jsonReader.objects){
		str += "\t\t@" + name + " = " + name + "\n";
	}

	for (var name in this.jsonReader.arrays){
		str += "\t\t@" + name + " = " + name + "\n";
	}
	
	
	str += "\tend\n\n";
	return str;
};





ToRubyConverter.prototype.writeNewClassBeginning = function(){
	var str = JsonClassReader.fileSeperator;
	return str += "class " + this.className + "\n";
};

ToRubyConverter.prototype.writeClassEnding = function(){
	return "end\n\n";
};


