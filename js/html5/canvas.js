// Várunk, amíg az oldal teljesen betöltődik
document.addEventListener("DOMContentLoaded", () => {
    // 🔹 Canvas API használata

    // A gomb és a canvas elem kiválasztása
    const rajzolBtn = document.getElementById("rajzolBtn");
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d"); // "2d" kontextus a rajzoláshoz

    // Rajzolás eseménykezelő
    rajzolBtn.addEventListener("click", () => {
        // Töröljük az előző tartalmat
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Téglalap
        ctx.fillStyle = "skyblue";
        ctx.fillRect(10, 10, 100, 60);

        // Kör
        ctx.beginPath();
        ctx.arc(200, 60, 30, 0, 2 * Math.PI);
        ctx.fillStyle = "orange";
        ctx.fill();

        // Szöveg
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Canvas példa", 100, 140);
    });

    // Debug log
    console.log("🎨 canvas.js betöltve, rajzoláshoz készen áll");
});
