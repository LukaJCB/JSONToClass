'use strict';

function ToPerlConverter(jsonReader, className){
	this.jsonReader = jsonReader;
	this.className = className;
	
	this.classString = this.writeNewClassBeginning();
	this.classString += this.writeConstructor();
	this.classString += this.writeGetters();
	this.classString += this.writeSetters();
	this.classString += this.writeClassEnding();
};

ToPerlConverter.writeClasses = function(){
	var str = "";
	for (var name in JsonClassReader.classes){
		str += new ToPerlConverter(JsonClassReader.classes[name],name).classString;
		
	}
	
	
	return str;
};


ToPerlConverter.prototype.writeConstructor = function(){
	var str	= "sub new {\n";
	str += "\tmy $class = shift;\n";
	str += "\tmy $self = {\n";
	
	
	
	for (var name in this.jsonReader.integers){
		str += "\t\t_" + name + " => shift,\n";
	}	

	for (var name in this.jsonReader.floats){
		str += "\t\t_" + name + " => shift,\n";
	}	

	for (var name in this.jsonReader.bools){
		str += "\t\t_" + name + " => shift,\n";
	}	

	for (var name in this.jsonReader.strings){
		str += "\t\t_" + name + " => shift,\n";
	}	

	for (var name in this.jsonReader.objects){
		str += "\t\t_" + name + " => shift,\n";
	}

	for (var name in this.jsonReader.arrays){
		str += "\t\t_" + name + " => shift,\n";
	}
	
	str += "\t};\n";
	
	str += "\tbless $self, $class;\n";
	str += "\treturn $self;";
	
	str += "}\n\n";
	return str;
};

ToPerlConverter.prototype.writeGetters = function(){
	var str = "";
	for (var name in this.jsonReader.integers){
		str += "sub get" + name.capitalizeFirstLetter() + " {\n";
		str += "\tmy($self) = @_;\n";
		str += "\treturn $self->{_" + name  +"};\n";
		str += "}\n";
	}
	
	for (var name in this.jsonReader.floats){
		str += "sub get" + name.capitalizeFirstLetter() + " {\n";
		str += "\tmy($self) = @_;\n";
		str += "\treturn $self->{_" + name  +"};\n";
		str += "}\n";
	}
	
	for (var name in this.jsonReader.bools){
		str += "sub get" + name.capitalizeFirstLetter() + " {\n";
		str += "\tmy($self) = @_;\n";
		str += "\treturn $self->{_" + name  +"};\n";
		str += "}\n";
	}
	
	for (var name in this.jsonReader.strings){
		str += "sub get" + name.capitalizeFirstLetter() + " {\n";
		str += "\tmy($self) = @_;\n";
		str += "\treturn $self->{_" + name  +"};\n";
		str += "}\n";
	}
	
	for (var name in this.jsonReader.objects){
		str += "sub get" + name.capitalizeFirstLetter() + " {\n";
		str += "\tmy($self) = @_;\n";
		str += "\treturn $self->{_" + name  +"};\n";
		str += "}\n";
	}
	
	for (var name in this.jsonReader.arrays){
		str += "sub get" + name.capitalizeFirstLetter() + " {\n";
		str += "\tmy($self) = @_;\n";
		str += "\treturn $self->{_" + name  +"};\n";
		str += "}\n";
	}
	return str;
};

ToPerlConverter.prototype.writeSetters = function(){
	var str = "";
	for (var name in this.jsonReader.integers){
		str += "sub set" + name.capitalizeFirstLetter() + " {\n";
		str += "\tmy($self, $" +name + ") = @_;\n";
		str += "\t$self->{_" + name +  "} = $" + name + " if defined ($" + name + ");\n";
		str += "\treturn $self->{_" + name  +"};\n";
		str += "}\n";
	}
	
	for (var name in this.jsonReader.floats){
		str += "sub set" + name.capitalizeFirstLetter() + " {\n";
		str += "\tmy($self, $" +name + ") = @_;\n";
		str += "\t$self->{_" + name +  "} = $" + name + " if defined ($" + name + ");\n";
		str += "\treturn $self->{_" + name  +"};\n";
		str += "}\n";
	}
	
	for (var name in this.jsonReader.bools){
		str += "sub set" + name.capitalizeFirstLetter() + " {\n";
		str += "\tmy($self, $" +name + ") = @_;\n";
		str += "\t$self->{_" + name +  "} = $" + name + " if defined ($" + name + ");\n";
		str += "\treturn $self->{_" + name  +"};\n";
		str += "}\n";
	}
	
	for (var name in this.jsonReader.strings){
		str += "sub set" + name.capitalizeFirstLetter() + " {\n";
		str += "\tmy($self, $" +name + ") = @_;\n";
		str += "\t$self->{_" + name +  "} = $" + name + " if defined ($" + name + ");\n";
		str += "\treturn $self->{_" + name  +"};\n";
		str += "}\n";
	}
	
	for (var name in this.jsonReader.objects){
		str += "sub set" + name.capitalizeFirstLetter() + " {\n";
		str += "\tmy($self, $" +name + ") = @_;\n";
		str += "\t$self->{_" + name +  "} = $" + name + " if defined ($" + name + ");\n";
		str += "\treturn $self->{_" + name  +"};\n";
		str += "}\n";
	}
	
	for (var name in this.jsonReader.arrays){
		str += "sub set" + name.capitalizeFirstLetter() + " {\n";
		str += "\tmy($self, $" +name + ") = @_;\n";
		str += "\t$self->{_" + name +  "} = $" + name + " if defined ($" + name + ");\n";
		str += "\treturn $self->{_" + name  +"};\n";
		str += "}\n";
	}
	
	return str;
};





ToPerlConverter.prototype.writeNewClassBeginning = function(){
	return "package " + this.className + ";\n\n";
};

ToPerlConverter.prototype.writeClassEnding = function(){
	return "\n\n";
};


ToPerlConverter.convertToSpecificName = function(str){
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

