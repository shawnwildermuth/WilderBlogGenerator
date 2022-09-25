export default function sidebar() {
  const header = document.getElementById("header");
  const sidecarButton = document.getElementById("sidebar-button");

  const showMenu = () => {
    anime
      .timeline({
        duration: 250,
        easing: "easeInOutQuad",
      })
      .add({
        targets: header,
        translateX: "0%",
        width: "14rem",
      })
      .add(
        {
          targets: sidecarButton,
          left: "12.5rem",
          scaleX: 1
        },
        0
      );
  };

  const hideMenu = () => {
    anime
      .timeline({
        duration: 500,
        easing: "easeInOutQuad",
      })
      .add({
        targets: header,
        translateX: -1,
        width: "0rem",
        duration: 700,
      })
      .add(
        {
          targets: sidecarButton,
          left: "0",
          scaleX: -1
        },
        0
      );
    };

  // set open/closed for session
  const KEY = "showMenu";
  let opened = false;
  if (sessionStorage.getItem(KEY)) {
    opened = true;
  } else {
    opened = window.innerWidth > 1024;
  }
  if (opened) showMenu() 
  else hideMenu();
  
  // Wire up the button
  if (header && sidecarButton) {
    sidecarButton.addEventListener("click", () => {
      opened = !opened;
      if (opened) {
        sessionStorage.setItem(KEY, "true");
        showMenu();
      } else {
        sessionStorage.removeItem(KEY);
        hideMenu();
      }
    });
  }
}
