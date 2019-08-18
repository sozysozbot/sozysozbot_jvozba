function jvokaha_gui(txt: string): void
{
	txt = txt.replace(/h/g, "'");
	txt = txt.toLowerCase();
	
	try{
		var arr = jvokaha(txt);
	} catch(e) {
		alert(e); return;
	}
	arr = arr.filter(function(a){
		return a.length > 1;
	});
	arr = arr.map(function(rafsi){
		var selrafsi = search_selrafsi_from_rafsi2(rafsi)
		if(selrafsi) {
			return selrafsi;
		} else {
			return "-" + rafsi + "-" // output as rafsi form; signify as unknown
		}
	});
	output_jvokaha_result(arr, txt)
}

function output_jvokaha_result(arr: string[], input: string)
{
	var info = "<div class='txt'>{" + input + "} --&gt; {" + arr.join(" ") + "}";
	// FIXME: how about showing the definition or something
	document.getElementById("res2")!.innerHTML = info;
}
