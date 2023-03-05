console.log("Start!");
const HourlyAllDayAllSites = "http://belize.expertlearningsystem.org/Knowledge/?SessionID=1234567890:9999&Query=SolarWattsAllDayAllSites(%DATE%*)"
//const labels = ["Jan","Feb","Mar","Apr","May","June","July"];
const Url="http://belize.expertlearningsystem.org/Knowledge/?SessionID=1234567890:9999";
const Sites="&Query=SolarNames()";
const site1 = [65, 59, 80, 81, 56, 55, 40];
const site2 = [24, 34, 54, 62, 34, 54, 23];


function yesterdaysDate() {
	var today = new Date();
	var dd = String(today.getDate()-1).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	var date = yyyy +'-'+ mm +'-'+ dd;
	return date;
}

var command=HourlyAllDayAllSites;
	command=command.replace("%DATE%",yesterdaysDate());
	
fetch(command)
    .then(jsonData => jsonData.json())
    .then(fetched_data => processSitesWatts(fetched_data))

let printIt = (fetched_data) => {
    console.log(fetched_data)
}

function processSitesWatts(results){

	if (!results["success"]){
		console.log("error getting data");
		return;
	}
	
	dataList = results ['message'];
	wattsLabel = [];  
	wattTotalsByHour = [];
	
	//console.log(dataList.length); checking length
	console.log(dataList); //checking if it prints the whole array of arrays
	//console.log(dataList[0][0]); checking if it prints a selected element
	
	//pushing the first into the watts label: 
	
	/*for (let i=0; i<dataList.length; i++){
		wattsLabel.push(dataList[i][0]);
		}
		
	for (let i=3; i<4; i++){
		for (let j = 1; j<2; j++){
			wattTotalsByHour[i] += []
		}
		
	}*/
	
	for (let i=0; i<13; i++){
		wattTotalsByHour[i]=0;
	}
	
	for (let j=0; j<26; j++){
		for (let i=0; i<13; i++){
			if (dataList[j][i+1]!==null){
				wattTotalsByHour[i]+=parseInt(dataList[j][i+1]);
			}
		}
	}
		
	console.log(wattTotalsByHour); //checking if the initializing worked
	//console.log(wattsLabel); checking if the labels made it
hourLabels=[];

for (let i=0; i<13; i++){
	hourLabels.push(i+6+":00");	
}


const data = {
  labels: hourLabels,
  datasets: [{
    label: 'Total Watts by hour for '+' '+yesterdaysDate(),
    data: wattTotalsByHour,
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};
 
const config = {
  type: 'line',
  data: data,
};
 
const ctx = document.getElementById('myChart');
  
new Chart(ctx, config);

}


























