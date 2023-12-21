const currentTheme = localStorage.getItem("theme");
const themeToggleLabel = document.querySelector("label[for='theme-toggle']");

if (currentTheme === "light") {
  document.documentElement.setAttribute("data-theme", "light");
  document.documentElement.classList.remove("dark");

  if (themeToggleLabel) {
    themeToggleLabel.textContent = "switch to dark theme";
  }
}
