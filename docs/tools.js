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
	} else if(selrafsi.indexOf("-") === 0 || selrafsi.indexOf("-") === selrafsi.length - 1) { // "luj-" or "-jvo"
		var rafsi = selrafsi.replace(/-/g, "");
		return get_candid(search_selrafsi_from_rafsi(rafsi), isLast) // recursion
	} else {
		throw new Error("no rafsi for word " + selrafsi);
	}
}

function search_selrafsi_from_rafsi(rafsi)
{
	for(var i in gismu_rafsi_list) {
		if(gismu_rafsi_list[i].indexOf(rafsi) !== -1) return i;
	}
	for(var j in cmavo_rafsi_list) {
		if(cmavo_rafsi_list[j].indexOf(rafsi) !== -1) return j;
	}
	return null;
}
