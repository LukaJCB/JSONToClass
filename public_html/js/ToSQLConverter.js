'use strict';

function ToSQLConverter(jsonReader, className){
	this.jsonReader = jsonReader;
	this.className = className;
	
	this.classString = this.writeNewClassBeginning();
	this.classString += this.writePrimitiveProperties();
	this.classString += this.writeObjects();
	this.writeArrays();
	this.classString += this.writeConstraints();
	
	this.classString += this.writeClassEnding();
};

ToSQLConverter.writeClasses = function(){
	var str = "";
	for (var name in JsonClassReader.classes){
		str += new ToSQLConverter(JsonClassReader.classes[name],name).classString;
		JsonClassReader.classes[name].done = true;
	}
	for (var name in JsonClassReader.classes){
		if (!(JsonClassReader.classes[name].done)){
			str += new ToSQLConverter(JsonClassReader.classes[name],name).classString;
		}
	}
	
	
	return str;
};

ToSQLConverter.prototype.writeConstraints = function(){
	var str = "\tPRIMARY KEY(" +this.className + "ID),\n";
	
	for (var name in this.jsonReader.objects){
		str += "\tCONSTRAINT fk_" + this.jsonReader.objects[name].className + " FOREIGN KEY(" +this.jsonReader.objects[name].className+ "ID)\n";
		str += "\tREFERENCES " + this.jsonReader.objects[name].className+ "(" +this.jsonReader.objects[name].className + "ID),\n";
	}
	str = str.substring(0, str.length - 2);
	str += "\n";
	return str;
};

ToSQLConverter.prototype.writeObjects = function(){
	var str = "";
	for (var name in this.jsonReader.objects){
		str += "\t" + this.jsonReader.objects[name].className + "ID INT,\n";
	}
	
	return str;
};

ToSQLConverter.prototype.writeArrays = function(){
    
    for (var name in this.jsonReader.arrays){
		var type = this.jsonReader.arrays[name].type;
		var json = '{"' + this.className + 'ID"' + " : "+JsonClassReader.getInstanceJson(this.className)+", ";
		
		switch (type){
		case "int":
			json += '"' + name + '":' + "0"; 
			break;
		case "float": 
			json += '"' + name + '":' + "0.0"; 
			break;
		case "boolean":
			json += '"' + name + '":' + "false"; 
			break;
		case "string":
			json += '"' + name + '":' + '"varchar"'; 
			break;
		case "object":
			//TODO tough shit
			json += '"' + name + 'ID":' + "0"; 
			break;
		default:
			json += '"' + type + 'ID":' + JsonClassReader.getInstanceJson(type);
		}	
		
		json += "}";
		var obj = JSON.parse(json);
		JsonClassReader.assignCorrectClass(obj,new JsonClassReader(json,name.capitalizeFirstLetter() + this.className));
		
       
    }

};

ToSQLConverter.prototype.writePrimitiveProperties = function(){
    var str = "\t" +this.className + "ID INT,\n";
	
	
    for (var name in this.jsonReader.integers){
		str += "\t" + name + " INT,\n";
    }

    for (var name in this.jsonReader.floats){
		str += "\t" + name + " FLOAT(8,4),\n";
    }

    for (var name in this.jsonReader.bools){
		str += "\t" + name + " INT(1),\n";
    }

    for (var name in this.jsonReader.strings){
		str += "\t" + name + " VARCHAR(255),\n";
    }

    return str;
};




ToSQLConverter.prototype.writeNewClassBeginning = function(){
	var str = JsonClassReader.fileSeperator;
	return str += "CREATE TABLE " + this.className + "(\n";
};

ToSQLConverter.prototype.writeClassEnding = function(){
	return ");\n\n";
};


ToSQLConverter.convertToSpecificName = function(str){
	switch (str){
		case "int":
			return "INT";
		case "float": 
			return "FLOAT(8,4)";
		case "boolean":
			return "INT(1)";
		case "string":
			return "VARCHAR";
		case "object":
			return "Object";
	}
	
	return str;
};

