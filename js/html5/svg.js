document.addEventListener("DOMContentLoaded", () => {
    // 🔹 SVG API – interaktív grafika

    const svg = document.getElementById("svgArea");

    // SVG területre kattintva új kört helyezünk el
    svg.addEventListener("click", (e) => {
        const rect = svg.getBoundingClientRect();

        // Egérpozíció SVG koordinátára alakítása
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Kör létrehozása
        const newCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        newCircle.setAttribute("cx", x);
        newCircle.setAttribute("cy", y);
        newCircle.setAttribute("r", 20);
        newCircle.setAttribute("fill", "purple");

        svg.appendChild(newCircle);

        console.log(`🟣 Új kör létrehozva: (${x}, ${y})`);
    });

    console.log("🟪 svg.js betöltve");
});
