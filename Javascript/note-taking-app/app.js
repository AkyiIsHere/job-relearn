const menuBtn = document.getElementById("menuBtn");
const navContainer = document.querySelector(".nav-container");
const nav = document.getElementById("nav");
const arrIcon = document.querySelector(".arr-icon");
const burgerBtn = document.querySelector(".burger-btn");
const btnContainer = document.querySelector(".btn-container");

menuBtn.addEventListener("click", toggleNav);
burgerBtn.addEventListener("click", toggleOptionButtons);

/** Toggle option buttons (Edit/Delete) on smaller screens */
function toggleOptionButtons() {
  const isActive = btnContainer.classList.toggle("active");

  if (isActive) {
    // Show immediately, hide later if needed
    btnContainer.addEventListener("transitionend", function handler() {
      btnContainer.style.zIndex = "11";
      btnContainer.removeEventListener("transitionend", handler);
    });
  } else {
    btnContainer.style.zIndex = "-11";
  }
}

/** Close navigation drawer */
function closeNav() {
  navContainer.classList.remove("active");
  nav.classList.remove("active");
  arrIcon.classList.remove("active");
  menuBtn.style.left = "0";

  document.removeEventListener("click", closeNavHandler);

  // Set z-index after transition
  onTransitionEnd(navContainer, () => {
    navContainer.style.zIndex = "-10";
  });
}

/** Open navigation drawer */
function openNav() {
  const navWidth = nav.offsetWidth;

  navContainer.classList.add("active");
  nav.classList.add("active");
  arrIcon.classList.add("active");
  menuBtn.style.left = `${navWidth}px`;

  document.addEventListener("click", closeNavHandler);
  navContainer.style.zIndex = "11";
}

/** Toggle nav open/close */
function toggleNav(e) {
  e.stopPropagation(); // Prevent click bubbling to document
  nav.classList.contains("active") ? closeNav() : openNav();
}

/** Close nav when clicking outside (only on small screens) */
function closeNavHandler(e) {
  const isSmallScreen = window.innerWidth <= 426;
  const clickedOutside = !nav.contains(e.target) && e.target !== menuBtn;

  if (isSmallScreen && clickedOutside) {
    closeNav();
  }
}

/** Helper: Run callback after transition ends */
function onTransitionEnd(element, callback){
  function handler(event){
    if(event.target === element){
      callback();
      element.removeEventListener("transitionend", handler);
    }
  }
  element.addEventListener("transitionend", handler)
}