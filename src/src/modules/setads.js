export default function setads() {
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
  let submenu = document.getElementById("sidebar-item");
  let item = document.getElementById("story-item");
  if (submenu)
    submenu.innerHTML =
      sidebarItems[Math.floor(Math.random() * sidebarItems.length)];
  if (item)
    item.innerHTML = storyItems[Math.floor(Math.random() * storyItems.length)];
  return submenu;
}
