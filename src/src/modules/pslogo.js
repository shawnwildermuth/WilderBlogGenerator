export default function pslogo() {
  const logos = document.getElementsByClassName("ps-logo-over");
  function toggle(e) {
    const newSrc = e.target.getAttribute("data-over");
    const oldSrc = e.target.getAttribute("src");
    e.target.setAttribute("src", newSrc);
    e.target.setAttribute("data-over", oldSrc);
  }

  for (let x = 0; x < logos.length; ++x) {
    logos[x].addEventListener("mouseover", toggle);
    logos[x].addEventListener("mouseout", toggle);
  }
}
