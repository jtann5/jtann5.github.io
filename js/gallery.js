// Function to initialize dot navigation
function initializeDots(galleryId) {
    const gallery = document.getElementById(`${galleryId}-images`);
    const pictures = gallery.querySelectorAll('picture');
    const dotsContainer = document.getElementById(`${galleryId}-dots`);
    
    // Create a dot for each image in the gallery
    pictures.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.addEventListener('click', () => scrollToImage(index, gallery, galleryId)); // Click on dot to scroll to image
      dotsContainer.appendChild(dot);
    });
  
    // Set the initial active dot (on first load)
    updateDots(galleryId, 0);
  
    // Listen to the scroll event to update dots
    gallery.addEventListener('scroll', () => updateActiveDot(gallery, galleryId));
  }
  
  // Function to scroll the gallery left or right
  function scrollGallery(direction, galleryId) {
    const gallery = document.getElementById(`${galleryId}-images`);
    const pictures = gallery.querySelectorAll('picture');
    let currentIndex = getCurrentIndex(gallery);
  
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= pictures.length) currentIndex = pictures.length - 1;
  
    // Scroll to the image at currentIndex and update dots
    scrollToImage(currentIndex, gallery, galleryId);
  }
  
  // Function to scroll to a specific image in the gallery
  function scrollToImage(index, gallery, galleryId) {
    const pictures = gallery.querySelectorAll('picture');
    const image = pictures[index];
    const galleryWidth = gallery.offsetWidth;
    const imageOffset = image.offsetLeft;
  
    // Calculate the scroll position to center the image
    const scrollPosition = imageOffset - (galleryWidth / 2) + (image.offsetWidth / 2);
  
    gallery.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  
    // Update the active dot
    updateDots(galleryId, index);
  }
  
  // Function to get the current image index (based on scroll position)
  function getCurrentIndex(gallery) {
    const scrollLeft = gallery.scrollLeft;
    const width = gallery.offsetWidth;
    return Math.round(scrollLeft / width);
  }
  
  // Function to update the active dot based on the current image index
  function updateDots(galleryId, index) {
    const dots = document.querySelectorAll(`#${galleryId}-dots span`);
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (dots[index]) {
      dots[index].classList.add('active');
    }
  }
  
  // Function to update the active dot when scrolling
  function updateActiveDot(gallery, galleryId) {
    const pictures = gallery.querySelectorAll('picture');
    const index = getCurrentIndex(gallery);
    updateDots(galleryId, index);
  }
  
  // Initialize all galleries and their respective dots
  document.addEventListener('DOMContentLoaded', () => {
    const galleryIds = ['gallery1', 'gallery2', , 'gallery3', 'gallery4', 'gallery5'];  // Add more gallery IDs as needed
    galleryIds.forEach(galleryId => initializeDots(galleryId));
  });
  