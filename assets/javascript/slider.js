// Selects DOM elements by class or id and stores them in variables
const slider = document.getElementById('showcases').querySelector('.scroll-snap-slider');
const sliderItems = slider.querySelectorAll('.item');
const sliderNav = document.querySelector('.scroll-snap-nav');
const sliderNavToPrev = sliderNav.querySelector('#scrollToPrev');
const sliderNavToNext = sliderNav.querySelector('#scrollToNext');

// Variable to store the total width of all the items in the slider
let totalItemsWidth = 0;

// Iterates over each of the items and adds up their widths
// Storing the result in the totalItemsWidth variable
sliderItems.forEach((item) => {
  totalItemsWidth += item.offsetWidth;
});

// Count the number of items
const numberOfItems = sliderItems.length;

// Sets it equal to the visible width and scroll amount
const itemWidth = totalItemsWidth / numberOfItems;

// IntersectionObserver options for detecting visible items
const options = {
  root: slider,
  threshold: 0.95
};

// Variable for calling the IntersectionObserver
const observer = new IntersectionObserver(handleSliderNav, options);

// Loop through the kids and iterate to add attributes
for (let i = 0; i < numberOfItems; i++) {
  // Set the item number to each slider item
  sliderItems[i].id = `item-${i + 1}`;
  slider.children[i].setAttribute('aria-label', `Slide ${i + 1} of ${numberOfItems}`);
  // Observe each slider item with the IntersectionObserver
  observer.observe(sliderItems[i]);
}

// Handle slider navigation and slider items after user interaction
function handleSliderNav(entries) {

  // Go through all the items
  entries.forEach(entry => {
    // Check which items enter the viewport and add a class
    // And remove the class when leaving the viewport
    if (entry.isIntersecting) {
      entry.target.classList.add('item-visible');
    } else {
      entry.target.classList.remove('item-visible');
    }
  });

  // Listen to a click event for the previous button
  sliderNavToPrev.addEventListener('click', () => {
    // If the first item has not the item-visible class name
    if (!slider.querySelector('#item-1').classList.contains('item-visible')) {
      // Scroll to the previous item
      slider.scrollBy({
        left: -itemWidth,
        behavior: 'smooth'
      });
    } else {
      // When the first item has the item-visible class name
      // Let it scroll to the end of the slider
      slider.scrollLeft = slider.scrollWidth;
    }
  });

  // Listen to a click event for the next button
  sliderNavToNext.addEventListener('click', () => {
    // If the last item has not the item-visible class name
    if (!slider.querySelector(`#item-${sliderItems.length}`).classList.contains('item-visible')) {
      // Scroll to the next item
      slider.scrollBy({
        left: itemWidth,
        behavior: 'smooth'
      });
    } else {
      // When the last item has the item-visible class name
      // Let it scroll to the start of the slider
      slider.scrollLeft = 0;
    }
  });
  
}