//$()- shorthand for $(document).ready()
$(function(){

	//Set Autocompletion for teams
		$("#roster").autocomplete({
			source: ["Milan", "Juventus", "Roma", "Sampdoria", "Udinese","Napoli","Fiorentina",
								"Inter","Empoli","Sassuolo","Lazio","Chievo","Bologna","Torino","Atalanta",
								"Palermo","Genoa","Frosinone","Carpi","Verona"],
			minLength: 2,
			//delay: 
			// source: function(request,response){
			// 	$.ajax({
			// 		headers:{"X-Mashape-Key": "bilVMebejrmshNXfDlOtYvNUOxjAp1pY0GEjsn7LV5xmaJ8Dwq"},
			// 		url: "https://sportsop-soccer-sports-open-data-v1.p.mashape.com/v1/leagues/serie-a/seasons/15-16/teams",
			// 		dataType: "json",
			// 		type: "GET",
			// 		data: {term: request.term},
			// 		success: function(data){
			// 			//use .map to transform data object into an array
			// 			response($.map(data.data.teams,function(value){
			// 									return value.name;
			// 							}));
			// 			console.log(data);
			// 			console.log(request.term);
			// 		}
			// 	})
			// } 
		});


	//Set Autocompletion for players

	//Table to list a team's available players
	$("#form").on("submit",function(event){

		event.preventDefault();

		var team = $('#roster').val();//Get Team	

		$("#table3_wrapper").remove();

		if(team == ""){
			alert("Please enter a team name!");//No empty team field
		}
		else{
			var table3str ='<table id = "table3" class="display">'+
				'<thead>'+
					'<tr>'+
						'<th>Team</th>'+
						'<th>Name</th>'+
						'<th>Lastname</th>'+
						'<th>Nationality</th>'+
						'<th>Position</th>'+
						'<th>Jersey No.</th>'+
				'</tr>'+
				'</thead>'+
				'<tbody>'+		
				'</tbody>'+
			'</table>';

			$(table3str).appendTo("#table_3");

			$('#table3').dataTable({
				//return team squad
				"ajax" :{
					"headers": {"X-Mashape-Key": "bilVMebejrmshNXfDlOtYvNUOxjAp1pY0GEjsn7LV5xmaJ8Dwq"},
				 	"url": "https://sportsop-soccer-sports-open-data-v1.p.mashape.com/v1/leagues/serie-a/seasons/15-16/teams/"+team+"/players",
				 	"dataSrc": "data.players",
				 	"type": "GET",
				},
				"columns" :[
					{"data" :"team",
					 "sClass": "center"},
					{"data" :"name",
					 "sClass": "center"},
				 	{"data" :"fullname",
				 	 "sClass": "center" },
				 	{"data" :"nationality",
				 	 "sClass": "center" },
				 	{"data" : "position",
				   "sClass": "center"},
				 	{"data" : "number",
				   "sClass": "center"}
				]
			});	
		}	
	});//End Form

	//Table to get individual player profile
	$("#form1").on("submit",function(event){
		event.preventDefault();

		var player = $('#player').val();//Get Player
		var team = $('#roster').val();//Get Team
	
		if(player == "" || team == ""){
			alert("To get player stats both a name and team must be entered!");
		}
		else{		
			//return player profile
			console.log(player);
			//get list of all available players
			$.ajax({
				 		headers:{"X-Mashape-Key": "bilVMebejrmshNXfDlOtYvNUOxjAp1pY0GEjsn7LV5xmaJ8Dwq"}, 
				 		url: "https://sportsop-soccer-sports-open-data-v1.p.mashape.com/v1/leagues/serie-a/seasons/15-16/teams/"+team+"/players",
				 		dataType: "json",
				 		type: "GET",
			}).done(function(response) {
				var profiles = response.data.players;
				console.log(profiles);

				function capitalize(namestr) {
    			return String(namestr).charAt(0).toUpperCase() + String(namestr).slice(1);
				}

				//Split player name string and capitalize first and last name
				var playernames = player.split(" ");
				fname = capitalize(playernames[0]);
				lname = capitalize(playernames[1]);
				

				for(i=0; i<profiles.length;i++){

					namestring=profiles[i].name+profiles[i].fullname;

					if((namestring).indexOf(fname) > -1 || (namestring).indexOf(lname) > -1){
						console.log(profiles[i]);
						//Display profile info
						$("#player_profile").html("<h1>Player Profile for "+
																				profiles[i].name+" "+profiles[i].fullname+"</h1>"+
																				"<p>First Name: "+profiles[i].name +"</p>"+
																				"<p>Last Name: "+profiles[i].fullname+"</p>"+
																				"<p>Contract Start: "+profiles[i].contract_start+"</p>"+
																				"<p>Contract Ends: "+profiles[i].contract_end+"</p>"+
																				"<p>Birthplace: "+profiles[i].birthplace+"</p>"+
																				"<p>Birthday: "+profiles[i].birthday+"</p>"+
																				"<p>Height: "+profiles[i].height+"</p>"+
																				"<p>Position: "+profiles[i].position+"</p>"+
																				"<p>Nationality: "+profiles[i].nationality+"</p>"+
																				"<p>National Team: "+profiles[i].national_team+"</p>"+
																				"<p>Agent: "+profiles[i].agent+"</p>"
																				).css({
																							"border":"1px",
																							"border-style":"solid",
																							"border-color":"grey"
																				});
					}
				}
					
			});
		}
	});//End Form1

	//Table to list league standings
	$("button.list").on("click",function(event){
		event.preventDefault();
		$("#table1_wrapper").remove();
		var table1str = '<table id = "table1" class="display">'+
				'<thead>'+
					'<tr>'+
						"<th>Position</th>"+
						'<th>Team Name</th>'+
						'<th>Matches Played</th>'+
						'<th>Points</th>'+
					'</tr>'+
				'</thead>'+
				'<tbody>'+
				'</tbody>'+
			'</table>';

		$(table1str).appendTo("#table_1");

		$("#table1").DataTable({
			"ajax" : {
				"url" : "https://sportsop-soccer-sports-open-data-v1.p.mashape.com/v1/leagues/serie-a/seasons/15-16/standings",
				"dataSrc" : "data.standings",
				"type" : "GET",
				"headers" : {"X-Mashape-Key": "bilVMebejrmshNXfDlOtYvNUOxjAp1pY0GEjsn7LV5xmaJ8Dwq"}
			},
			"columns":[
				{ "data": "position",
					"sClass": "center"},
        { "data": "team",
        	"sClass": "center"},            
        { "data": "overall.macthes_played",
      		"sClass": "center"},
        { "data": "overall.points",
        	"sClass": "center"}
      ],
      "order" : [[0,"asc"]],
      select: true
    });
	});

	//Table to list topscorers in descending order
	$("button.topscore").on("click",function(event){
		event.preventDefault();
		$("#table2_wrapper").remove();

		var table2 = '<table id = "table2" class="display">'+
				'<thead>'+
					'<tr>'+
						'<th>Player</th>'+
						'<th>Goals</th>'+
				'</tr>'+
				'</thead>'+
				'<tbody>'+					
				'</tbody>'+
			'</table>';
		$(table2).appendTo("#table_2");

		$("#table2").DataTable({
			"ajax": {
				"url": "https://sportsop-soccer-sports-open-data-v1.p.mashape.com/v1/leagues/serie-a/seasons/15-16/topscorers",
				"dataSrc" : "data.topsorers",
				"type": "GET",
				"headers": {"X-Mashape-Key": "bilVMebejrmshNXfDlOtYvNUOxjAp1pY0GEjsn7LV5xmaJ8Dwq"}
			},
			"columns": [
				{"data":"fullname",
				 "sClass":"center"},
				{"data":"goals",
				 "sClass":"center"}
			],
			"order" : [[1,"desc"]]
		});
	});
});//End Main 


//var teams = response["teams"];
//var marketVal = response.squadMarketValue;
//console.log(response);
// for(var i=0;i<teams.length;i++)
// $("#table1 tbody").append("<tr><td>"+teams[i].shortName +"</td><td>" + teams[i].squadMarketValue + "</td> <td>test</td></tr>");
		