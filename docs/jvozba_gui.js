function jvozba_gui(txt)
{
	txt = txt.replace(/h/g, "'");
	txt = txt.toLowerCase();
	var arr = txt.split(" ");
	
try{
	var candid_arr = [];
	for(var i = 0; i < arr.length; i++) {
		if(arr[i] === "") continue;
		candid_arr.push(get_candid(arr[i], /*isLast:*/ i === arr.length - 1))
	}
	
	var answers = create_every_possibility(candid_arr).map(function(rafsi_list){
		var result = normalize(rafsi_list);
		return {lujvo: result.join(""), score: get_lujvo_score(result)};
	}).sort(function(a,b){
		return a.score - b.score;
	});
}catch(e){
	alert(e); return;
}
	output_answers(answers);
}

function output_answers(answers)
{
	var table = "<table>"
	for(var i=0; i<answers.length; i++) {
		var word = answers[i].lujvo;
		var last = get_info(word[word.length-1]);
		
		table += "<tr class='"+ 
		 (last === "V" ? "brivla" : "cmevla") +"'>";
			table += "<td>";
			table += word;
			table += "</td>";
			table += "<td>";
			table += answers[i].score;
			table += "</td>";
		table += "</tr>";
	}
	
	table += "</table>"
	document.getElementById("res").innerHTML = table;
}
