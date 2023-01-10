// The key of the property for the value in local storage
const themeColorKey = 'theme-color';
// The variable to match with dark mode
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

const checkThemeColor = () => {
  // If, check of the local storage value exists
  // Else, check of the specified value matches the color scheme
  if (localStorage.getItem(themeColorKey)) {
    return localStorage.getItem(themeColorKey);
  } else {
    if (darkModeMediaQuery.matches) {
      return 'dark';
    } else {
      return 'light';
    }
  }
}

// Variable to store the prefers theme color
let themeColorValue = checkThemeColor();

// Variable to set the prefers theme color
const setThemeColor = () => {
  // Set an attribute element with the value on the html element
  document.firstElementChild.setAttribute('data-theme', themeColorValue);
  // Set an attribute element with the value on the button for the theme toggle
  document.querySelector('#theme-toggle')?.setAttribute('aria-label', themeColorValue);
}

// Variable to update the prefers theme color
const updateThemeColor = () => {
  // Overwrite the current value of the variable
  themeColorValue = themeColorValue;
  // Place the value of the variable in the local storage
  localStorage.setItem(themeColorKey, themeColorValue);
  // Run the prefers theme color
  setThemeColor();
}

// Run the prefers theme color
setThemeColor();

window.onload = () => {
  // Set the prefers theme color after window on load
  setThemeColor();

  // Select the toggle button and check for click events
  document.querySelector('#theme-toggle')?.addEventListener('click', function() {

    // Change theme color value
    if (themeColorValue === 'light') {
      themeColorValue = 'dark';
    } else {
      themeColorValue = 'light';
    }

    // Update the prefers theme color
    updateThemeColor();
  });
}