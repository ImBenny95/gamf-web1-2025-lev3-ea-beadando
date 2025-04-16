// 🔹 Web Storage (LocalStorage) logika
const input = document.getElementById("storageInput");
const saveBtn = document.getElementById("saveBtn");
const savedText = document.getElementById("savedText");

// Ha van elmentett adat, megjelenítjük
const stored = localStorage.getItem("mentettSzoveg");
if (stored) {
    savedText.textContent = "Elmentve: " + stored;
}

// Mentés gomb eseménykezelő
saveBtn.addEventListener("click", () => {
    const value = input.value;
    localStorage.setItem("mentettSzoveg", value);
    savedText.textContent = "Elmentve: " + value;
});
