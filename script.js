const form = document.getElementById("preferences-form");
const fontSizeInput = document.getElementById("fontsize");
const fontColorInput = document.getElementById("fontcolor");

// Set cookie
function setCookie(name, value) {
  document.cookie = `${name}=${value}; path=/`;
}

// Get cookie
function getCookie(name) {
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    const [key, value] = cookie.trim().split("=");

    if (key === name) {
      return value;
    }
  }

  return null;
}

// Apply preferences
function applyPreferences(fontSize, fontColor) {
  document.documentElement.style.setProperty(
    "--fontsize",
    `${fontSize}px`
  );

  document.documentElement.style.setProperty(
    "--fontcolor",
    fontColor
  );
}

// Load saved preferences on page load
window.addEventListener("load", () => {
  const savedFontSize = getCookie("fontsize");
  const savedFontColor = getCookie("fontcolor");

  if (savedFontSize) {
    fontSizeInput.value = savedFontSize;
  }

  if (savedFontColor) {
    fontColorInput.value = savedFontColor;
  }

  applyPreferences(
    savedFontSize || 16,
    savedFontColor || "#000000"
  );
});

// Save preferences
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const fontSize = fontSizeInput.value;
  const fontColor = fontColorInput.value;

  setCookie("fontsize", fontSize);
  setCookie("fontcolor", fontColor);

  applyPreferences(fontSize, fontColor);
});
