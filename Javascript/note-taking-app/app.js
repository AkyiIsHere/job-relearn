// -- IIFE (Immediate Invoke Function Expressin) to avoid global population and improve encapsulation

(function () {
  // --- DOM Element Selections ---
  const elements = {
    menuBtn: document.getElementById("menuBtn"),
    navContainer: document.querySelector(".nav-container"),
    nav: document.getElementById("nav"),
    navMenu: document.getElementById("nav-menu"),
    navLinks: document.querySelectorAll(".nav-link"),
    arrIcon: document.querySelector(".arr-icon"),
    burgerBtn: document.querySelector(".burger-btn"),
    btnContainer: document.querySelector(".btn-container"),
    autoExpandInputs: document.querySelectorAll(".auto-expand"),
    noteContainer: document.querySelector(".note-container"),
    newBtn: document.querySelector(".new-btn"),
    cancelBtn: document.getElementById("cancel-btn"),
    createBtn: document.getElementById("create-btn"),
    formContainer: document.querySelector(".form-container"),
    form: document.querySelector("#note-form"),
    noteTitle: document.getElementById("note-title"),
    noteSubTitle: document.getElementById("sub-title"),
    noteBody: document.getElementById("note-body"),
  };

  // --- Constants ---
  const SMALL_SCREEN_BREAKPOINT = 426; // Breakpoint for small screens
  const AUTO_EXPAND_MIN_HEIGHT = 200; // min height for auto-expand textareas

  // -- Utility Functions ---

  /**
   * Executes a callback function when a CSS transition ends on the element.
   * @param {HTMLElement} element - The DOM element to observe.
   * @param {Function} callback - The function to execute after the transition.
   */
  function onTransitionEnd(element, callback) {
    function handler(event) {
      if (event.target === element) {
        callback(event);
        element.removeEventListener("transitionend", handler);
      }
    }
    element.addEventListener("transitionend", handler);
  }

  /**
   * Manages adding or remove a class fro multiple elements.
   * @param {HTMLElement[]} elementsArray - An array of elements
   * @param {string} className - The class name to toggle
   * @param {boolean} add - True to add the class, false to remove
   */
  function toggleClasses(elementsArray, className, add) {
    elementsArray.forEach((el) => {
      if (add) {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    });
  }

  // --- Navigation Functions ---

  function toggleNav(e) {
    elements.nav.classList.contains("active") ? closeNav() : openNav();
  }

  function openNav() {
    const navWidth = elements.nav.offsetWidth;

    toggleClasses(
      [elements.navContainer, elements.nav, elements.arrIcon],
      "active",
      true
    );
    elements.menuBtn.style.left = `${navWidth}px`;
    elements.navContainer.style.zIndex = "11";

    document.addEventListener("click", closeNavHandler);
  }

  function closeNav() {
    toggleClasses(
      [elements.navContainer, elements.nav, elements.arrIcon],
      "active",
      false
    );
    elements.menuBtn.style.left = "0";

    document.removeEventListener("click", closeNavHandler);
    onTransitionEnd(elements.navContainer, () => {
      elements.navContainer.style.zIndex = "-10";
    });
  }

  function closeNavHandler(e) {
    const isSmallScreen = window.innerWidth <= SMALL_SCREEN_BREAKPOINT;
    const clickedOutside =
      !elements.nav.contains(e.target) &&
      e.target !== elements.menuBtn &&
      e.target !== elements.arrIcon;

    if (isSmallScreen && clickedOutside) {
      closeNav();
    }
  }

  // --- Option Buttons Functions ---

  function toggleOptionButtons() {
    const isActive = elements.btnContainer.classList.toggle("active");

    if (isActive) {
      onTransitionEnd(elements.btnContainer, (event) => {
        event.target.style.zIndex = "11";
      });
      document.addEventListener("click", closeOptionHandler);
    } else {
      elements.btnContainer.style.zIndex = "-11";
      document.removeEventListener("click", closeOptionHandler);
    }
  }

  function closeOptionHandler(e) {
    const clickedOutside =
      !elements.btnContainer.contains(e.target) &&
      e.target !== elements.burgerBtn;

    if (clickedOutside) {
      toggleOptionButtons();
    }
  }

  // --- Auto Expand Feature ---

  function setupAutoExpand() {
    elements.autoExpandInputs.forEach((input) => {
      input.addEventListener("input", () => {
        input.style.height = `${AUTO_EXPAND_MIN_HEIGHT}px`; //Reset height to min before chekcing scrollheight
        if (input.scrollHeight >= AUTO_EXPAND_MIN_HEIGHT) {
          input.style.height = "auto";
          input.style.height = input.scrollHeight + "px";
        }
      });
    });
  }

  // --- Event Listeners ---

  function addEventListeners() {
    elements.menuBtn.addEventListener("click", toggleNav);
    elements.burgerBtn.addEventListener("click", toggleOptionButtons);
    elements.newBtn.addEventListener("click", openNewForm);
    elements.cancelBtn.addEventListener("click", closeNewForm);
    elements.form.addEventListener("submit", noteFormSubmit);

    noteListInitialization(); // Initalize note lists from localstorage
    setupAutoExpand(); // Initalize auto-expand feature
  }

  // --- Initialization ---

  function initialize() {
    addEventListeners();

    if (window.innerWidth > SMALL_SCREEN_BREAKPOINT) {
      openNav();
    }
  }

  // Run the initialization
  initialize();

  // --- New Note Form Function---

  function openNewForm() {
    elements.formContainer.classList.add("open");
    elements.noteContainer.style.display = "none";
    if (window.innerWidth <= SMALL_SCREEN_BREAKPOINT) {
      closeNav();
    }
  }

  function closeNewForm() {
    if (elements.formContainer.classList.contains("open")) {
      elements.formContainer.classList.remove("open");
      elements.noteContainer.style.display = "block";
    }
  }

  function noteFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("note-title").trim();
    const content = formData.get("note-content").trim();

    storeNoteInLS(title, content);

    const newlist = createNoteListEle(title, content);
    elements.navMenu.appendChild(newlist);

    e.target.reset();
    openNote(title, content);
  }

  // --- localStorage Functions ---

  function storeNoteInLS(title, content) {
    const newNote = { title, content };

    const data = JSON.parse(localStorage.getItem("note-data")) || [];
    const newData = [...data, newNote];

    localStorage.setItem("note-data", JSON.stringify(newData));
  }

  function deleteNoteInLS(title, content) {}

  // --- Note Functions ---
  function openNote(title, content) {
    closeNewForm();
    elements.noteTitle.textContent = title.slice(0, 25);
    elements.noteSubTitle.textContent = title;
    elements.noteBody.textContent = content;
  }

  function createNoteListEle(title, content) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.setAttribute("href", "#");
    a.classList.add("nav-link");
    a.textContent = title.slice(0, 10);
    a.onclick = () => openNote(title, content);

    li.appendChild(a);

    return li;
  }

  function noteListInitialization() {
    const data = JSON.parse(localStorage.getItem("note-data")) || [];

    data.forEach((data) => {
      const noteList = createNoteListEle(data.title, data.content);
      elements.navMenu.appendChild(noteList);
    });
  }
})();
