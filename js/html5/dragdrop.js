document.addEventListener("DOMContentLoaded", () => {
    // 🔹 Drag & Drop API

    const dragMe = document.getElementById("dragMe");
    const dropZone = document.getElementById("dropZone");

    // Húzható elem: kezdő esemény
    dragMe.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", "draggedBox");
        console.log("🔴 Elem húzása megkezdve");
    });

    // Drop zóna: engedélyezzük a ráejtést
    dropZone.addEventListener("dragover", (e) => {
        e.preventDefault(); // szükséges a drop-hoz
        dropZone.style.background = "#eef";
    });

    // Drop zóna: elhagyás esetén háttér visszaállítása
    dropZone.addEventListener("dragleave", () => {
        dropZone.style.background = "";
    });

    // Drop esemény: pontos pozícionálás
    dropZone.addEventListener("drop", (e) => {
        e.preventDefault();

        const data = e.dataTransfer.getData("text/plain");
        if (data === "draggedBox") {
            // Beállítjuk relatív pozícionálással a dobás helyét
            const zoneRect = dropZone.getBoundingClientRect();

            const x = e.clientX - zoneRect.left;
            const y = e.clientY - zoneRect.top;

            dragMe.style.position = "absolute";
            dragMe.style.left = x - dragMe.offsetWidth / 2 + "px";
            dragMe.style.top = y - dragMe.offsetHeight / 2 + "px";

            // Biztosítjuk, hogy a dropZone legyen relatív konténer
            dropZone.style.position = "relative";
            dropZone.appendChild(dragMe);

            dropZone.style.background = "#dfd";
            console.log(`✅ Elem elhelyezve: (${x}, ${y})`);
        }
    });

    console.log("🟦 dragdrop.js betöltve");
});
