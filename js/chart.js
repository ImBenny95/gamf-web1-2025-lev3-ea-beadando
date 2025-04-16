document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("dataTable");
    const ctx = document.getElementById("chartCanvas").getContext("2d");

    // Változó színek soronként
    const colors = [
        "rgba(255, 99, 132, 0.7)",
        "rgba(54, 162, 235, 0.7)",
        "rgba(255, 206, 86, 0.7)",
        "rgba(75, 192, 192, 0.7)",
        "rgba(153, 102, 255, 0.7)"
    ];

    const borderColors = colors.map(c => c.replace("0.7", "1"));

    let chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Érték 1", "Érték 2", "Érték 3", "Érték 4", "Érték 5"],
            datasets: [{
                label: "Kiválasztott sor",
                data: [],
                borderColor: "blue",
                backgroundColor: "rgba(0,0,255,0.1)",
                borderWidth: 2,
                tension: 0.3,
                pointBackgroundColor: "blue",
                pointRadius: 6,
                pointHoverRadius: 8,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: "top"
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        borderDash: [5, 5]
                    }
                },
                x: {
                    grid: {
                        borderDash: [3, 3]
                    }
                }
            }
        }
    });

    const rows = table.querySelectorAll("tbody tr");
    rows.forEach((row, index) => {
        row.addEventListener("click", () => {
            const values = Array.from(row.cells).map(cell => parseFloat(cell.textContent));

            chart.data.datasets[0].data = values;
            chart.data.datasets[0].label = `Kiválasztott sor (#${index + 1})`;
            chart.data.datasets[0].borderColor = borderColors[index % borderColors.length];
            chart.data.datasets[0].backgroundColor = colors[index % colors.length];
            chart.data.datasets[0].pointBackgroundColor = borderColors[index % borderColors.length];
            chart.update();
        });
    });
});
