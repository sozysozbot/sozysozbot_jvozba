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


/* 
	create_every_possibility([[1,11], [2], [3,33,333]]) ==> [ [1,2,3],[11,2,3],  [1,2,33],[11,2,33],  [1,2,333],[11,2,333] ]
	create_every_possibility([[1,11]]) ==> [ [1],[11] ]
*/
function create_every_possibility(aa)
{
	var arr_arr = JSON.parse(JSON.stringify(aa));
	if(arr_arr.length === 0) {
		return [[]];
	}
	var arr = arr_arr.pop();
	
	var result = [];
	for(var i=0; i<arr.length; i++) {
		var e = arr[i];
		
		result = result.concat(create_every_possibility(arr_arr).map(function(f){
			return f.concat([e]);
		}));
	}
	return result;
}
	
function get_candid(selrafsi, isLast)
{
	if(cmavo_rafsi_list[selrafsi]) {
		return cmavo_rafsi_list[selrafsi];		
	} else if(gismu_rafsi_list[selrafsi]){
		var gismu = selrafsi;
		var candid = gismu_rafsi_list[gismu].concat([]);
		
		if(isLast) {
			candid.push(gismu);
		}
		
		var chopped = gismu.slice(0,-1);
		if(chopped !== "brod") 
			candid.push(chopped);
		
		return candid;
	} else {
		throw new Error("no rafsi for word " + selrafsi);
	}
}
