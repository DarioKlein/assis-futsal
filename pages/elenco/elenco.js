document.addEventListener("DOMContentLoaded", () => {
  const loadComponents = async () => {
    const elements = document.querySelectorAll("[data-include]");

    for (const el of elements) {
      const file = el.getAttribute("data-include");

      try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Não foi possível carregar: ${file}`);

        const html = await response.text();
        el.innerHTML = html;

        const scriptPath = el.getAttribute("data-script");
        if (scriptPath) {
          const newScript = document.createElement("script");
          newScript.src = scriptPath;

          document.body.appendChild(newScript);
        }
      } catch (error) {
        console.error("Erro ao carregar componente:", error);
        el.innerHTML = `<p style="color:red;">Erro ao carregar ${file}</p>`;
      }
    }
  };

  loadComponents();
});

// Scripts do campo
const formations = {
  "1-2-2": [
    { name: "Goleiro", position: "GOL", x: 10, y: 50 },
    { name: "Fixo", position: "FIX", x: 30, y: 35 },
    { name: "Ala", position: "ALA", x: 30, y: 65 },
    { name: "Pivô", position: "PIV", x: 70, y: 35 },
    { name: "Ala", position: "ALA", x: 70, y: 65 },
  ],
  "1-3-1": [
    { name: "Goleiro", position: "GOL", x: 10, y: 50 },
    { name: "Fixo", position: "FIX", x: 35, y: 50 },
    { name: "Ala", position: "ALA", x: 35, y: 25 },
    { name: "Ala", position: "ALA", x: 35, y: 75 },
    { name: "Pivô", position: "PIV", x: 75, y: 50 },
  ],
  "1-2-1-1": [
    { name: "Goleiro", position: "GOL", x: 10, y: 50 },
    { name: "Fixo", position: "FIX", x: 28, y: 35 },
    { name: "Ala", position: "ALA", x: 28, y: 65 },
    { name: "Ala", position: "ALA", x: 55, y: 50 },
    { name: "Pivô", position: "PIV", x: 78, y: 50 },
  ],
  "1-1-3": [
    { name: "Goleiro", position: "GOL", x: 10, y: 50 },
    { name: "Fixo", position: "FIX", x: 32, y: 50 },
    { name: "Ala", position: "ALA", x: 65, y: 25 },
    { name: "Pivô", position: "PIV", x: 65, y: 50 },
    { name: "Ala", position: "ALA", x: 65, y: 75 },
  ],
};

const playerNames = ["Eduardo", "Carlos", "Pedro", "João", "Lucas"];

function createPlayerElement(player, index) {
  const playerDiv = document.createElement("div");
  playerDiv.className = "player";
  playerDiv.style.left = `${player.x}%`;
  playerDiv.style.top = `${player.y}%`;

  const playerCard = document.createElement("div");
  playerCard.className = "player-card";

  const photo = document.createElement("div");
  photo.className = "player-photo";

  const name = document.createElement("div");
  name.className = "player-name";
  name.textContent = playerNames[index] || player.name;

  const position = document.createElement("div");
  position.className = "player-position";
  position.textContent = player.position;

  playerCard.appendChild(photo);
  playerCard.appendChild(name);
  playerCard.appendChild(position);
  playerDiv.appendChild(playerCard);

  return playerDiv;
}

function renderFormation(formationType) {
  const container = document.getElementById("playersContainer");
  container.innerHTML = "";

  const formation = formations[formationType];
  formation.forEach((player, index) => {
    const playerElement = createPlayerElement(player, index);
    container.appendChild(playerElement);
  });
}

document.getElementById("formation").addEventListener("change", (e) => {
  renderFormation(e.target.value);
});

renderFormation("1-2-2");

// Fim dos scripts do campo
