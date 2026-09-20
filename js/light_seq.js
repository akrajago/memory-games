const lightSequence = document.getElementById("sequence");
const circlesClicked = document.getElementById("circles-clicked");
const startButton = document.querySelector(".start-button");
const returnButton = document.querySelector(".return-button");
const ruleButton = document.querySelector(".rule-button");
const scoreModal = document.querySelector(".score-modal");
const ruleModal = document.querySelector(".rule-modal");
const score = document.querySelector(".score");
const circles = document.querySelectorAll(".circle");

const numCircles = 4;
let currentRound = 0;
let currentIndex = 0;
let gameSequence = [];
let userSequence = [];
let lockSequence = true;

startButton.addEventListener("click", function() {
    startButton.classList.add("hidden");
    currentRound = 0;
    gameSequence = [];
    userSequence = [];
    playRound();
});

returnButton.addEventListener("click", function() {
    scoreModal.close();
});

ruleButton.addEventListener("click", function() {
    ruleButton.blur();
    ruleModal.showModal();
})

function displayModal() {
    score.textContent = `Score: ${currentRound - 1}`;
    scoreModal.showModal();
}

function playRound() {
    lockSequence = true;
    userSequence = [];
    currentRound += 1;
    document.body.classList.add("active-seq");
    circlesClicked.textContent = "Circles clicked: 0";

    // Add (the index of) a circle to the light sequence
    let randChoice = Math.floor(numCircles * Math.random());
    gameSequence.push(randChoice);

    let delay = 1000;
    let totalDelay = 1000 * currentRound + delay;

    for (const i of gameSequence) {
        setTimeout(() => {
            circles[i].classList.add("glow");
            setTimeout(() => {
                circles[i].classList.remove("glow");
            }, 500);
        }, delay);

        delay += 1000;
    }

    // Allow user selection after sequence is played
    setTimeout(() => {
        lockSequence = false;
        document.body.classList.remove("active-seq");
        currentIndex = 0;
    }, totalDelay);
}

lightSequence.addEventListener("click", function(e) {
    if (lockSequence) {
        return;
    }

    if (e.target.classList.contains("circle")) {
        userSequence.push(e.target);

        // End game if user selection is incorrect
        if (userSequence[currentIndex] != circles[gameSequence[currentIndex]]) {
            lockSequence = true;
            e.target.blur();
            circlesClicked.textContent = "";
            startButton.classList.remove("hidden");
            displayModal();
            return;
        }

        circlesClicked.textContent = `Circles clicked: ${currentIndex + 1}`;

        // Player can get the correct sequence and rapidly press circles after
        if (userSequence.length >= currentRound) {
            lockSequence = true;
            setTimeout(() => {
                playRound();
            }, 1000);
        } else {
            currentIndex += 1;
        }
    }
});

