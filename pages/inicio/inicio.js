const palavra = "PARTICIPE";
const sidePhrase = document.querySelector(".side-phrase");

[...palavra].forEach((letra) => {
  sidePhrase.innerHTML += `<span>${letra}</span>`;
});

const ctx = document.getElementById("myGraph");
const faixaEtariaData = [2, 3, 11, 6, 8, 3, 7];
const posicaoPrincialData = [8, 3, 6, 9, 6, 8];

console.log(posicaoPrincialData.length);

const faixaEtariaLabels = ["14", "15", "16", "17", "18", "19", "20"];
const posicaoPrincipalLabels = [
  "Ala",
  "Ala Direita",
  "Fixo",
  "Goleiro",
  "Pivô",
];

const faixaEtariaPorcentagens = faixaEtariaData.map((n) => {
  return (n / 40) * 100;
});

const cores = [
  "#1c4c83",
  "#1092d7",
  "#f0d067",
  "#ff7b00ff",
  "#479f34",
  "#1d4713",
  "#00ffe1ff",
];

new Chart(ctx, {
  type: "pie",
  data: {
    labels: faixaEtariaLabels,
    datasets: [
      {
        data: faixaEtariaPorcentagens,
        label: "% de alunos",
        backgroundColor: cores,
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
  type: "bar",

  data: {
    labels: posicaoPrincipalLabels,
    datasets: [
      {
        label: "% de crescimento",
        data: posicaoPrincialData,
        borderColor: "#1092d7",
        backgroundColor: "#1092d733",
        tension: 0,
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
