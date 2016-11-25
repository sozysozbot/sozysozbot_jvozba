function normalize(rafsi_list)
{
	if(rafsi_list.length === 1) {
		throw new Error("You need at least two valsi to make a lujvo");
	}
	
	var input = rafsi_list.concat([]); //copy
	var result = [input.pop()]; // add the final rafsi
	
	
	while(input.length)	{
		var rafsi = input.pop();
		var end = rafsi.charAt(rafsi.length - 1);
		var init = result[0].charAt(0);	
		
		if(is_4letter(rafsi)) {
			result.unshift("y");
		} else if(get_CV_info(end) === "C" && get_CV_info(init) === "C" && is_permissible(end, init) === 0) {
			result.unshift("y");
		} else if(end === "n" && ["ts","tc","dz","dj"].indexOf(result[0].slice(0,2)) !== -1){
			result.unshift("y");
		} else if(input.length === 0 && is_CVV(rafsi)) { //adapting first rafsi, which is CVV; gotta think about r-hyphen
			var hyphen = "r";
			if(result[0].charAt(0) === "r") {
				hyphen = "n";
			}
			
			if(rafsi_list.length > 2 || !is_CCV(result[0])) {
				result.unshift(hyphen);
			}
		} else if(input.length === 0 && is_CVC(rafsi) && is_tosmabru(rafsi, result)){
			result.unshift("y");
		}
		
		result.unshift(rafsi);
	}
	
	return result;
}

function is_tosmabru(rafsi, rest)
{
	//skip if cmevla
	var last = rest[rest.length - 1];
	if(["a", "e", "i", "o", "u"].indexOf(last.charAt(last.length - 1)) === -1) { // ends with a consonant
		return;
	}
	
	var index;
	for(var i=0; i<rest.length; i++) {
		if(is_CVC(rest[i])) continue; 
		
		index = i;
		if(rest[i] === "y" || 
			(get_CV_info(rest[i]) === "CVCCV" && 2 === is_permissible(rest[i].charAt(2),rest[i].charAt(3))) 
		) {
			break;
			// further testing
		} else {
			return false;
		}
	}
	
	//further testing
	
	var tmp1 = rafsi;
	var tmp2 = rest[0];
	var j = 0;
	do {
		if(tmp2 === "y") return true;
		
		if(2 !== is_permissible(tmp1.charAt(tmp1.length-1),tmp2.charAt(0)) ){
			return false;
		}
		tmp1 = tmp2;
		tmp2 = rest[++j];
	} while(j <= index);
	return true;
}


function is_CVV(rafsi)
{
	return (get_CV_info(rafsi) === "CVV"
	|| get_CV_info(rafsi) === "CV'V");
}

function is_CCV(rafsi)
{
	return get_CV_info(rafsi) === "CCV";
}

function is_CVC(rafsi)
{
	return get_CV_info(rafsi) === "CVC";
}

function is_4letter(rafsi)
{
	return (get_CV_info(rafsi) === "CVCC"
	|| get_CV_info(rafsi) === "CCVC");	
}

function is_permissible(c1, c2) //2: initial ok; 1: ok; 0: none ok
{
	return {
		r:{r:0,l:1,n:1,m:1,b:1,v:1,d:1,g:1,j:1,z:1,s:1,c:1,x:1,k:1,t:1,f:1,p:1},
		l:{r:1,l:0,n:1,m:1,b:1,v:1,d:1,g:1,j:1,z:1,s:1,c:1,x:1,k:1,t:1,f:1,p:1},
		n:{r:1,l:1,n:0,m:1,b:1,v:1,d:1,g:1,j:1,z:1,s:1,c:1,x:1,k:1,t:1,f:1,p:1},
		m:{r:2,l:2,n:1,m:0,b:1,v:1,d:1,g:1,j:1,z:0,s:1,c:1,x:1,k:1,t:1,f:1,p:1},
		b:{r:2,l:2,n:1,m:1,b:0,v:1,d:1,g:1,j:1,z:1,s:0,c:0,x:0,k:0,t:0,f:0,p:0},
		v:{r:2,l:2,n:1,m:1,b:1,v:0,d:1,g:1,j:1,z:1,s:0,c:0,x:0,k:0,t:0,f:0,p:0},
		d:{r:2,l:1,n:1,m:1,b:1,v:1,d:0,g:1,j:2,z:2,s:0,c:0,x:0,k:0,t:0,f:0,p:0},
		g:{r:2,l:2,n:1,m:1,b:1,v:1,d:1,g:0,j:1,z:1,s:0,c:0,x:0,k:0,t:0,f:0,p:0},
		j:{r:1,l:1,n:1,m:2,b:2,v:2,d:2,g:2,j:0,z:0,s:0,c:0,x:0,k:0,t:0,f:0,p:0},
		z:{r:1,l:1,n:1,m:2,b:2,v:2,d:2,g:2,j:0,z:0,s:0,c:0,x:0,k:0,t:0,f:0,p:0},
		s:{r:2,l:2,n:2,m:2,b:0,v:0,d:0,g:0,j:0,z:0,s:0,c:0,x:1,k:2,t:2,f:2,p:2},
		c:{r:2,l:2,n:2,m:2,b:0,v:0,d:0,g:0,j:0,z:0,s:0,c:0,x:0,k:2,t:2,f:2,p:2},
		x:{r:2,l:2,n:1,m:1,b:0,v:0,d:0,g:0,j:0,z:0,s:1,c:0,x:0,k:0,t:1,f:1,p:1},
		k:{r:2,l:2,n:1,m:1,b:0,v:0,d:0,g:0,j:0,z:0,s:1,c:1,x:0,k:0,t:1,f:1,p:1},
		t:{r:2,l:1,n:1,m:1,b:0,v:0,d:0,g:0,j:0,z:0,s:2,c:2,x:1,k:1,t:0,f:1,p:1},
		f:{r:2,l:2,n:1,m:1,b:0,v:0,d:0,g:0,j:0,z:0,s:1,c:1,x:1,k:1,t:1,f:0,p:1},
		p:{r:2,l:2,n:1,m:1,b:0,v:0,d:0,g:0,j:0,z:0,s:1,c:1,x:1,k:1,t:1,f:1,p:0}
	}[c1][c2];
}
