var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;


$(".btn").click(handler);


$(document).keypress(function() {
  if (started == false) {

    started = true;
    $("h1").text("level " + level);
    nextSequence();
  }
});

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("correct");

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {

    playSound("wrong");
    $(document).addClass("game-over");

    setTimeout(function() {
      $(document).removeClass("game-over");
      $("h1").text("Game Over, Press Any Key to Restar");
    }, 200);

    startOver();

  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function handler() {
  console.log(this);
  var userChosenChoice = $(this).attr("id");
  userClickedPattern.push(userChosenChoice);
  playSound(userChosenChoice);
  animatePress(userChosenChoice);

  checkAnswer(userClickedPattern.length - 1);
}

function startOver()
{
  level=0;
  gamePattern=[];
  started=false;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
