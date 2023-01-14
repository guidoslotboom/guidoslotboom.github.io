// Selects DOM elements by class or id and stores them in variables
const slider = document.querySelector('#showcases');
const items = slider.querySelectorAll('.item');
const navigation = document.querySelector('.scroll-snap-nav');
const prevButton = navigation.querySelector('#scrollToPrev');
const nextButton = navigation.querySelector('#scrollToNext');

// Variable to store the total width of all the items in the slider
let totalItemsWidth = 0;

// Iterates over each of the items and adds up their widths
// Storing the result in the totalItemsWidth variable
items.forEach((item) => {
  totalItemsWidth += item.offsetWidth;
});

// Count the number of items
const numberOfItems = items.length;

// Sets it equal to the visible width and scroll amount
const itemWidth = totalItemsWidth / numberOfItems;

// Loop through the kids and iterate to add attributes
for (let i = 1; i < slider.children.length; i++) {
  slider.children[i].setAttribute('aria-label', `Slide ${i} of ${slider.children.length}`);
  slider.children[i].setAttribute('id', `slide-${i}`);
}

// Adds click event listeners when prev button is clicked
prevButton.addEventListener('click', () => {
  // Get the current scroll position in the slider
  const currentScrollPosition = slider.scrollLeft;

  if (currentScrollPosition > 0) {
    // Scroll to the previous item
    slider.scrollBy({
      left: -itemWidth,
      behavior: 'smooth'
    });
  } else {
    // Jump to the last item
    slider.scrollTo({
      left: numberOfItems * itemWidth
    });
  }
});

// Adds click event listeners when next button is clicked
nextButton.addEventListener('click', () => {
  // Get the current scroll position in the slider
  const currentScrollPosition = slider.scrollLeft;
  // Get the viewport width of the slider
  const sliderWidth = slider.offsetWidth;
  // Get the overflow width of the slider
  const overflowWidth = slider.scrollWidth;
  
  if (currentScrollPosition < overflowWidth - sliderWidth) {
    // Scroll to the next item
    slider.scrollBy({ 
      left: itemWidth,
      behavior: 'smooth'
    });
  } else {
    // Jump to the first item
    slider.scrollTo({
      left: 0
    });
  }
});