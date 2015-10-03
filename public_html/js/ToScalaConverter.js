'use strict';

function ToScalaConverter(jsonReader, className){
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

ToScalaConverter.writeClasses = function(){
	var str = "";
	for (var name in JsonClassReader.classes){
		str += new ToScalaConverter(JsonClassReader.classes[name],name).classString;
		
	}
	
	return str;
};

ToScalaConverter.prototype.writeObjects = function(){
	var str = "";
	for (var name in this.jsonReader.objects){
		str += "\tprivate var _" + name + ": " + this.jsonReader.objects[name].className + " = _\n";
	}
	
	return str;
};

ToScalaConverter.prototype.writeArrays = function(){
    var str = "";
    for (var name in this.jsonReader.arrays){
        str += "\tprivate var _" + name + "= ArrayBuffer[" + ToScalaConverter.convertToSpecificName(this.jsonReader.arrays[name].type) + "]()\n";
    }

    return str;
};

ToScalaConverter.prototype.writePrimitiveProperties = function(){
    var str = "";
    for (var name in this.jsonReader.integers){
		str += "\tprivate var _" + name + ": Int = _\n";
    }

    for (var name in this.jsonReader.floats){
		str += "\tprivate var _" + name + ": Float = _\n";
    }

    for (var name in this.jsonReader.bools){
		str += "\tprivate var _" + name + ": Boolean = _\n";
    }

    for (var name in this.jsonReader.strings){
		str += "\tprivate var _" + name + ": String = _\n";
    }

    return str;
};

ToScalaConverter.prototype.writeGetters = function(){
	var str = "";
    for (var name in this.jsonReader.integers){
		str += "\tdef " + name + " = _" + name + "\n";
    }

    for (var name in this.jsonReader.floats){
		str += "\tdef " + name + " = _" + name + "\n";
    }

    for (var name in this.jsonReader.bools){
		str += "\tdef " + name + " = _" + name + "\n";
    }

    for (var name in this.jsonReader.strings){
		str += "\tdef " + name + " = _" + name + "\n";
    }
	
	for (var name in this.jsonReader.objects){
		str += "\tdef " + name + " = _" + name + "\n";
	}

	for (var name in this.jsonReader.arrays){
        str += "\tdef " + name + " = _" + name + "\n";
    }

    return str;
};

ToScalaConverter.prototype.writeSetters = function(){
	var str = "";
    for (var name in this.jsonReader.integers){
		str += "\tdef " + name + "_= (value:Int):Unit = _" + name + "= value\n";
    }

    for (var name in this.jsonReader.floats){
		str += "\tdef " + name + "_= (value:Float):Unit = _" + name + "= value\n";
    }

    for (var name in this.jsonReader.bools){
		str += "\tdef " + name + "_= (value:Boolean):Unit = _" + name + "= value\n";
    }

    for (var name in this.jsonReader.strings){
		str += "\tdef " + name + "_= (value:String):Unit = _" + name + "= value\n";
    }
	
	for (var name in this.jsonReader.objects){
		str += "\tdef " + name + "_= (value:" + this.jsonReader.objects[name].className + "):Unit = _" + name + "= value\n";
	}

	for (var name in this.jsonReader.arrays){
       str += "\tdef " + name + "_= (value:ArrayBuffer[" + ToScalaConverter.convertToSpecificName(this.jsonReader.arrays[name].type)+"]):Unit = _" + name + "= value\n";
    }

    return str;
};

ToScalaConverter.prototype.writeConstructor = function(){
    var str = "\tdef this(";
	
	
	for (var name in this.jsonReader.integers){
		str += " " + name + ": Int,";
	}	

	for (var name in this.jsonReader.floats){
		str += " " + name + ": Float,";
	}	

	for (var name in this.jsonReader.bools){
		str +=" " +  name + ": Bool,";
	}	

	for (var name in this.jsonReader.strings){
		str += " " + name + ": String,";
	}	

	for (var name in this.jsonReader.objects){
		str += " " + name + ": " + this.jsonReader.objects[name].className + ",";
	}

	for (var name in this.jsonReader.arrays){
		str += " " + name + ": ArrayBuffer[" + ToScalaConverter.convertToSpecificName(this.jsonReader.arrays[name].type) + "],"; 
	}
	str = str.substring(0, str.length - 1);
	
	str += ") = {\n\t\tthis()\n";
	
	//insert body
	for (var name in this.jsonReader.integers){
		str += "\t\tthis." + name + " = " + name + "\n";
	}	

	for (var name in this.jsonReader.floats){
		str += "\t\tthis." + name + " = " + name + "\n";
	}	

	for (var name in this.jsonReader.bools){
		str += "\t\tthis." + name + " = " + name + "\n";
	}	

	for (var name in this.jsonReader.strings){
		str += "\t\tthis." + name + " = " + name + "\n";
	}	

	for (var name in this.jsonReader.objects){
		str += "\t\tthis." + name + " = " + name + "\n";
	}

	for (var name in this.jsonReader.arrays){
		str += "\t\tthis." + name + " = " + name + "\n";
	}
	
	
	str += "\t}\n\n";

    return str;
};


ToScalaConverter.writeMain = function(){
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



ToScalaConverter.prototype.writeNewClassBeginning = function(){
	return "class " + this.className + "(){\n";
};

ToScalaConverter.prototype.writeClassEnding = function(){
	return "}\n\n";
};


ToScalaConverter.convertToSpecificName = function(str){
	switch (str){
		case "int":
			return "Int";
		case "float": 
			return "Float";
		case "boolean":
			return "Boolean";
		case "string":
			return "String";
		case "object":
			return "Any";
	}
	
	return str;
};


