// const homeBtn = document.querySelector("#home-btn");
// const profileBtn = document.querySelector("#profile-btn");
// const settingBtn = document.querySelector("#setting-btn");

const btns = document.querySelectorAll(".nav-button");
const tabs = document.querySelectorAll(".tab");

btns.forEach(btn => {
    btn.addEventListener("click", e => displayContent(e))
})


function displayContent (e) {
    const currentBtn = e.target;

    btns.forEach(btn => btn.classList.remove("active"));
    currentBtn.classList.add("active");
    
    let contentEle = document.getElementById(currentBtn.dataset.tab);

    tabs.forEach(tab => tab.classList.remove('active'));
    // contentEle.style.display = "block";
    contentEle.classList.add('active');

}
