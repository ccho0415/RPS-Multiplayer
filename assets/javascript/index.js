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
// DOM Elements
var emailInput = $("#emailInput");
var passwordInput = $("#passwordInput");
var btnLogin = $("#btnLogin");
var btnSignUp = $("#btnSignUp");
var btnLogout = $("#btnLogout");
var trainers = $("#trainers");
var charmander = $("#rockModel");
var squirtle = $("#paperModel");
var bulbasaur = $("scissorsModel");
// Global Vars
var database = firebase.database();
var provider = new firebase.auth.GoogleAuthProvider();
var username = "";
var wins = 0;
var losses = 0;
var ties = 0;
$(document).ready( function(){
  $("#user").show();
  $("#gameField").show();
  $("#score").show();
});

// Sign Up Event
btnSignUp.click(e=>{
  // Check for Real Email
  // Get signup info
  let email = emailInput.val().trim();
  let pass = passwordInput.val().trim();
  let auth = firebase.auth();
  let promise =  auth.createUserWithEmailAndPassword(email,pass);
  promise.catch(e => console.log(e.message));
});
// Login Event
btnLogin.click( e => {
  console.log("hi I work");
  // Get login info
  let email = emailInput.val().trim();
  let pass = passwordInput.val().trim();
  let auth = firebase.auth();
  let promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));

  return false;
});
btnLogout.click(e=>{
  firebase.auth().signOut();
});
function startGame(){
  if (user1 == charmander && user2 == squirtle){
          console.log('user 2 won');
  }else if(user1 == bulbasaur && user2 == squirtle){
          console.log('user 1 won');
  }else if(user1 == squirtle && user2 == charmander){
          console.log('user 1 won');
  }else if(user1 == bulbasaur && user2 == charmander){
          console.log('user 2 won');
  }else if(user1 == charmander && user2 == bulbasaur){
          console.log('user 1 won');
  }else if(user1 == squirtle && user2 == bulbasaur){
          console.log('user 2 won');
  }else if(user1 == charmander && user2 == charmander){
          console.log('this is a tie');
  }else if(user1 == squirtle  && user2 == squirtle ){
          console.log('this is a tie');
  }else if(user1 == bulbasaur && user2 == bulbasaur)
          console.log('this is a tie'); 
};
// Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser){
    console.log(firebaseUser);
    btnLogout.removeClass("hide");
    trainers.removeClass("hide");
  } else{
    console.log("not logged in");
    btnLogout.addClass("hide");
    trainers.addClass("hide");
  }
});
// Obtaining UID information
  // let user =firebase.auth().currentUser;
  // let uid;
  // if (user!=null){
  //   uid = user.uid;
  //   console.log(uid);
  // }
  //   console.log(username);
//   database.ref("users/" + uid).set({
//   username: uid,
//    email: email,
//    wins: wins,
//    losses: losses,
//    ties: ties
// });
