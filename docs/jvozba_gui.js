function jvozba_gui(txt)
{
	txt = txt.replace(/h/g, "'");
	txt = txt.toLowerCase();
	var arr = txt.split(" ");
	var arr2 = [];
	
try{
	var candid_arr = [];
	for(var i = 0; i < arr.length; i++) {
		if(arr[i] === "") continue;
		
		var dat = arr[i];
		if(dat.indexOf("-") === 0 || dat.indexOf("-") === dat.length - 1) { // "luj-" or "-jvo"
			arr[i] = search_selrafsi_from_rafsi(dat.replace(/-/g, ""));
		}
		arr2[arr2.length] = arr[i];
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
	output_answers(answers, arr2);
}

function output_answers(answers, inputs)
{
	var info = "<div>Displaying results for {" + inputs.join(" ") + "}:</div>";
	var table = "<table>"
	for(var i=0; i<answers.length; i++) {
		var word = answers[i].lujvo;
		var last = get_CV_info(word[word.length-1]);
		
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
	document.getElementById("res").innerHTML = info + table;
}
