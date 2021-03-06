dojo.addOnLoad(initKeywordTable);
function format() {
	var strText = document.getElementById("search").value;
	var activeDiv = getActiveDiv();
	if (activeDiv == null) {
		help("format");
		return;
	}
	var content = activeDiv.innerHTML;
	var newStr = doFormat(content);
	activeDiv.innerHTML = newStr;	
}


var keywords = new Object();
var indentStr = "````";

function initKeywordTable() {
	keywords["abstract"] = true;
	keywords["assert"] = true;
	keywords["boolean"] = true;
	keywords["break"] = true;
	keywords["byte"] = true;
	keywords["case"] = true;
	keywords["catch"] = true;
	keywords["char"] = true;
	keywords["class"] = true;
	keywords["const"] = true;
	keywords["continue"] = true;
	keywords["default"] = true;
	keywords["do"] = true;
	keywords["double"] = true;
	keywords["else"] = true;
	keywords["enum"] = true;
	keywords["extends"] = true;
	keywords["false"] = true;
	keywords["final"] = true;
	keywords["finally"] = true;
	keywords["float"] = true;
	keywords["for"] = true;
	keywords["goto"] = true;
	keywords["if"] = true;
	keywords["implements"] = true;
	keywords["import"] = true;
	keywords["instanceof"] = true;
	keywords["int"] = true;
	keywords["interface"] = true;
	keywords["long"] = true;
	keywords["native"] = true;
	keywords["new"] = true;
	keywords["null"] = true;
	keywords["package"] = true;
	keywords["private"] = true;
	keywords["protected"] = true;
	keywords["public"] = true;
	keywords["return"] = true;
	keywords["short"] = true;
	keywords["static"] = true;
	keywords["strictfp"] = true;
	keywords["super"] = true;
	keywords["switch"] = true;
	keywords["synchronized"] = true;
	keywords["this"] = true;
	keywords["throw"] = true;
	keywords["throws"] = true;
	keywords["transient"] = true;
	keywords["true"] = true;
	keywords["try"] = true;
	keywords["void"] = true;
	keywords["volatile"] = true;
	keywords["while"] = true;
}

function hiLight(text) {
	var result = "<font color=\"#3169B5\">" + text + "</font>";
	return result
}

function isSpace(ch) {
	if (ch == "\n" || ch == "\t" || ch == "\v" || ch == " ")
		return true;
	else
		return false;
}

function doFormat(text) {
	// Filer out the tags
	var br = new RegExp("<br>", "ig");
	var startTag = new RegExp("<[^>]*>", "g");
	var endTag = new RegExp("</.*>", "g");
	text = text.replace(br, "\n");
	text = text.replace(startTag, "");
	text = text.replace(endTag, "");
	
	// High light string
	text = text.replace(/("[^"]*")/g, 
		"<font color=\"Red\">$1</font>");
	// High light comment /* */ 
	text = text.replace(/(\/\*\/*(\**[^*\/]\/*)*\*+\/)/g, 
		"<font color=\"Green\">$1</font>");
	// High light comment //
	text = text.replace(/(\/\/.*)\n/g, 
		"<font color=\"Green\">$1</font>\n");
	
	// Search for the keywords
	var result;
	var html = "";
	var i = 0;
	var id = /[_a-zA-Z](\w|\$)*/g;
	while ((result = id.exec(text)) != null) {
		if (keywords[result[0]] == true) {  // Match a keyword
			var hlt = hiLight(result[0]);
			html += text.substring(i, result.index);
			html += hlt;
			i = id.lastIndex;
		}
	}
	html += text.substring(i);
	
	html = html.replace(/\n/g, "<br>"); // Return to <br>
	//html = html.replace(/`/g, "&nbsp");
	return html;
}