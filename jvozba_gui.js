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
