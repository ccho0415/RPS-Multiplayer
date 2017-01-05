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
$(document).ready( function(){
  $("#user").show();
  $("#gameField").hide();
  $("#score").hide();
});
database.ref().limitToLast(1).on("value", function(snapshot){
  fire = snapshot.val();
    $("#dummy").html(fire);
});
$("#addName").on("click", function(){
  event.preventDefault();
  console.log("hi I work");
  username = $("#nameInput").val().trim();
  users.push(username);
  console.log(users);
  database.ref().push({
	 username: users
});
  return false;
});
