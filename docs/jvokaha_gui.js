function jvokaha_gui(txt)
{
	txt = txt.replace(/h/g, "'");
	txt = txt.toLowerCase();
	
	try{
		var arr = jvokaha(txt);
		console.log(arr);
	} catch(e) {
		alert(e); return;
	}
}
