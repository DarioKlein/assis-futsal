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
