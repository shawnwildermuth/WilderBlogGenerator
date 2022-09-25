import pslogo from "./modules/pslogo"; 
import submenu from "./modules/submenus";
import setads from "./modules/setads";
import sidebar from "./modules/sidebar";
import lazyLoad from "./modules/lazyLoad";
import cookieConsent from "./modules/cookieConsent";
import videos from "./modules/videos";
import about from "./modules/about";
import carousel from "./modules/carousel";
import years from "./modules/years";
import lightbox from "./modules/lightbox";


// Search Form
document.addEventListener("DOMContentLoaded", function (event) {
  pslogo();
  submenu();
  setads();
  sidebar(); 
  lazyLoad();
  cookieConsent();
  videos();
  about();
  carousel();
  years();
  lightbox();
});


