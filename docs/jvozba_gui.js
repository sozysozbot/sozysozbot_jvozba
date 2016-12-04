function jvozba_gui(txt)
{
	txt = txt.replace(/h/g, "'");
	txt = txt.toLowerCase();
	var arr = txt.split(" ");
	var arr2 = [];
	
try{
	arr = arr.filter(function(a){ return a !== ""; });
	if(arr.length === 0){
		/* empty */
		return;
	}
	if(arr.length === 1){
		output_corresponding_selrafsi(arr[0]);
		return;
	}
	
	var candid_arr = [];
	for(var i = 0; i < arr.length; i++) {
		var dat = arr[i];
		if(dat.startsWith("-") || dat.endsWith("-")) { // "luj-" or "-jvo"
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
	output_jvozba_answers(answers, arr2);
}


/* single rafsi -> dictionary */
function output_corresponding_selrafsi(rafsi)
{
	var bare_rafsi = rafsi.replace(/-/g, "")
	var selrafsi = search_selrafsi_from_rafsi(bare_rafsi);
	var info = "<div class='txt'>-" + bare_rafsi + "- is a rafsi for {" + selrafsi + "}</div>";
	document.getElementById("res").innerHTML = info;
}

function output_jvozba_answers(answers, inputs)
{
	var info = "<div class='txt'>Displaying results for {" + inputs.join(" ") + "}: <span class='bri'>brivla</span> <span class='cme'>cmevla</span></div>";
	var table = "<table>"
	for(var i=0; i<answers.length; i++) {
		var word = answers[i].lujvo;
		var last = get_CV_info(word[word.length-1]);
		
		table += "<tr class='"+ 
		 (last === "V" ? "brivla" : "cmevla") +"'>";
			table += "<td>";
			table += word;
			table += "</td>";
			table += "<td style='text-align: right;'>";
			table += answers[i].score;
			table += "</td>";
		table += "</tr>";
	}
	
	table += "</table>"
	document.getElementById("res").innerHTML = info + table;
}
