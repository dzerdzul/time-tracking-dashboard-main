"use strict";


const elementCards = document.querySelector(".profile__cards-wrapper");
let loadData;
fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
        populateItem(data)
        loadData = [...data];
        addData(data, document.querySelector(".profile__nav-item--active button"));
    })

function populateItem(data) {
    let items = data.map((value, index) => {
        return `
    <div class="profile__card" data-activity="${value.title.toLowerCase()}">
    <div class="profile__card-content">
    <div class="profile__card-title-wrapper">
        <h2 class="profile__card-title">${value.title}</h2>
        <button type="button" popovertarget="popover${index}" style="anchor-name: --popover${index}">
        <img src="./images/icon-ellipsis.svg" alt="activity's menu">
        </button>
        <dialog class="profile__card-menu" id="popover${index}" style="position-anchor: --popover${index}" popover>
            <div class="profile__card-menu-content">
            <button type="button">Edit-${value.title}</button>
            <button type="button">Delete</button>
            </div>
        </dialog>
        </div>
        <div class="profile__card-timeframe">
                <h3></h3>
                <p></p>
        </div>
    </div>
        
    </div>
    `
    }).join("");

    elementCards.innerHTML = items;
}

function addData(data, timeElement) {
    const activity = document.getElementsByClassName("profile__card-timeframe");
    const last = ["Yesterday", "Last Week", "Last Month"];
    const clickTimeElement = timeElement.textContent.toLowerCase();

    for (let i = 0; i < activity.length; i++) {
        const hours = data[i].timeframes[clickTimeElement];
        activity[i].firstElementChild.textContent = `${hours.current}${hours.current === 1 ? "hr" : "hrs"}`;
        activity[i].lastElementChild.textContent = `${clickTimeElement === "daily" ? last[0] : clickTimeElement === "weekly" ? last[1] : last[2]} - ${hours.previous}${hours.previous === 1 ? "hr" : "hrs"}`;
    }
}


document.querySelector(".profile__nav-list").addEventListener("click", (event) => { 
    //event delegation
    if (event.target.tagName === "BUTTON") {
        event.currentTarget.querySelector(".profile__nav-item--active").classList.remove("profile__nav-item--active");
        event.target.parentElement.classList.add("profile__nav-item--active");
        const timeElement = event.target;
        addData(loadData, timeElement);
}
})