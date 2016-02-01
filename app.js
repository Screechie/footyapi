//$()- shorthand for $(document).ready()
$(function(){

	//Set Autocompletion for teams
		$("#roster").autocomplete({
			source: function(request,response){
				$.ajax({
					headers:{"X-Mashape-Key": "bilVMebejrmshNXfDlOtYvNUOxjAp1pY0GEjsn7LV5xmaJ8Dwq"},
					url: "https://sportsop-soccer-sports-open-data-v1.p.mashape.com/v1/leagues/serie-a/seasons/15-16/teams",
					dataType: "json",
					type: "GET"
				}).done(function(data){
					response.data;
				});
			} 
		});

	//Table to list a team's available players
	$("#form").on("submit",function(event){

		event.preventDefault();

		var team = $('#roster').val();//Get Team	

		if(team == ""){
			alert("Please enter a team name!");//No empty team field
		}
		else{
			$('#table3').dataTable({
				//return team squad
				"ajax" :{
					"headers": {"X-Mashape-Key": "bilVMebejrmshNXfDlOtYvNUOxjAp1pY0GEjsn7LV5xmaJ8Dwq"},
				 	"url": "https://sportsop-soccer-sports-open-data-v1.p.mashape.com/v1/leagues/serie-a/seasons/15-16/teams/"+team+"/players",
				 	"dataSrc": "data.players",
				 	"type": "GET",
				},
				"columns" :[
					{"data" :"team"},
					{"data" :"name"},
				 	{"data" :"fullname" },
				 	{"data" :"nationality" },
				 	{"data" : "position"},
				 	{"data" : "number"}
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


			
			});
		}
	});//End Form1

	//Table to list league standings
	$("button.list").on("click",function(event){
		event.preventDefault();
		$("#table1").DataTable({
			"ajax" : {
				"url" : "https://sportsop-soccer-sports-open-data-v1.p.mashape.com/v1/leagues/serie-a/seasons/15-16/standings",
				"dataSrc" : "data.standings",
				"type" : "GET",
				"headers" : {"X-Mashape-Key": "bilVMebejrmshNXfDlOtYvNUOxjAp1pY0GEjsn7LV5xmaJ8Dwq"}
			},
			"columns":[
				{ "data": "position" },
        { "data": "team" },            
        { "data": "overall.macthes_played"},
        { "data": "overall.points" }
      ],
      "order" : [[0,"asc"]],
      select: true
    });
	});

	//Table to list topscorers in descending order
	$("button.topscore").on("click",function(event){
		event.preventDefault();

		$("#table2").DataTable({
			"ajax": {
				"url": "https://sportsop-soccer-sports-open-data-v1.p.mashape.com/v1/leagues/serie-a/seasons/15-16/topscorers",
				"dataSrc" : "data.topsorers",
				"type": "GET",
				"headers": {"X-Mashape-Key": "bilVMebejrmshNXfDlOtYvNUOxjAp1pY0GEjsn7LV5xmaJ8Dwq"}
			},
			"columns": [
				{"data":"fullname"},
				{"data":"goals"}
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
		