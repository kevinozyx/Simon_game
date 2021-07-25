let buttonColours = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
var level = 1;
var start = false;
var highScore = 0;

$("body").keypress(function() {
  if (!start) {
    nextSequence(level);
    start = true;
    userClickedPattern = [];
  }
});



$(".btn").click(function() {
  if (start) {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    makeSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    if (gamePattern.length == userClickedPattern.length) {
      if (level > highScore) {
        highScore = level;
        $("#high-score").html("High Score: " + highScore)
      }
      level++;
      setTimeout(function() {
        nextSequence(level)
      }, 1000);
      userClickedPattern = [];
    }
  }
});


function nextSequence(level) {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  makeSound(randomChosenColour);
  $("#level-title").html("Level " + level);
}



function makeSound(button) {
  var sound = new Audio('sounds/' + button + '.mp3').play();
}

function animatePress(currentColour) {
  makeSound(currentColour);
  var activeButton = document.querySelector("#" + currentColour);
  activeButton.classList.add("pressed");
  setTimeout(function() {
    activeButton.classList.remove("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] != userClickedPattern[currentLevel]) {
    var gameOverMP3 = new Audio('sounds/wrong.mp3').play();
    $("#level-title").html("Game Over, Press Any Key to Restart")
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);
    startOver();
  }
}

function startOver() {
  level = 1;
  gamePattern = [];
  start = false;
}

// high score (additional feature)
