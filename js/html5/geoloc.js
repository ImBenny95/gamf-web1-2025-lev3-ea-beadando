// 🔹 Geolocation API
const geoBtn = document.getElementById("geoBtn");
const geoResult = document.getElementById("geoResult");

// Helyzet lekérése gombra kattintva...
geoBtn.addEventListener("click", () => {
    console.log("📍 Helyzet lekérése gombra kattintva");

    if (navigator.geolocation) {
        // ✅ A böngésző támogatja a Geolocation API-t
        geoResult.textContent = "Helyzet lekérése folyamatban...";

        navigator.geolocation.getCurrentPosition(
            // ✅ Sikeres helymeghatározás
            position => {
                console.log("✅ Pozíció:", position);
                const lat = position.coords.latitude.toFixed(5);
                const lon = position.coords.longitude.toFixed(5);
                geoResult.textContent = `Szélesség: ${lat}, Hosszúság: ${lon}`;
            },

            // ❌ Hiba történt
            error => {
                let message = "Ismeretlen hiba történt.";

                // Hiba típusa alapján pontosabb üzenet
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        message = "A felhasználó megtagadta a helymeghatározást.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        message = "A helyzet nem elérhető.";
                        break;
                    case error.TIMEOUT:
                        message = "A helymeghatározás túllépte az időkorlátot.";
                        break;
                }

                geoResult.textContent = "Nem sikerült lekérni a helyzetet: " + message;
                console.error("❌ Helymeghatározási hiba:", error);
            }
        );
    } else {
        // ❌ A böngésző nem támogatja
        geoResult.textContent = "A böngésződ nem támogatja a Geolocation API-t.";
    }
});

// Debug információk a konzolra
console.log("geoBtn:", geoBtn, "geoResult:", geoResult, "geolocation support:", navigator.geolocation);
