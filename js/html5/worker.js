// 🔹 Web Worker fájl - számolás háttérszálon

onmessage = function (event) {
    const n = event.data;
    let sum = 0;

    for (let i = 1; i <= n; i++) {
        sum += i;
    }

    postMessage(sum); // Eredmény visszaküldése
};
