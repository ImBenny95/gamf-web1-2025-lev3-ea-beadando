// 🔹 Web Worker - Számok összege 1-től N-ig külön szálon

// Elemek begyűjtése
const numberInput = document.getElementById("numberInput");
const startBtn = document.getElementById("startBtn");
const workerResult = document.getElementById("workerResult");

// Worker példány létrehozása
const worker = new Worker("js/html5/worker.js");

// Gombra kattintva üzenetet küldünk a workernek
startBtn.addEventListener("click", () => {
    const n = parseInt(numberInput.value);
    if (isNaN(n) || n < 1) {
        workerResult.textContent = "Kérlek, adj meg egy pozitív egész számot!";
        return;
    }

    workerResult.textContent = "Számolás folyamatban...";
    worker.postMessage(n); // 💌 Elküldjük a számot a workernek
});

// Ha a worker válaszol, megjelenítjük az eredményt
worker.addEventListener("message", (event) => {
    workerResult.textContent = `Az első ${numberInput.value} szám összege: ${event.data}`;
});
