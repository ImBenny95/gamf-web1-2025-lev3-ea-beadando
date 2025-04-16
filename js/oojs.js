// oojs.js – Kő-Papír-Olló játék objektumorientált megvalósítással

// Alaposztály: Game
class Game {
    constructor() {
        this.choices = ["ko", "papir", "ollo"];
    }

    getResult(playerChoice, aiChoice) {
        if (playerChoice === aiChoice) return "Döntetlen!";
        if (
            (playerChoice === "ko" && aiChoice === "ollo") ||
            (playerChoice === "papir" && aiChoice === "ko") ||
            (playerChoice === "ollo" && aiChoice === "papir")
        ) {
            return "Nyertél!";
        } else {
            return "Vesztettél!";
        }
    }
}

// Leszármazott: Játékos
class Player extends Game {
    constructor(name) {
        super();
        this.name = name;
    }
}

// Leszármazott: AI (gép)
class AIPlayer extends Game {
    constructor() {
        super();
    }

    randomChoice() {
        const index = Math.floor(Math.random() * this.choices.length);
        return this.choices[index];
    }
}

// DOM elem létrehozása: eredmény megjelenítése
const resultDiv = document.createElement("div");
resultDiv.id = "result";
resultDiv.style.marginTop = "20px";
document.getElementById("content").appendChild(resultDiv);

// Játékos és AI példány
const player = new Player("Te");
const ai = new AIPlayer();

// Gombok eseménykezelése
document.querySelectorAll("button[data-choice]").forEach(btn => {
    btn.addEventListener("click", () => {
        const playerChoice = btn.dataset.choice;
        const aiChoice = ai.randomChoice();
        const outcome = player.getResult(playerChoice, aiChoice);

        resultDiv.innerHTML = `
            <strong>Te:</strong> ${playerChoice.toUpperCase()}<br>
            <strong>Gép:</strong> ${aiChoice.toUpperCase()}<br>
            <strong>Eredmény:</strong> ${outcome}
        `;
    });
});
