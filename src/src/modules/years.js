function handleDropdown(e) {
  const year = e.target.value;
  console.log(year);
  window.location.href = `/years/${year}`; 
}

export default () => {
  const dropdowns = document.getElementsByClassName("year-selector");
  [...dropdowns].forEach(d => d.addEventListener("change", handleDropdown));
}