document.querySelector(".back-to-top-btn").addEventListener("click", () => {
  const targetSelector =
    window.innerWidth <= 768 ? "#start" : ".desktop-navbar";

  const targetElement = document.querySelector(targetSelector);

  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: "smooth",
    });
  }
});
