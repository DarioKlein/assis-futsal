const dataInclude = [
  "../../components/navbar/navbar.html",
  "../../components/footer/footer.html",
];
const dataScript = [
  "../../components/navbar/navbar.js",
  "../../components/footer/footer.js",
];

document.addEventListener("DOMContentLoaded", () => {
  const loadComponents = async () => {
    const elements = document.querySelectorAll(".component-injection-target");

    elements.forEach(async (element, i) => {
      try {
        element.innerHTML = "";
        const response = await fetch(dataInclude[i]);
        if (!response.ok)
          throw new Error(`Não foi possível carregar: ${dataInclude[i]}`);

        const html = await response.text();
        element.innerHTML = html;

        if (dataScript[i] !== undefined) {
          const newScript = document.createElement("script");
          newScript.src = dataScript[i];

          document.body.appendChild(newScript);
        }
      } catch (error) {
        console.error("Erro ao carregar componente, detalhes: \n", error);
        element.innerHTML = `<p style="color:red;">Erro ao carregar ${dataInclude[i]}</p>`;
      }
    });
  };

  loadComponents();
});
