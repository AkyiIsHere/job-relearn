const menuBtn = document.getElementById("menuBtn");
const navContainer = document.querySelector(".nav-container");
const nav = document.getElementById("nav");
const arrIcon = document.querySelector(".arr-icon");
const burgerBtn = document.querySelector(".burger-btn");
const btnContainer = document.querySelector(".btn-container");
const autoExpandInputs = document.querySelectorAll('.auto-expand');

menuBtn.addEventListener('click', toggleNav);
burgerBtn.addEventListener('click', toggleOptionButtons);

if (window.innerWidth > 426) {
    openNav();
}

//Auto Expand Feature
autoExpandInputs.forEach(input => {
    input.addEventListener('input', () => {
        input.style.height = "200px";
        if (input.scrollHeight >= 200) {
            input.style.height = 'auto';
            input.style.height = input.scrollHeight + "px";
        }
    });
});

// Functions
function toggleNav(e) {
    nav.classList.contains('active') ? closeNav() : openNav();
}

function openNav() {
    const navWidth = nav.offsetWidth;

    navContainer.classList.add('active');
    nav.classList.add('active');
    arrIcon.classList.add('active');
    menuBtn.style.left = `${navWidth}px`;

    document.addEventListener('click', closeNavHandler);
    navContainer.style.zIndex = "11";
}

function closeNav() {
    navContainer.classList.remove('active');
    nav.classList.remove('active');
    arrIcon.classList.remove('active');
    menuBtn.style.left = '0';

    document.removeEventListener('click', closeNavHandler);
    onTransitionEnd(navContainer, () => {
        navContainer.style.zIndex = "-10";
    });
}

function closeNavHandler(e) {
    const isSmallScreen = window.innerWidth <= 426;
    const clickedOutside = !nav.contains(e.target) && e.target !== menuBtn && e.target !== arrIcon;

    if (isSmallScreen && clickedOutside) {
        closeNav();
    }
}

function toggleOptionButtons() {
    const isActive = btnContainer.classList.toggle('active');

    if (isActive) {
        onTransitionEnd(btnContainer, (event) => {
            event.target.style.zIndex = "11";
        });
        document.addEventListener('click', closeOptionHandler);
    } else {
        btnContainer.style.zIndex = "-11";
        document.removeEventListener('click', closeOptionHandler);
    }
}

function closeOptionHandler(e) {
    const clickedOutside = !btnContainer.contains(e.target) && e.target !== burgerBtn;

    if (clickedOutside) {
        toggleOptionButtons();
    }
}

function onTransitionEnd(element, callback) {
    function handler(event) {
        if (event.target === element) {
            callback(event);
            element.removeEventListener('transitionend', handler);
        }
    }
    element.addEventListener('transitionend', handler);
}

function isFocusAble(ele) {
    return ele.tabIndex >= 0;
}