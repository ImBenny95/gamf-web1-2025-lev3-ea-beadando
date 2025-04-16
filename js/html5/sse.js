// 🔹 Server-Sent Events (Node.js alapú szerverről)

document.getElementById("sseStartBtn").addEventListener("click", () => {
    const sseData = document.getElementById("sseData");

    if (!!window.EventSource) {
        const source = new EventSource("http://localhost:3000/events");

        source.onmessage = function (event) {
            sseData.textContent = "Aktuális idő: " + event.data;
        };

        source.onerror = function () {
            sseData.textContent = "❌ Hiba történt a kapcsolatban.";
            source.close();
        };
    } else {
        sseData.textContent = "A böngésződ nem támogatja a Server-Sent Events API-t.";
    }
});
