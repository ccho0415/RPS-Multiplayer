var charmander = $("#rockModel");
var squirtle = $("#paperModel");
var bulbasaur = $("scissorsModel");
var charmanderClick  = 0;
var squirtleClick = 0;
var bulbasaurClick = 0;
var user1, user2;
	charmander.on("click", function(event){
		charmanderClick = 1;
		user1 = charmanderClick;
		console.log(user1);
	});
	squirtle.on("click", function(event){
		squirtleClick = 2;
		user2 = squirtleClick;
		console.log(squirtleClick);
	});
  bulbasaur.on("click", function(event){
    bulbasaurClick =3;
    user = bulbasaurClick;
  });
function process(){
  if (user1 == charmanderClick && user2 == squirtleClick){
          console.log('user 2 won');
  }else if(user1 == bulbasaurClick && user2 == squirtleClick){
          console.log('user 1 won');
  }else if(user1 == squirtleClick && user2 == charmanderClick){
          console.log('user 1 won');
  }else if(user1 == bulbasaurClick && user2 == charmanderClick){
          console.log('user 2 won');
  }else if(user1 == charmanderClick && user2 == bulbasaurClick){
          console.log('user 1 won');
  }else if(user1 == squirtleClick && user2 == bulbasaurClick){
          console.log('user 2 won');
  }else if(user1 == charmanderClick && user2 == charmanderClick){
          console.log('this is a tie');
  }else if(user1 == squirtleClick  && user2 == squirtleClick ){
          console.log('this is a tie');
  }else if(user1 == bulbasaurClick && user2 == bulbasaurClick)
          console.log('this is a tie'); 	
}
$("#test").on("click", function(){
	process();
});
