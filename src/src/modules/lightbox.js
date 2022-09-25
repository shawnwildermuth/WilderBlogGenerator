export default function lightbox() {
  const images = document.querySelectorAll("#content-block #story-block img");
  [...images].forEach(e => {
    const src = e.src;
    const anchor = document.createElement("a");
    anchor.href = `${src}`;
    anchor.classList.add("lightboxed");
    e.parentElement.insertBefore(anchor, e);
    anchor.appendChild(e);
  });
  imgLightbox("lightboxed");
}