// Site-wide JavaScript
"use strict";
export default function carousel() {
  document.querySelectorAll(".carousel-container").forEach((carousel) => {
    insertNumbers(carousel);

    carousel.querySelector(".prev").addEventListener("click", (e) => {
      minusItem(carousel);
    });

    carousel.querySelector(".next").addEventListener("click", () => {
      plusItem(carousel);
    });

    insertDots(carousel);

    carousel.querySelectorAll(".dot").forEach((dot) => {
      dot.addEventListener("click", (e) => {
        let item = Array.prototype.indexOf.call(
          e.target.parentNode.children,
          e.target
        );

        showItems(carousel, item);
      });
    });

    showItems(carousel, 0);
  });

  function insertNumbers(carousel) {
    const length = carousel.querySelectorAll(".item").length;
    for (let i = 0; i < length; i++) {
      const nmbr = document.createElement("div");
      nmbr.classList.add("numbertext");
      nmbr.innerText = i + 1 + " / " + length;

      carousel.querySelectorAll(".item")[i].append(nmbr);
    }
  }

  function insertDots(carousel) {
    const dots = document.createElement("div");
    dots.classList.add("dots");

    carousel.append(dots);

    carousel.querySelectorAll(".item").forEach((elem) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");

      carousel.querySelector(".dots").append(dot);
    });
  }

  function plusItem(carousel) {
    let item = currentItem(carousel);

    carousel
      .querySelectorAll(".item")[item].nextElementSibling.classList.contains("item")
      ? showItems(carousel, item + 1)
      : showItems(carousel, 0);
  }

  function minusItem(carousel) {
    let item = currentItem(carousel);

    carousel.querySelectorAll(".item")[item].previousElementSibling != null
      ? showItems(carousel, item - 1)
      : showItems(carousel, carousel.querySelectorAll(".item").length - 1);
  }

  function currentItem(carousel) {
    return [...carousel.querySelectorAll(".item")].findIndex(
      (item) => item.style.display == "block"
    );
  }

  function showItems(carousel, item) {
    if (carousel.querySelectorAll(".item")[currentItem(carousel)] != undefined)
      carousel.querySelectorAll(".item")[currentItem(carousel)].style.display =
        "none";
    carousel.querySelectorAll(".item")[item].style.display = "block";

    if (carousel.querySelector(".dot.active") != null)
      carousel.querySelector(".dot.active").classList.remove("active");
    carousel.querySelectorAll(".dot")[item].classList.add("active");
  }
}
