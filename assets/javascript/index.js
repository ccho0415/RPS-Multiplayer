console.log("hi");
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDQVu06TGTWcvConzQ0WWC08AZOmhjAIsU",
    authDomain: "rps-multiplayer-a7a5c.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-a7a5c.firebaseio.com",
    storageBucket: "rps-multiplayer-a7a5c.appspot.com",
    messagingSenderId: "687688931226"
  };
 firebase.initializeApp(config);
var database = firebase.database();
var users = [];
var username = "";
var wins = 0;
var losses = 0;
var ties = 0;
$(document).ready( function(){
  $("#user").show();
  $("#gameField").hide();
  $("#score").hide();
});

database.ref("users/").on("value", function(snapshot){ 
  let data = snapshot.val();
  for (let entry in data) {
    console.log(entry);
    $("#dummy").text(entry);
  }
  // console.log(snapshot.val());
  // $("#dummy").text(snapshot.val().username);
});
$("#addName").on("click", function(){
  event.preventDefault();
  console.log("hi I work");
  username = $("#nameInput").val().trim();
  console.log(username);
  database.ref("users/" + username).set({
	 username: username,
   wins: wins,
   losses: losses,
   ties: ties
});
  return false;
});
