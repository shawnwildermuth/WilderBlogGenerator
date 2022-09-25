export default function submenus() {
  const headers = document.querySelectorAll("#menu .submenu");
  [...headers].forEach((submenu) => {
    const header = submenu.children[0];
    const items = submenu.children[1];
    header.addEventListener("click", () => {
      header.children[0].classList.toggle("hidden");
      header.children[1].classList.toggle("hidden");
      items.classList.toggle("!block");
    });
  });
}
