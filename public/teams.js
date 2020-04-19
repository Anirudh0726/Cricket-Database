var container = document.querySelector(".container");
function renderTeams(teamArr){
	var i = 0;
	while(i<teamArr.length){
		let row = document.createElement('div');
		row.setAttribute('class',"row");
		for (var j = 0; j <= 1; j++) {
			let col = document.createElement('div');
			col.setAttribute('class',"col");
			let div = document.createElement('div');
			if (typeof teamArr[i+j] != "undefined"){
				let btn = document.createElement('button');
				btn.setAttribute('class','btn btn-outline-success');
				btn.setAttribute('id',teamArr[i+j].name);
				btn.innerText=teamArr[i+j].name;
				btn.setAttribute('onclick','getPlayersbyTeam(this.id)');
				div.append(btn);
			}
			col.append(div);
			row.append(col);
		}
		container.append(row);
		i=i+2;
	}
}

function init(){
	container.innerHTML="<h3>Select Team:</h3>";
	var request = new XMLHttpRequest();
	request.open('GET',"teams/teams");
	request.setRequestHeader("Content-type", "application/json");
	request.onload = function() {
	var data = JSON.parse(this.response);
	if (request.status >= 200 && request.status < 400) {
	    renderTeams(data.teams);
	  } else {
	    	console.log('error');
		}
	}
	request.send();
}


function renderItem(player){
	let table = document.querySelector("tbody");
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

function getPlayersbyTeam(teamName){
	container.innerHTML = `<h2>Players</h2><table class="table table-hover"><thead><tr><th>Player #</th><th>Name</th><th>DOB</th><th>Joining Date</th><th>Team</th></tr></thead><tbody></tbody></table><button class="btn btn-info" onclick="init()">Back</button>`;
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