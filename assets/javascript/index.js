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
    console.log(firebaseUser);
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
  console.log(data);
  $.each(data, function(index, val){
    let online = val.onlineStatus;
    let username= val.username;
    if (online === 1){
      database.ref("onlineUsers/"+username).set({
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
  let dataobj = JSON.stringify(data);
  let dataArr = dataobj.split(",");
  // Convert into strings and arrays (got the idea from class)
  console.log(data);
  console.log(dataArr);
  if (dataArr.length == 2) {
    console.log("hi!");
    //Start the Game here!
    let user1 = dataArr[0];
    let user2 = dataArr[1];
    database.ref("games/"+"game1").set({
      user1: user1,
      user1hp: 5,
      user1click: "nothing",
      user2: user2,
      user2hp: 5,
      user2click: "nothing"
    })  
  }else{
    console.log("not hi!");
  }
});
  // datastr= JSON.stringify(data, onlineStatus, 4);
  // let dataobj = datastr;
  // console.log(dataobj);
  // for (let property in data){
  //   console.log(property);
  // }