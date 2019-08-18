function jvozba_gui(txt: string): void
{
	txt = txt.replace(/h/g, "'");
	txt = txt.toLowerCase();
	var arr = txt.split(" ");
	var arr2: string[] = [];

	arr = arr.filter(function(a: string){ return a !== ""; });
	if(arr.length === 0){
		/* empty */
		return;
	}
	if(arr.length === 1){
		output_corresponding_selrafsi(arr[0]);
		return;
	}

	try{
		for(var i = 0; i < arr.length; i++) {
			var dat = arr[i];
			if(dat.startsWith("-") || dat.endsWith("-")) { // "luj-" or "-jvo"
					arr[i] = search_selrafsi_from_rafsi(dat.replace(/-/g, ""));
			}
			arr2[arr2.length] = arr[i];
		}

		var answers: LujvoAndScore[] = jvozba(arr, (document.getElementById("lalaidoi") as HTMLInputElement).checked);
	}
	catch(e){
		alert(e); return;
	}

	output_jvozba_answers(answers, arr2);
}


/* single rafsi -> dictionary */
function output_corresponding_selrafsi(rafsi: string): void
{
	var bare_rafsi = rafsi.replace(/-/g, "")
	var selrafsi = search_selrafsi_from_rafsi2(bare_rafsi);
	if(selrafsi) {
		var info = "<div class='txt'>-" + bare_rafsi + "- is a rafsi for {" + selrafsi + "}</div>";
		document.getElementById("res")!.innerHTML = info;
	} else {
		var info = "<div class='txt'>No word found for rafsi -" + bare_rafsi + "-</div>";
		document.getElementById("res")!.innerHTML = info;
	}
}

function output_jvozba_answers(answers: LujvoAndScore[], inputs: string[])
{
	var info = "<div class='txt'>Displaying results for {" + inputs.join(" ") + "}: <span class='bri'>brivla</span> <span class='cme'>cmevla</span></div>";
	var table = "<table>"
	for(var i=0; i<answers.length; i++) {
		var word = answers[i].lujvo;
		var last = get_CV_info(word[word.length-1]);

		table += "<tr class='"+
		(last === "V" ? "brivla" : "cmevla") +"'>";
		table += "<td>";
		if (last !== "V" && !((document.getElementById("lalaidoi") as HTMLInputElement).checked)){ table += "."; }
		table += word;
		if(last !== "V"){ table += "."; }
		table += "</td>";
		table += "<td style='text-align: right;'>";
		table += answers[i].score;
		table += "</td>";
		table += "</tr>";
	}

	table += "</table>"
	document.getElementById("res")!.innerHTML = info + table;
}

function jvozba_gui_loaded()
{
	// URL() supported by modern browsers
	var url = new URL(location.href);

	let jvozbaParam = url.searchParams.get('b');
	if (jvozbaParam)
	{
		let val = url.searchParams.get('b');
		if (typeof val === "string") {
			(document.getElementById("b") as HTMLInputElement).value = val;
			jvozba_gui((document.getElementById("b") as HTMLInputElement).value);
		}
	}

	let jvokahaParam = url.searchParams.get('d');
	if (jvokahaParam)
	{
		let val = url.searchParams.get('d');
		if (typeof val === "string") {
		(document.getElementById("d") as HTMLInputElement).value = val ;
		jvokaha_gui((document.getElementById("d") as HTMLInputElement).value);
		}
	}
}