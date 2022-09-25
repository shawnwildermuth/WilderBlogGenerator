export default function cookieConsent() {
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
      message: "My site uses cookies for analytics and some Google Adwords ads. Thanks for supporting the site. If you want to learn more about cookies, look here:",
      dismiss: "I get it...",
    },
  });
}
