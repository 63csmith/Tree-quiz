let secondsEl = $("#seconds");
let startBtn = $("#start-btn");
let questionDiv = $("#questions");
let nextBtn = $("#next")
let scoreList = $("#score-list")
let questions = [
    {
        name: "This is the first question",
        choices: ['1. this is answer 1', '2. this is answer 2']
    },
    {
        name: "This is the second question",
        choices: ['1. this is answer 1 for question 2', '2. this is answer 2']
    }
];

let currentIndex = 0;

function startQuiz() {
    startBtn.hide()
    timer = 3;
    score = 0;
    let gameTimer = setInterval(() => {
        timer--
        secondsEl.text("Time Remaining: " + timer)
        
        if (timer === 0) {
            
            clearInterval(gameTimer)
            endGame()
        }
        
    }, 1000);
}

function getQuestions(){
    questionDiv.attr("src", questions[currentIndex].url)
}


function endGame() {
    console.log("game over")
    secondsEl.text("Time Remaining: 0")
    startBtn.show()
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
    scoreList.empty();
        for (var i = 0; i < currentScores.length; i++) {
            var scoreObj = currentScores[i];
            var newLi = $("<li>", {
                class: "list-group-item"
            })
            newLi.text(scoreObj.initials + '-----------' + scoreObj.score)
            
            scoreList.append(newLi)
            
        }
    }
    
    //Event-Listener 
    startBtn.on("click", function(){
        startQuiz();
        getQuestions();
    })
