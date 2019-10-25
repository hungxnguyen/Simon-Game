// 3. Create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .
var buttonColours = ["red", "blue", "green", "yellow"];

// 5. Create a new empty array called gamePattern.
var gamePattern = [];

// 11. Create a new empty array with the name userClickedPattern.
var userClickedPattern = [];

// 20B. Create variable to keep track of whether if the game has started or not, so only nextSequence() is called on the first keypress.
var started = false;

// 21. Create a new variable called level and start at level 0.
var level = 0;

// 20A. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().

$(document).on("keypress", function() {
  if (!started) {

    // 22. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-id").text("Level " + level);
    nextSequence();
    started = true;
  }
})

// 10. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").on("click", function() {

  // 11. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");

  // 12. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  // 26. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});

// 25. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

  //27. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    // 28. If the user got the most recent answer right in step 27, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {

      // 29. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {

    console.log("wrong");

    // 31. Play this sound wrong.mp3 if the user got one of the answers wrong.
    playSound("wrong");

    // 32. Add .game-over to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    // 33. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
    $("#level-title").text("Game Over. Press Any Key to Restart");

    // 35. Call startOver() if the user gets the sequence wrong.
    startOver();
  }

}

// 1. Create a new function called nextSequence()
function nextSequence() {

  // 30. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  // 23. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;

  // 24. Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

  // 2. Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
  var randomNumber = Math.floor(Math.random() * 4);

  // 4. Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
  var randomChosenColour = buttonColours[randomNumber];

  // 6. Add the new randomChosenColour generated in step 4 to the end of the gamePattern.
  gamePattern.push(randomChosenColour);

  // 7. Use jQuery to select the button with the same id as the randomChosenColour
  // 8. Use Google/stackoverflow to figure out how to use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // 16. Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
  playSound(randomChosenColour);
}

// 13. Create a new function called playSound() that takes a single input parameter called name.
function playSound(name) {

  // 9. Use Google/Stackoverflow to figure out how to use Javascript to play the sound for the button colour selected in step 1.
  // 14. Take the code used to play sound in the nextSequence() function and move it to playSound().
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// 17. Create a new function called animatePress(), should take a single input parameter called currentColour.
function animatePress(currentColour) {

  // 18. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColour).addClass("pressed");

  // 19. Use Google/Stackoverflow to figure out how to use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// 35 Create a new function called startOver().
function startOver() {

  // 36. Inside this function, reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
