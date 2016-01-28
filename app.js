//$()- shorthand for $(document).ready()
$(function(){

	
	var player = $('#player').val();//Get Player

	$("#form").on("submit",function(event){
		event.preventDefault();

		var team = $('#roster').val();//Get Team		
		
		if(team == ""){
			alert("Please enter a team name!");//No empty team field
		}
		else{
			//return team squad	

		}	
	});//End Form


	$("#form1").on("submit",function(event){
		event.preventDefault();
		

		if(player == ""){
			alert("Please enter a player's name!");
		}
		else{
		//return player profile
		console.log(player);
		}
	});//End Form1


	$("button.list").on("click",function(event){
		event.preventDefault();
		// List all Teams	
			$.ajax({
					headers: { 'X-Auth-Token': '35ece9681a1d4aea80ea1d8ef98fba35' },
					url: 'http://api.football-data.org/v1/soccerseasons/399/teams',
					dataType: 'json',
					type: 'GET',
			}).done(function(response) {
				var teams = response["teams"];
				for(var i=0;i<teams.length;i++)
					$("#table1 tbody").append("<tr><td>"+teams[i].shortName +"</td> <td>test</td> <td>test</td></tr>");
			}); 					 
		});


});//End Main