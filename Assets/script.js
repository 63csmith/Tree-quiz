let secondsEl = document.getElementById("seconds");
let startBtn = document.getElementById("start-btn");
let questionDiv = document.getElementById("questions");
let nextBtn = document.getElementById("next")
let scoreList = document.getElementById("score-list")
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");
let quizQuestions = [{
    question: "Does a tree make a noise when it falls?",
    choiceA: "As many as you want",
    choiceB: "3",
    choiceC: "1",
    choiceD: "128",
    correctAnswer: "c"},

];

var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 76;
var timerInterval;
var score = 0;
var correct;

questionDiv.style.visibility = "hidden"


function startQuiz() {
    startBtn.style.visibility = "hidden"
    questionDiv.style.visibility = "visible"
    timer = 3;
    score = 0;
    let gameTimer = setInterval(() => {
        timer--
        secondsEl.textContent = "Time Remaining: " + timer;
        
        if (timer === 0) {
            
            clearInterval(gameTimer)
            endGame()
        }
        
    }, 1000);
}

function getQuestions(){
    //     if (currentQuestionIndex === finalQuestionIndex){
    //     return showScore();
    // } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionDiv.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};



function endGame() {
    console.log("game over")
    secondsEl.textContent = "Time Remaining: 0";
    startBtn.style.visibility = "visible"
    var initials = prompt("Your score is: " + score + "\nPlease enter your Initials!")
    var currentScores = JSON.parse(localStorage.getItem('score')) || []
    var userObj = {
        initials,
        score
    }
    
    currentScores.push(userObj)
    localStorage.setItem("score", JSON.stringify(currentScores))
    renderScores()
}

function renderScores() {
    var currentScores = JSON.parse(localStorage.getItem("score")) || []
    // scoreList.removeChild();
        for (var i = 0; i < currentScores.length; i++) {
            var scoreObj = currentScores[i];
            var newLi = document.createElement("li", {
                class: "list-group-item"
            })
            newLi.textContent = scoreObj.initials + '-----------' + scoreObj.score;
            
            scoreList.append(newLi)
            
        }
    }
    
    //Event-Listener 
    startBtn.addEventListener("click", function(){
        startQuiz();
        getQuestions();
    })
