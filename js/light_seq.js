const startButton = document.getElementById("start-button");
const returnButton = document.getElementById("return-button");
const lightSequence = document.getElementById("sequence");
const circlesClicked = document.getElementById("circles-clicked");
const scoreModal = document.getElementById("score-modal");
const score = document.getElementById("score");
const circles = document.querySelectorAll(".circle");

const numCircles = 4;
let currentRound = 0;
let currentIndex = 0;
let gameSequence = [];
let userSequence = [];
let lockSequence = true;

startButton.addEventListener("click", function() {
    currentRound = 0;
    gameSequence = [];
    userSequence = [];
    playRound();
});

returnButton.addEventListener("click", function() {
    scoreModal.close();
});

function displayModal() {
    score.textContent = `Score: ${currentRound - 1}`;
    scoreModal.showModal();
}

function playRound() {
    userSequence = [];
    currentRound += 1;
    circlesClicked.textContent = "Circles clicked: 0";

    // Add (the index of) a circle to the light sequence
    randChoice = Math.floor(numCircles * Math.random());
    gameSequence.push(randChoice);

    let delay = 0;
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
        currentIndex = 0;
    }, 1000 * currentRound);
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
            displayModal();
            return;
        }

        circlesClicked.textContent = `Circles clicked: ${currentIndex + 1}`;

        // Advance to next round or wait for next user selection
        if (userSequence.length == currentRound) {
            lockSequence = true;
            setTimeout(() => {
                playRound();
            }, 1000);
        } else {
            currentIndex += 1;
        }
    }
});

