const palavra = "PARTICIPE";
const sidePhrase = document.querySelector(".side-phrase");

[...palavra].forEach((letra) => {
  sidePhrase.innerHTML += `<span>${letra}</span>`;
});

const ctx = document.getElementById("myGraph");
const data = [45, 35, 20];
const porcentagens = data.map((n) => {
  return ((n / data.reduce((ac, val) => (ac += val))) * 100).toFixed(0);
});

new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["7 - 10 Anos", "11 - 14 Anos", "15 - 18 anos"],
    datasets: [
      {
        data: porcentagens,
        label: "%",
        backgroundColor: ["#f0d067", "#1092d7", "#1c4c83"],
        borderWidth: 0,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Faixa Etária dos Alunos",
        font: { size: 22 },
        position: "bottom",
        color: "#1c4c83",
      },
      legend: {
        labels: {
          padding: 20,
          font: { size: 10 },
          pointStyle: "circle",
          usePointStyle: true,
          color: "#000000",
        },
        position: "top",
      },
    },
  },
});

const ctx1 = document.getElementById("myGraph1");

new Chart(ctx1, {
  type: "line",

  data: {
    labels: ["2021", "2022", "2023", "2024", "2025"],
    datasets: [
      {
        label: "% de crescimento",
        data: [18, 34, 39, 42, 50],
        borderColor: "#1092d7",
        backgroundColor: "#1092d733",
        tension: 0,
        // fill: true,
      },
    ],
  },

  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Histórico de Crescimento",
        font: { size: 26 },
        color: "#1c4c83",
        align: "center",
      },
      legend: {
        labels: {
          color: "#1092d7",
        },
        position: "bottom",
      },
    },
    scales: {
      y: {
        beginAtZero: true,

        title: {
          display: true,
          text: "(%)",
          color: "#1c4c83",
        },
        ticks: {
          stepSize: 10,
          color: "#1c4c83",
          font: { weight: 600, size: 14 },
        },
      },
      x: {
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: "#1c4c83",
          font: { weight: 600, size: 14 },
        },
      },
    },
  },
});

document.getElementById("button").addEventListener("click", () => {
  document.getElementById("card-container-title").scrollIntoView({
    behavior: "smooth",
  });
});
