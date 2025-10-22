const title = document.querySelector("title").innerText.toLowerCase();

function setFocus() {
  document.querySelectorAll(".navigation-section > ul > li").forEach((li) => {
    const a = li.firstChild;

    if (a.innerText.toLowerCase() === title) {
      a.classList.add("navbar-focus");
    }
  });

  document.querySelectorAll(".menu > ul > li").forEach((li) => {
    const a = li.firstChild;

    if (a.innerHTML.toLowerCase() === title) {
      a.classList.add("navbar-focus");
    }
  });
}

setFocus();

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
