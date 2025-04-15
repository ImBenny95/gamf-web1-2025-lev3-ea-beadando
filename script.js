// Várunk, míg az oldal teljesen betöltődik
window.addEventListener("DOMContentLoaded", () => {
    console.log("script.js betöltve");
    const form = document.getElementById("addForm");
    const tableBody = document.querySelector("#dataTable tbody");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // ne töltse újra az oldalt

        // Mezők értékei
        const name = document.getElementById("name").value.trim();
        const age = document.getElementById("age").value;
        const height = document.getElementById("height").value;
        const weight = document.getElementById("weight").value;

        // Új sor létrehozása
        const row = document.createElement("tr");

        // Cellák hozzáadása
        row.innerHTML = `
            <td>${name}</td>
            <td>${age}</td>
            <td>${height}</td>
            <td>${weight}</td>
            <td><button class="deleteBtn">Törlés</button></td>
        `;

        // törlés
        row.querySelector(".deleteBtn").addEventListener("click", function () {
            row.remove();
        });

        // Sor hozzáadása a táblázathoz
        tableBody.appendChild(row);

        // Mezők ürítése
        form.reset();
    });
});