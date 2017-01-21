// Online Status Should work as long as the user does not make multiple users in one session? (I'm not 100% sure about this one);
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
var onlineStatus = [];
var dataobj={};
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
  let uid = username;
  let status = 0;
  database.ref("users/"+ uid).update({
    onlineStatus: status
  });
});
// Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser){
    let uid = firebaseUser.uid;
    let email = firebaseUser.email;
    let wins = 0;
    let losses = 0;
    let ties = 0;
    let status = 1;
    username = uid;
    database.ref("users/" + uid).set({
      username: uid,
      email: email,
      wins: wins,
      losses: losses,
      ties: ties,
      onlineStatus: status
    });
    btnLogout.removeClass("hide");
    trainers.removeClass("hide");
  } else{
    console.log("not logged in");
    btnLogout.addClass("hide");
    trainers.addClass("hide");
  }
});
//Pushing Online Status onto an Array on Firebase called Online Status
database.ref("users/").on("value", function(snapshot){ 
  let data = snapshot.val();
  $.each(data, function(index, val){
    let online = val.onlineStatus;
    let username= val.username;
    if (online === 1){
      database.ref("onlineUsers/"+username).update({
        online:online
      });
    // Display loading screen here

// Removing Users if they are not online
    }else{
      database.ref("onlineUsers/"+username).remove();
    }
  });
});
database.ref("onlineUsers/").on("value", function(snapshot){
  let data = snapshot.val();
// extracted user names
 let usersArr= Object.keys(data); 
 let user1= usersArr[0];
 let user2= usersArr[1];
  // for(value in data){
  //   console.log(value);
  //   let username = (data[value]);
  //   console.log(username);

  // }
  // Make it so that it properly prints out user names
  if (usersArr.length == 2) {
    console.log("hi!");
    //Start the Game here!
    database.ref("games/"+"game1").set({
      user1: user1,
      user1hp: 5,
      user1click: "nothing",
      user2: user2,
      user2hp: 5,
      user2click: "nothing"
    });

  }else{
    console.log("not hi!");
  }
});
// Game JS
var charmander = $("#rockModel");
var squirtle = $("#paperModel");
var bulbasaur = $("scissorsModel");
var charmanderClick  = 0;
var squirtleClick = 0;
var bulbasaurClick = 0;
let user1 = "";
let user2 = "";
let userclick = "";
let user1click = 0;
let user2click = 0;
database.ref("games/"+"game1").on("value", function(snapshot){
  user1 = snapshot.val().user1;
  user2 = snapshot.val().user2;
  user1click = snapshot.val().user1click;
  user2click = snapshot.val().user2click;
});
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user.uid);
  } else {
    console.log(nope);
  }
});

charmander.on("click", function(event){
    charmanderClick = 1;
    userclick= charmanderClick;
    console.log(user1);
    firebase.auth().onAuthStateChanged(function(user) {
      if (user.uid == user1) {
        database.ref("games/"+"game1").update({
          user1click: userclick
        });
      } else if (user.uid == user2) {
        database.ref("games/"+"game1").update({
          user2click: userclick
        });
      }
    });

  });
  squirtle.on("click", function(event){
    squirtleClick = 2;
    userclick = squirtleClick;
    console.log(squirtleClick);
    firebase.auth().onAuthStateChanged(function(user) {
      if (user.uid == user1) {
        database.ref("games/"+"game1").update({
          user1click: userclick
        });
      } else if (user.uid == user2){
        database.ref("games/"+"game1").update({
          user2click: userclick
        });
      }
    });    
  });
  bulbasaur.on("click", function(event){
    bulbasaurClick =3;
    userclick = bulbasaurClick;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user.uid == user1) {
        database.ref("games/"+"game1").update({
          user2click: userclick
        });
      } else if (user.uid == user2){
        database.ref("games/"+"game1").update({
          user2click: userclick
        });
      }
    });
  });
  if (user1click == charmanderClick && user2click == squirtleClick){
          alert('user 2 won');
  }else if(user1click == bulbasaurClick && user2click == squirtleClick){
          alert('user 1 won');
  }else if(user1click == squirtleClick && user2click == charmanderClick){
          alert('user 1 won');
  }else if(user1click == bulbasaurClick && user2click == charmanderClick){
          alert('user 2 won');
  }else if(user1click == charmanderClick && user2click == bulbasaurClick){
          alert('user 1 won');
  }else if(user1click == squirtleClick && user2click == bulbasaurClick){
          alert('user 2 won');
  }else if(user1click == charmanderClick && user2click == charmanderClick){
          alert('this is a tie');
  }else if(user1click == squirtleClick  && user2click == squirtleClick ){
          alert('this is a tie');
  }else if(user1click == bulbasaurClick && user2click == bulbasaurClick)
          alert('this is a tie');   
}
// $("#test").on("click", function(){
//   process();
// });
