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
	
function get_candidates(arr)
{
	var candid_arr = [];
	for(var i = 0; i < arr.length; i++) {
		if(arr[i] === "") continue;
		if(cmavo_rafsi_list[arr[i]]) {
			candid_arr.push(cmavo_rafsi_list[arr[i]]);		
		} else if(gismu_rafsi_list[arr[i]]){
			var gismu = arr[i];
			var candid = gismu_rafsi_list[gismu].concat([]);
			
			if(i === arr.length - 1) {
				candid.push(gismu);
			}
			
			var chopped = gismu.slice(0,-1);
			if(chopped !== "brod") 
				candid.push(chopped);
			
			candid_arr.push(candid);
		} else {
			alert("no rafsi for word " + arr[i]);
			return;
		}
	}
	return candid_arr;
}
