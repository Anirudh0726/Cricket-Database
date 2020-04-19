let table = document.querySelector("tbody");

function renderItem(player){
	let row = document.createElement('tr');
	var pid = document.createElement("th");
	var name = document.createElement("th");
	var dob = document.createElement("th");
	var doj = document.createElement("th");
	var team = document.createElement("th");

	pid.innerText = player.jerseyId;
	name.innerText = player.name;
	dob.innerText = player.dob;
	doj.innerText = player.doj;
	team.innerText = player.team;

	row.append(pid);
	row.append(name);
	row.append(dob);
	row.append(doj);
	row.append(team);
	table.append(row);
}

function init(){
	var request = new XMLHttpRequest();
	request.open('GET',"players/all");
	request.setRequestHeader("Content-type", "application/json");
	request.onload = function() {
	var data = JSON.parse(this.response);
	if (request.status >= 200 && request.status < 400) {
	    data.players.forEach(player => {
	    	renderItem(player);
	    });
	  } else {
	    	console.log('error');
		}
	}
	request.send();
}

function getPlayersbyTeam(teamName){
	var request = new XMLHttpRequest();
	var team ={
		team:teamName
	}
	request.open('POST',"players/player");
	request.setRequestHeader("Content-type", "application/json");
	request.onload = function() {
	var data = JSON.parse(this.response);
	if (request.status >= 200 && request.status < 400) {
	    data.players.forEach(player => {
	    	renderItem(player);
	    });
	  } else {
	    	console.log('error');
		}
	}
	request.send(JSON.stringify(team));
}