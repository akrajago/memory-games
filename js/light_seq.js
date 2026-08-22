const startButton = document.getElementById("start-button");
const lightSequence = document.getElementById("sequence");
const circles = document.querySelectorAll(".circle");
const modal = document.querySelector(".modal-wrapper");

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

function playRound() {
    userSequence = [];
    currentRound += 1;

    // Add a circle to the light sequence
    randChoice = Math.floor(numCircles * Math.random());
    gameSequence.push(randChoice);

    let delay = 0;
    // TODO: change this to "for i in gameSequence"
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
            console.log("game over");
            modal.style.display = "block";
            return;
        }

        // Advance to next round or increment index
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

