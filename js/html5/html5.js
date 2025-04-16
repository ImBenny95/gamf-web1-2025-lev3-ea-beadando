// 🔹 Almenü működtetése (mutatja/elrejti az adott szekciót gomb alapján)
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("aside button").forEach(button => {
        button.addEventListener("click", () => {
            const target = button.dataset.target; // HTML-ben: data-target="..."
            document.querySelectorAll(".apiSection").forEach(section => {
                section.style.display = (section.id === target) ? "block" : "none";
            });
        });
    });
});
