'use strict';

function isInt(n){
    return Number(n) === n && n % 1 === 0;
}

function isFloat(n){
    return n === Number(n) && n % 1 !== 0;
}

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.decapitalize = function(){
	return this.charAt(0).toLowerCase() + this.slice(1);
};

function downloadData(text,name,fileEnding){
	var textFile = null;
	var data = new Blob([text], {type: 'text/plain'});

	if (textFile !== null) {
		window.URL.revokeObjectURL(textFile);
	}

	textFile = window.URL.createObjectURL(data);
	var link = document.getElementById('downloadlink');
	link.download = name + "." + fileEnding;
    link.href = textFile;
}

var previewVisible = false;

$(window).load(function() {
	
	var example = '{\n\t"firstName": "John",\n\t"lastName": "Smith",\n\t"age": 25,\n\t"address":\n\t{\n\t\t"streetAddress": "21 2nd Street",\n\t\t"city": "New York",\n\t\t"state": "NY",\n\t\t"postalCode": "10021"\n\t},\n\t"phoneNumber":\n\t[\n\t\t{\n\t\t\t"type": "home",\n\t\t\t"number": "212 555-1234"\n\t\t},\n\t\t{\n\t\t\t"type": "fax",\n\t\t\t"number": "646 555-4567"\n\t\t}\n\t]\n}';
	$("#json").html(example);
	
	$("#downloadlink").click(function(e) {
		$("#error").hide();
		var json = $("#json").val();
		var selected = $("input[type='radio'][name='language']:checked");
		var str = convertToClass(selected.val(),json,$("#formTitle").val());

		//TODO
		//downloadData(str,"ClassA","java");
		
		$("#classes").val(str);
		$("#lang").val(selected.val());
		$("#names").val(Object.keys(JsonClassReader.classNameAppearances));
		
		$("#serverForm").submit();
		e.preventDefault();
		e.stopPropagation();
		
	});
	
	$("#previewButton").click(function(){
		$("#error").hide();
		var selected = $("input[type='radio'][name='language']:checked");
		var str = convertToClass(selected.val(),$("#json").val(), $("#formTitle").val());
		
		
		str = str.replace(/</g,"&lt;");
		str = str.replace(/>/g,"&gt;");
		str = str.replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;");
		str = str.replace(/\n/g,"<br />");
		
		setTimeout(function(){
			$("#previewWindow p").html(str);
			$("#previewWindow").show();
			previewVisible = true;
		},20);
		
	});
	
	$("#closePreview").click(function(){
		$("#previewWindow").hide();
		previewVisible = false;
	});
	
	$("#content").click(function(){
		if (previewVisible){
			$("#previewWindow").hide();
			previewVisible = false;
		}
		
	});
	

});


function convertToClass(language, json,enclosingClassName){
	JsonClassReader.clearAll();
	try {
		JsonClassReader.setEnclosingClass( new JsonClassReader(json, enclosingClassName));
	} catch (err){
		$("#error").html(err);
		$("#error").show();
		throw new Error(err);
	}
	return getClassString(language);
}


function getClassString(language){
	var classes = "";
	switch (language){
	case "Cs":
		classes = ToCsConverter.writeClasses();
		break;
	case "Cpp":
		classes = ToCppConverter.writeClasses();
		break;
	case "Java":
		classes = ToJavaConverter.writeClasses();
		break;
	case "Fs":
		classes = ToFsConverter.writeClasses();
		break;
	case "Go":
		classes = ToGoConverter.writeClasses();
		break;
	case "Php":
		classes = ToPHPConverter.writeClasses();
		break;
	case "Scala":
		classes = ToScalaConverter.writeClasses();
		break;
	case "Swift":
		classes = ToSwiftConverter.writeClasses();
		break;
	case "Python":
		classes = ToPythonConverter.writeClasses();
		break; 
	case "Groovy":
		classes = ToGroovyConverter.writeClasses();
		break;
	case "Ruby":
		classes = ToRubyConverter.writeClasses();
		break;
	case "Perl":
		classes = ToPerlConverter.writeClasses();
		break;
	case "Delphi":
		classes = ToDelphiConverter.writeClasses();
		break;
	case "ObjC":
		classes = ToObjCConverter.writeClasses();
		break;
	case "Matlab":
		classes = ToMatlabConverter.writeClasses();
		break;
	case "SQL":
		classes = ToSQLConverter.writeClasses();
		break;
	}
	
	return classes;
}
	


