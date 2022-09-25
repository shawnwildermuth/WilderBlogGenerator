export default function search() {
  let searchForm = document.getElementById("searchForm");
  if (searchForm) {
    let searchInput = document.getElementById("searchInput");
    searchForm.addEventListener("submit", function (e) {
      window.location = "/search/" + encodeURI(searchInput.value);
      e.preventDefault();
      return false;
    });
  }
}
