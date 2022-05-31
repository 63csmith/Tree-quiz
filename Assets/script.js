//selecting elements from the html
var scoresButton = document.getElementById("high-scores-button");
var timerElement = document.getElementById("timer");
var startScreen = document.querySelector(".start-screen");
var startButton = document.getElementById("start-button");
var quizElement = document.querySelector(".quiz");
var questionElement = document.getElementById("question");
var answerButton = document.querySelectorAll(".answer-button");
var validationElement = document.getElementById("validation");
var gameOverElement = document.querySelector(".game-over");
var playerScoreElement = document.getElementById("player-score");
var initialsInputElement = document.querySelector("#initials-input");
var submitButton = document.querySelector("#submit-score");
var highScoresElement = document.querySelector(".high-scores");
var scoresListElement = document.getElementById("scores-list");
var playAgainButton = document.getElementById("play-again");


//setting the start page
quizElement.style.display = "none";
gameOverElement.style.display = "none";
highScoresElement.style.display = "none";

//high score list 
var highScoresArray = JSON.parse(localStorage.getItem("high-scores")) ?? [];
var highScores = [];
var numHighScores = highScores.length;

var player = {
    score: 0,
    initials: ""
}

//question bank
var question1 = {
    title: "What is a deciduous tree?",
    choices: ["A tree that has blossoms", "A tree that has its leafs year round", "A tree that produces fruit", "A tree that loses all leaves each autumn"],
    answer: "A tree that loses all leaves each autumn"
}
var question2 = {
    title: " Which of the following is a simple way to know the age of most trees?",
    choices: ["To measure the height of the tree", "To calculate the DBH", "To count the number of rings on the trunk", "To look at it"],
    answer: "To count the number of rings on the trunk"
}
var question3 = {
    title: "The Magnolia tree is native to which continent?",
    choices: ["Africa", "South America", "Europe", "Australia"],
    answer: "South America"
}
var question4 = {
    title: "Why do trees produce resin?",
    choices: ["To protect against pathogens and insects", "To spread their seed", "To release waste", "To grow"],
    answer: "To protect against pathogens and insects"
}
var question5 = {
    title: "Approximately how much of the worlds land surface is covered by trees?",
    choices: ["30 percent", "60 percent", "10 percent", "20 percent"],
    answer: "30 percent"
}
var question6 = {
    title: "Which of the following words refers to a scientist who studies trees?",
    choices: ["Arborist", "Botanist", "Dendrologist", "Treeologist"],
    answer: "Dendrologist"
}
var question7 = {
    title: "Which of the following trees does NOT produce nuts?",
    choices: ["Hazel", "Hickory", "Juniper", "Almond"],
    answer: "Juniper"
}
var questions = [question1, question2, question3, question4, question5, question6, question7];

//global variables
var timeInterval;
var randomNum;
var currentQuestion;
var secondsLeft = 100;

//timer
function timer() {
    timeInterval = setInterval(function () {
        timerElement.textContent = "Time: " + secondsLeft;
        secondsLeft--;

        if (secondsLeft <= 0) {
            clearInterval(timeInterval)
            gameOver()
        }
    }, 1000);
}
function startQuiz() {
    secondsLeft = 100;
    startScreen.style.display = "none";
    highScoresElement.style.display = "none";
    timerElement.style.display = "block";
    quizElement.style.display = "flex";
    validationElement.textContent = "";
    timer();
    writeQuestion();
}

// handles displaying a question
function writeQuestion() {
    randomNum = Math.floor(Math.random() * questions.length);
    // removes random question from array and saves it to variable
    currentQuestion = questions.splice(randomNum, 1);

    // displays question
    questionElement.textContent = currentQuestion[0].title;

    // quiz buttons
    for (var i = 0; i < currentQuestion[0].choices.length; i++) {
        var answerButton = document.createElement("button");
        answerButton.textContent = currentQuestion[0].choices[i];
        answerButton.setAttribute("class", "answer-button btn btn-success m-2 text-left");
        questionElement.appendChild(answerButton);
        answerButton.addEventListener("click", updateAnswer);
    }
}

// checks answer 
function updateAnswer(event) {
    var selection = event.target.textContent;
    if (selection !== currentQuestion[0].answer) {
        secondsLeft -= 10;
        validationElement.textContent = "Wrong!"
    }
    else {
        validationElement.textContent = "Correct!"
    }
    newQuestion();
}

// triggers end-game
function newQuestion() {
    if (questions.length === 1) {
        gameOver()
    }
    else {
        writeQuestion()
    }
}

// ends game
function gameOver() {
    clearInterval(timeInterval);
    quizElement.style.display = "none"
    gameOverElement.style.display = "flex";
    timerElement.textContent = "Timer: " + secondsLeft;
    player.score = secondsLeft;
    secondsLeft = 100;
    playerScoreElement.textContent = player.score;
    questions = [question1, question2, question3, question4, question5, question6, question7];
}

// gets initials 
function updateInitials(event) {
    player.initials = this.value;
}


// displays the high-score list
function writeHighScores() {
    startScreen.style.display = "none";
    quizElement.style.display = "none";
    gameOverElement.style.display = "none";
    highScoresElement.style.display = "flex";
    clearInterval(timeInterval);
    scoresListElement.innerHTML = "";
    highScoresArray = JSON.parse(localStorage.getItem("high-scores")) ?? [];
    console.log((localStorage.getItem("high-scores")))
    for (var i = 0; i < highScoresArray.length; i++) {
        var highScore = document.createElement("li");
        highScore.textContent = highScoresArray[i].initials + " - " + highScoresArray[i].score;
        scoresListElement.appendChild(highScore);
    }
}

// high-score function
function updateHighScore(player) {
    highScores = JSON.parse(localStorage.getItem("high-scores")) ?? [];
    highScores.push(player);
    highScores.sort((a, b) => b.score - a.score);
    localStorage.setItem("high-scores", JSON.stringify(highScores));
}

startButton.addEventListener("click", startQuiz)

playAgainButton.addEventListener("click", function () {
    questions = [question1, question2, question3, question4, question5, question6, question7];
    startQuiz();
})

scoresButton.addEventListener("click", writeHighScores);

submitButton.addEventListener("click", function () {
    if (initialsInputElement.value === "") {
        alert("Please enter your name")
    } else {
        player.initials = initialsInputElement.value;
        initialsInputElement.value = "";
        
        updateHighScore(player);
        writeHighScores();
    }
});