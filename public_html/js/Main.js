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

$( window ).load(function() {
	$("#downloadlink").click(function(e) {
		var json = //$("#json").val();
			'{"totalResultsAvailable": "1827221","totalResultsReturned": 2,"firstResultPosition": 1,"Result": [{"Title": "potato jpg","Summary": "Kentang Si bungsu dari keluarga Solanum tuberosum L ini ternyata memiliki khasiat untuk mengurangi kerutan  jerawat  bintik hitam dan kemerahan pada kulit  Gunakan seminggu sekali sebagai","Url": "http://www.mediaindonesia.com/spaw/uploads/images/potato.jpg","ClickUrl": "http://www.mediaindonesia.com/spaw/uploads/images/potato.jpg","RefererUrl": "http://www.mediaindonesia.com/mediaperempuan/index.php?ar_id=Nzkw","FileSize": 22630,"FileFormat": "jpeg","Height": "362","Width": "532","Thumbnail": {"Url": "http://thm-a01.yimg.com/nimage/557094559c18f16a","Height": "98","Width": "145"}},{"Title": "potato jpg","Summary": "Introduction of puneri aloo This is a traditional potato preparation flavoured with curry leaves and peanuts and can be eaten on fasting day  Preparation time   10 min","Url": "http://www.infovisual.info/01/photo/potato.jpg","ClickUrl": "http://www.infovisual.info/01/photo/potato.jpg","RefererUrl": "http://sundayfood.com/puneri-aloo-indian-%20recipe","FileSize": 119398,"FileFormat": "jpeg","Height": "685","Width": "1024","Thumbnail": {"Url": "http://thm-a01.yimg.com/nimage/7fa23212efe84b64","Height": "107","Width": "160"}}]}';	
		
		var selected = $("input[type='radio'][name='language']:checked");
		if (selected.length > 0) {
			var str = convertToClass(selected.val(),json,"Window");
			
			//TODO
			console.log(str);
			//downloadData(str,"ClassA","java");
			e.preventDefault();
			e.stopPropagation();
		} else {
		
			e.preventDefault();
			e.stopPropagation();
		}
		
		
	});
});


function convertToClass(language, json,enclosingClassName){
	JsonClassReader.clearAll();
	JsonClassReader.setEnclosingClass( new JsonClassReader(json, enclosingClassName));
	
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
	


