// 🔹 AJAX – Kódbekérős változat, biztonságosabb megoldás

document.addEventListener("DOMContentLoaded", () => {
    let code = ""; // Globális változóként mentjük el

    const codeInput = document.getElementById("codeInput");
    const authBtn = document.getElementById("authBtn");
    const msgDiv = document.getElementById("msg");

    const form = document.getElementById("form");
    const nameInput = document.getElementById("name");
    const heightInput = document.getElementById("height");
    const weightInput = document.getElementById("weight");

    const idInput = document.getElementById("updateId");
    const getDataBtn = document.getElementById("getDataBtn");
    const updateBtn = document.getElementById("updateBtn");
    const deleteBtn = document.getElementById("deleteBtn");

    const listDiv = document.getElementById("list");
    const statsDiv = document.getElementById("stats");

    // 🟢 Kód megerősítése gombra
    authBtn.addEventListener("click", () => {
        const val = codeInput.value.trim();
        if (val.length < 6) {
            msgDiv.textContent = "❌ Érvénytelen kód!";
            return;
        }

        code = val;
        msgDiv.textContent = "✅ Kód beállítva. Funkciók engedélyezve.";
        readData();
    });

    // 🟦 READ
    function readData() {
        if (!code) return;

        fetch("http://gamf.nhely.hu/ajax2/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `op=read&code=${code}`
        })
        .then(res => res.json())
        .then(data => {
            listDiv.innerHTML = "";
            statsDiv.innerHTML = "";

            let heightSum = 0;
            let heightMax = -Infinity;

            data.list.forEach(item => {
                const p = document.createElement("p");
                p.textContent = `ID: ${item.id} | ${item.name} – Height: ${item.height} | Weight: ${item.weight}`;
                listDiv.appendChild(p);

                const h = parseFloat(item.height);
                heightSum += h;
                if (h > heightMax) heightMax = h;
            });

            const avg = heightSum / data.list.length;

            statsDiv.innerHTML = `
                <strong>Statisztika:</strong><br>
                Összeg: ${heightSum}<br>
                Átlag: ${avg.toFixed(2)}<br>
                Legnagyobb: ${heightMax}
            `;
        });
    }

    // 🟧 CREATE
    form.addEventListener("submit", e => {
        e.preventDefault();
        if (!code) return;

        const name = nameInput.value.trim();
        const height = heightInput.value.trim();
        const weight = weightInput.value.trim();

        if (!name || !height || !weight) {
            msgDiv.textContent = "❌ Minden mező kitöltése kötelező!";
            return;
        }

        if (name.length > 30) {
            msgDiv.textContent = "❌ A név legfeljebb 30 karakter lehet!";
            return;
        }

        const body = `op=create&name=${name}&height=${height}&weight=${weight}&code=${code}`;

        fetch("http://gamf.nhely.hu/ajax2/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body
        })
        .then(res => res.text())
        .then(() => {
            msgDiv.textContent = "✅ Sikeres hozzáadás!";
            form.reset();
            readData();
        });
    });

    // 🟨 UPDATE – Adatok beolvasása ID alapján
    getDataBtn.addEventListener("click", () => {
        const id = idInput.value.trim();
        if (!code || !id) return;

        fetch("http://gamf.nhely.hu/ajax2/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `op=read&code=${code}`
        })
        .then(res => res.json())
        .then(data => {
            const found = data.list.find(item => item.id === id);
            if (!found) {
                msgDiv.textContent = "❌ Nem található ilyen ID!";
                return;
            }

            nameInput.value = found.name;
            heightInput.value = found.height;
            weightInput.value = found.weight;
        });
    });

    updateBtn.addEventListener("click", () => {
        const id = idInput.value.trim();
        const name = nameInput.value.trim();
        const height = heightInput.value.trim();
        const weight = weightInput.value.trim();

        if (!code || !id || !name || !height || !weight) {
            msgDiv.textContent = "❌ Minden mező kitöltése kötelező!";
            return;
        }

        if (name.length > 30) {
            msgDiv.textContent = "❌ A név legfeljebb 30 karakter lehet!";
            return;
        }

        const body = `op=update&id=${id}&name=${name}&height=${height}&weight=${weight}&code=${code}`;

        fetch("http://gamf.nhely.hu/ajax2/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body
        })
        .then(res => res.text())
        .then(() => {
            msgDiv.textContent = "✅ Sikeres módosítás!";
            form.reset();
            readData();
        });
    });

    // 🟥 DELETE
    deleteBtn.addEventListener("click", () => {
        const id = idInput.value.trim();
        if (!code || !id) return;

        const body = `op=delete&id=${id}&code=${code}`;

        fetch("http://gamf.nhely.hu/ajax2/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body
        })
        .then(res => res.text())
        .then(() => {
            msgDiv.textContent = "✅ Sikeres törlés!";
            form.reset();
            readData();
        });
    });
});
