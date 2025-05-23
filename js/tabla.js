// Várunk, míg az oldal teljesen betöltődik
window.addEventListener("DOMContentLoaded", () => {
    console.log("script.js betöltve");

    const form = document.getElementById("addForm");
    const tableBody = document.querySelector("#dataTable tbody");

    // Itt tároljuk, hogy van-e éppen szerkesztett sor
    let szerkesztettSor = null;

    // Űrlap elküldése (Hozzáadás vagy Módosítás)
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // ne töltse újra az oldalt

        // Mezők értékei
        const name = document.getElementById("name").value.trim();
        const age = document.getElementById("age").value;
        const height = document.getElementById("height").value;
        const weight = document.getElementById("weight").value;

        // Ha éppen egy sort szerkesztünk
        if (szerkesztettSor) {
            // Frissítjük a sor tartalmát
            szerkesztettSor.cells[0].textContent = name;
            szerkesztettSor.cells[1].textContent = age;
            szerkesztettSor.cells[2].textContent = height;
            szerkesztettSor.cells[3].textContent = weight;

            // Szerkesztési állapot visszaállítása
            szerkesztettSor = null;
        } else {
            // Új sor létrehozása
            const row = document.createElement("tr");

            // Cellák hozzáadása
            row.innerHTML = `
                <td>${name}</td>
                <td>${age}</td>
                <td>${height}</td>
                <td>${weight}</td>
                <td>
                    <button class="editBtn">Szerkesztés</button>
                    <button class="deleteBtn">Törlés</button>
                </td>
            `;

            // Törlés gomb eseménykezelője
            row.querySelector(".deleteBtn").addEventListener("click", function () {
                row.remove();
            });

            // Szerkesztés gomb eseménykezelője
            row.querySelector(".editBtn").addEventListener("click", function () {
                // Mezők kitöltése a kiválasztott sor értékeivel
                document.getElementById("name").value = row.cells[0].textContent;
                document.getElementById("age").value = row.cells[1].textContent;
                document.getElementById("height").value = row.cells[2].textContent;
                document.getElementById("weight").value = row.cells[3].textContent;

                // Megjegyezzük, hogy melyik sort szerkesztjük
                szerkesztettSor = row;
            });

            // Sor hozzáadása a táblázathoz
            tableBody.appendChild(row);
        }

        // Mezők ürítése
        form.reset();
    });

    // Keresés megvalósítása (nem az űrlapon belül!)
    document.getElementById("searchInput").addEventListener("input", function () {
        const keresett = this.value.toLowerCase();
        const sorok = tableBody.querySelectorAll("tr");

        sorok.forEach(row => {
            const szoveg = row.textContent.toLowerCase();
            if (szoveg.includes(keresett)) {
                row.style.display = ""; // megjelenítjük
            } else {
                row.style.display = "none"; // elrejtjük
            }
        });
    });
    
    // Rendezés megvalósítása
    let rendezesAllapot = {}; // oszlopindex → növekvő/csökkenő

    document.querySelectorAll(".sortable").forEach(header => {
        header.addEventListener("click", () => {
            const oszlopIndex = parseInt(header.dataset.index);
            const sorok = Array.from(tableBody.querySelectorAll("tr"));

            // Rendezés iránya váltogatva
            const novekvo = !rendezesAllapot[oszlopIndex];
            rendezesAllapot[oszlopIndex] = novekvo;

            sorok.sort((a, b) => {
                const aSzoveg = a.cells[oszlopIndex].textContent.toLowerCase();
                const bSzoveg = b.cells[oszlopIndex].textContent.toLowerCase();

                const aSzam = parseFloat(aSzoveg);
                const bSzam = parseFloat(bSzoveg);

                // Számként rendezzük, ha lehet, különben szövegként
                const eredmeny = (!isNaN(aSzam) && !isNaN(bSzam))
                    ? aSzam - bSzam
                    : aSzoveg.localeCompare(bSzoveg);

                return novekvo ? eredmeny : -eredmeny;
            });

            // Töröljük a korábbi sorokat és újrarendereljük
            tableBody.innerHTML = "";
            sorok.forEach(sor => tableBody.appendChild(sor));
        });
    });
});