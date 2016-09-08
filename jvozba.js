
function is_CVV(rafsi)
{
	return (get_info(rafsi) === "CVV"
	|| get_info(rafsi) === "CV'V");
}

function is_CCV(rafsi)
{
	return get_info(rafsi) === "CCV";
}

function is_4letter(rafsi)
{
	return (get_info(rafsi) === "CVCC"
	|| get_info(rafsi) === "CCVC");	
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



