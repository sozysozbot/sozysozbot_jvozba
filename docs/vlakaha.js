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
		return a.length !== 1; // remove ynr
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
	var original_lujvo = lujvo;
	var res = [];
	while(true){
		if(lujvo === "") return res;
		
		//remove hyphen
		if(lujvo.charAt(0) === "y" // y-hyphen
		|| lujvo.slice(0,2) === "nr" // n-hyphen is only allowed before r
		|| lujvo.charAt(0) === "r" && get_CV_info(lujvo.charAt(1)) === "C" // r followed by a consonant
		) {
			res.push(lujvo.charAt(0));
			lujvo = lujvo.slice(1);
			continue;
		}
		
		
		
		//drop rafsi from front
		
		//CVV can always be dropped
		if(get_CV_info(lujvo.slice(0,3)) === "CVV"
		&& ["ai", "ei", "oi", "au"].indexOf(lujvo.slice(1,3))
		){
			res.push(lujvo.slice(0,3));
			lujvo = lujvo.slice(3);
			continue;
		}
		
		//CV'V can always be dropped
		if(get_CV_info(lujvo.slice(0,4)) === "CV'V"){
			res.push(lujvo.slice(0,4));
			lujvo = lujvo.slice(4);
			continue;
		}
		
		//CVCCY and CCVCY can always be dropped
		//how about checking if CC is persimmisble? *FIXME*
		if(get_CV_info(lujvo.slice(0,5)) === "CVCCY"
		|| get_CV_info(lujvo.slice(0,5)) === "CCVCY"
		){
			res.push(lujvo.slice(0,4));
			res.push("y");
			lujvo = lujvo.slice(5);
			continue;
		}
		
		//the final rafsi can be 5-letter
		if(get_CV_info(lujvo) === "CVCCV"
		|| get_CV_info(lujvo) === "CCVCV"
		){
			res.push(lujvo);
			return res;
		}
		
		if(get_CV_info(lujvo.slice(0,3)) === "CVC"
		|| get_CV_info(lujvo.slice(0,3)) === "CCV"
		){
			res.push(lujvo.slice(0,3));
			lujvo = lujvo.slice(3);
			continue;
		}
	
		// if all fails...
		return null;
	}
	return res;	
}
