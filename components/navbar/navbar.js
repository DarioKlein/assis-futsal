document.querySelector(".hamburguer-menu").addEventListener("click", () => {
  document.querySelector("#opacity").classList.toggle("opacity-active");
  const menuItems = document.querySelectorAll(".hamburguer-menu-item");
  menuItems[0].classList.toggle("rotate-child-one");
  menuItems[1].classList.toggle("hide-child-two");
  menuItems[2].classList.toggle("rotate-child-three");

  document.querySelector(".menu").classList.toggle("visible-menu");
  document
    .querySelector(".hamburguer-menu")
    .classList.toggle("fix-close-button");

  document.querySelectorAll("ul > li > a").forEach((e, i) => {
    setTimeout(() => {
      e.classList.toggle("animation-text");
    }, i * 50);
  });
});
