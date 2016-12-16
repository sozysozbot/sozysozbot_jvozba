function jvokaha_gui(txt)
{
	txt = txt.replace(/h/g, "'");
	txt = txt.toLowerCase();
	
	try{
		var arr = jvokaha(txt);
		arr = arr.filter(function(a){
			return a.length > 1;
		});
		arr = arr.map(function(rafsi){
			return search_selrafsi_from_rafsi(rafsi);
		});
	} catch(e) {
		alert(e); return;
	}
	output_jvokaha_result(arr, txt)
}

function output_jvokaha_result(arr, input)
{
	var info = "<div class='txt'>{" + input + "} --&gt; {" + arr.join(" ") + "}";
	// FIXME: how about showing the definition or something
	document.getElementById("res2").innerHTML = info;
}
