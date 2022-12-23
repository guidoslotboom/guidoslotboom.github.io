// Selects DOM elements by class or id and stores them in variables
const slider = document.querySelector('.scroll-showcases');
const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');

// Variable to store the total width of all the images in the slider
let totalWidth = 0;
const items = document.querySelectorAll('.showcase');

// Iterates over each of the items and adds up their widths
// Storing the result in the totalWidth variable
items.forEach((item) => {
  totalWidth += item.offsetWidth;
});

// Sets it equal to the visible width and scroll amount
const visibleWidth = slider.offsetWidth;
const scrollAmount = totalWidth / items.length;

// Adds click event listeners when prev button is clicked
prevButton.addEventListener('click', () => {
  slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});

// Adds click event listeners when next button is clicked
nextButton.addEventListener('click', () => {
  slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});