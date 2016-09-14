/*

vlakaha("parecivo") --> ["pa", "re", "ci", "vo"]
vlakaha("fu'ivla") --> [["fu'i", "vla"]]
vlakaha("pasmabru") --> ["pa", ["sma", "bru"]]
vlakaha("pasymabru") --> [["pas", "mabru"]]

*/

function vlakaha()
{
	/* FIXME */
}

/*
vlakaha("fu'ivla") --> ["fu'i", "vla"]
vlakaha("fu'irvla") --> null // because r-hyphen is not required 
vlakaha("pasymabru") --> ["pas", "y", "mabru"]
vlakaha("pasmabru") --> null // because {pasmabru} is actually {pa smabru}
*/
function jvokaha(lujvo)
{
	var arr = jvokaha2(lujvo);
	var rafsi_list = arr.filter(function(a){
		return a.length === 1; // ynr
	});
	
	if( JSON.stringify(arr) 
	=== JSON.stringify(normalize(rafsi_list))) { // recreate the lujvo from the rafsi list and 
		return arr;
	} else {
		return null;
	}
}


/*
jvokaha2("fu'ivla") --> ["fu'i", "vla"]
jvokaha2("fu'irvla") --> ["fu'i", "r", "vla"] 
jvokaha2("pasymabru") --> ["pas", "y", "mabru"]
jvokaha2("pasmabru") --> ["pas", "mabru"]
*/
function jvokaha2(lujvo)
{
	var res = [];
	while(true){
		//remove hyphen
		if(lujvo.charAt(0) === "y") {
			res.push("y");
			lujvo = lujvo.slice(1);
			continue;
		} else if(lujvo.slice(0,2) === "nr") { // n-hyphen is only allowed before r
			res.push("n");
			lujvo = lujvo.slice(1);
			continue;
		} else if(lujvo.charAt(0) === "r" && get_CV_info(lujvo.charAt(1)) === "C") { // r followed by a consonant
		
		}
		
		/*
			FIXME!!!
		lujvo = shorter_lujvo;
		res.push(rafsi);
		*/
	}
	return res;	
}
