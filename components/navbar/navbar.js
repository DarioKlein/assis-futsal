document.querySelector(".hamburguer-menu").addEventListener("click", () => {
  const menuItems = document.querySelectorAll(".hamburguer-menu-item");
  menuItems[0].classList.toggle("rotate-child-one");
  menuItems[1].classList.toggle("hide-child-two");
  menuItems[2].classList.toggle("rotate-child-three");

  document.querySelector(".menu").classList.toggle("visible-menu");
});
