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

  // Scroll to first image initially after a frame so layout is ready
  requestAnimationFrame(() => {
    scrollToImage(0, gallery, galleryId);
  });

  // Observe size/position changes in the gallery or images
  const resizeObserver = new ResizeObserver(() => {
    // On any resize, re-scroll to the active dot's image to adjust scroll position
    const activeIndex = getCurrentIndex(gallery);
    scrollToImage(activeIndex, gallery, galleryId);
  });

  resizeObserver.observe(gallery);
  pictures.forEach(picture => resizeObserver.observe(picture));

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
  const galleryIds = ['gallery1', 'gallery1m', 'gallery2', 'gallery3', 'gallery4', 'gallery5'];

  // const galleries = {
  //   gallery1: {
  //     dir: "housing-portal",
  //     images: ["dashboard", "all-requests", "login", "maintenance-request-form", "request-information",],
  //     desc: ["Dashboard screen", "All requests page", "Login form", "Maintenance request form", "Maintenance request info"]
  //   },
  //   gallery1m: {
  //     dir: "housing-portal",
  //     images: ["dashboard-mobile", "all-requests-mobile", "login-mobile", "maintenance-request-form-mobile", "request-information-mobile", "navbar-mobile"],
  //     desc: ["Dashboard screen", "All requests page", "Login form", "Maintenance request form", "Maintenance request info", "Navigation dropdown bar"]
  //   },
  //   gallery2: {
  //     dir: "robotics",
  //     images: ["robot-with-face", "robot-controller", "robot-off"],
  //   },
  //   gallery3: {
  //     dir: "mastermind",
  //     images: ["main-activity", "play-activity", "colors-demo", "dark-mode-demo", "options-activity"],
  //     desc: []
  //   },
  //   gallery4: {
  //     dir: "htmx",
  //     images: ["homepage", "store", "store-filter", "store-search"],
  //     desc: []
  //   },
  //   gallery5: {
  //     dir: "microcontroller-system",
  //     images: ["car", "back", "electronics"],
  //     desc: ["Chem-E-Car vehicle", "Back of microcontroller system", "Microcontroller system internals"]
  //   },
  // };

  galleryIds.forEach(galleryId => {
    // const container = document.getElementById(`${galleryId}-images`);
    // const gallery = galleries[galleryId];

    // if (container && gallery && Array.isArray(gallery.images)) {
    //   gallery.images.forEach((img, i) => {
    //     const desc = gallery.desc?.[i] || `Photo ${i + 1}`;
    //     const path = `images/${gallery.dir}/${img}`;

    //     container.innerHTML += `
    //       <picture>
    //         <source srcset="${path}.webp" type="image/webp">
    //         <img src="${path}.jpeg" alt="${desc}">
    //       </picture>
    //     `;
    //   });
    // }

    initializeDots(galleryId);
  });
});
