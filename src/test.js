(function () {
  'use strict';

  // Site-wide JavaScript

  // Search Form
  document.addEventListener("DOMContentLoaded", function (event) {
    /*******************PS Logo Over  */
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

      /************** Submenu */
      const headers = document.querySelectorAll("#menu .submenu");
      [...headers].forEach((submenu) => {
        const header = submenu.children[0];
        const items = submenu.children[1];
        header.addEventListener("click", () => {
          header.children[0].classList.toggle("hidden");
          header.children[1].classList.toggle("hidden");
          items.classList.toggle("!block");
        }); // The item
      });

    /**********************Ads**************************************************** */
    const sidebarItems = [
      `<a href="//pluralsight.pxf.io/c/1191850/595231/7490" id="595231"><img src="//a.impactradius-go.com/display-ad/7490-595231" border="0" alt="" width="250" height="250"/></a><img height="0" width="0" src="//pluralsight.pxf.io/i/1191850/595231/7490" style="position:absolute;visibility:hidden;" border="0" />`,
      `<a href="//pluralsight.pxf.io/c/1191850/595246/7490" id="595246"><img src="//a.impactradius-go.com/display-ad/7490-595246" border="0" alt=" width="250" height="250"/></a><img height="0" width="0" src="//pluralsight.pxf.io/i/1191850/595246/7490" style="position:absolute;visibility:hidden;" border="0" />`,
      `<a href="//pluralsight.pxf.io/c/1191850/934723/7490" target="_top" id="934723"><img src="//a.impactradius-go.com/display-ad/7490-934723" border="0" alt="" width="300" height="250"/></a><img height="0" width="0" src="https://pluralsight.pxf.io/i/1191850/934723/7490" style="position:absolute;visibility:hidden;" border="0" />`,
      `<a href="//pluralsight.pxf.io/c/1191850/431401/7490" target="_top" id="431401"><img src="//a.impactradius-go.com/display-ad/7490-431401" border="0" alt="" width="200" height="200"/></a><img height="0" width="0" src="https://pluralsight.pxf.io/i/1191850/431401/7490" style="position:absolute;visibility:hidden;" border="0" />`,
    ];
    const storyItems = [
      `<a href="//pluralsight.pxf.io/c/1191850/480966/7490" id="480966"><img src="//a.impactradius-go.com/display-ad/7490-480966" border="0" alt="" width="468" height="60"/></a><img height="0" width="0" src="//pluralsight.pxf.io/i/1191850/480966/7490" style="position:absolute;visibility:hidden;" border="0" />`,
      `<a href="//pluralsight.pxf.io/c/1191850/595252/7490" id="595252"><img src="//a.impactradius-go.com/display-ad/7490-595252" border="0" alt="" width="468" height="60"/></a><img height="0" width="0" src="//pluralsight.pxf.io/i/1191850/595252/7490" style="position:absolute;visibility:hidden;" border="0" />`,
      `<a href="//pluralsight.pxf.io/c/1191850/595237/7490" id="595237"><img src="//a.impactradius-go.com/display-ad/7490-595237" border="0" alt="" width="468" height="60"/></a><img height="0" width="0" src="//pluralsight.pxf.io/i/1191850/595237/7490" style="position:absolute;visibility:hidden;" border="0" />`,
    ];
    let sidebar = document.getElementById("sidebar-item");
    let item = document.getElementById("story-item");
    if (sidebar)
      sidebar.innerHTML =
        sidebarItems[Math.floor(Math.random() * sidebarItems.length)];
    if (item)
      item.innerHTML = storyItems[Math.floor(Math.random() * storyItems.length)]; 
   
    /**********************Menu ************************************************** */
   

    
    const header = document.getElementById("header");
    const sidecarButton = document.getElementById("sidebar-button");

    const showMenu = () => {
      anime.timeline({
        duration: 250,
        easing: "easeInOutQuad"
      })
      .add({
        targets: header,
        translateX: "0%",
        width: "14rem",
      })
      .add({
        targets: sidecarButton,
        left: "12rem"
      }, 0);
      sidecarButton.children[1].classList.add("hidden");
      sidecarButton.children[0].classList.remove("hidden");
    };

    const hideMenu = () => {
      anime.timeline({
        duration: 500,
        easing: "easeInOutQuad"
      })
      .add({
        targets: header,
        translateX: "-100%",
        width: "0rem",
        duration: 700
      })
      .add({
        targets: sidecarButton,
        left: "0"
      }, 0);
      sidecarButton.children[1].classList.remove("hidden");
      sidecarButton.children[0].classList.add("hidden");
    };

    // set open/closed for session
    const KEY = "hideMenu";
    let opened = true;
    if (sessionStorage.getItem(KEY)) {
      opened = false;
      hideMenu();
    }
    if (header && sidecarButton) {
      sidecarButton.addEventListener("click", () => {
        opened = !opened;
        if (opened) {
          sessionStorage.removeItem(KEY);
          showMenu();
        } else {
          sessionStorage.setItem(KEY, "true");
          hideMenu();
        }
      });
    }
    
    /***************** Search **************************************************** */

    let searchForm = document.getElementById("searchForm");
    if (searchForm) {
      let searchInput = document.getElementById("searchInput");
      searchForm.addEventListener("submit", function (e) {
        window.location = "/search/" + encodeURI(searchInput.value);
        e.preventDefault();
        return false;
      });
    }

    /***************** Lazy Images **************************************************** */

    // Support Lazy Loading of Images
    new LazyLoad({
      elements_selector: ".lazy",
      // ... more custom settings?
    });

    /***************** cookie consent **************************************************** */

    window.cookieconsent.initialise({
      palette: {
        popup: {
          background: "#404040",
          text: "#eee",
        },
        button: {
          background: "#007BFF",
        },
      },
      theme: "classic",
      position: "bottom-right",
      content: {
        message:
          "My site uses cookies for analytics and some Google Adwords ads. Thanks for supporting the site. If you want to learn more about cookies, look here:",
        dismiss: "I get it...",
      },
    });

    /***************** Videos **************************************************** */

    const toggles = document.getElementsByClassName("video-toggle");
    const videoContainers = document.getElementsByClassName("video-container");

    function clickHandler(e) {
      const videoItemId = `video-${e.target.attributes["data-id"].value}`;
      const video = document.getElementById(videoItemId);
      if (video) {
        if (e.target.innerText === "Show Video") {
          e.target.innerText = "Hide Video";
          video.classList.remove("hidden");
          loadVideo(video);
        } else {
          video.classList.add("hidden");
          e.target.innerText = "Show Video";
        }
      }
    }

    function loadVideo(video) {
      const iframes = video.getElementsByTagName("iframe");
      if (iframes) {
        if (
          iframes &&
          !iframes[0].attributes["src"] &&
          iframes[0].attributes["data-src"]
        ) {
          const dataSrc = iframes[0].attributes["data-src"].value;
          iframes[0].setAttribute("src", dataSrc);
        }
      }
    }

    // Wire up clicks
    if (toggles) {
      for (let x = 0; x < toggles.length; ++x) {
        toggles[x].addEventListener("click", clickHandler);
      }
    }

    if (videoContainers) {
      for (let x = 0; x < videoContainers.length; ++x) {
        if (videoContainers[x].classList.contains("auto-load"))
          loadVideo(videoContainers[x]);
      }
    }

    /***************** About **************************************************** */
    const openSourceList = document.getElementById("openSourceList");
    if (openSourceList) {
      let template = _.template(
        `<div class="border border-gray-100 rounded m-1 p-1">
    <a href='<%= html_url %>' target='blank'><h4><%= name %></h4></a>
    <p class="text-sm"><%= description %></p>
  </div>
`
      );

      fetch(
        "https://api.github.com/users/shawnwildermuth/repos?type=owner&sort=pushed"
      )
        .then((result) => result.json())
        .then(function (data) {
          let results = _.filter(data, function (item) {
            return !item.fork && item.watchers_count > 0 && item.description;
          });
          results = _.orderBy(results, ["stargazers_count"], ["desc"]);
          _.forEach(_.take(results, 10), function (item) {
            const block = document.createElement("div");
            block.innerHTML = template(item);
            openSourceList.append(block);
          });
        });
    }

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
        .querySelectorAll(".item")
        [item].nextElementSibling.classList.contains("item")
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
  });

})();
