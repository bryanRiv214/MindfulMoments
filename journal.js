const currentDate = document.querySelector(".current-date");
const daysTag = document.querySelector(".days");
const prevNextIcon = document.querySelectorAll(".icons span");
const entriesList = document.getElementById("entries");

//Geting new date, current year and month
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

//list of months
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const renderCalender = () => {
  //get first day of the month
  let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
  //getting the last date of month
  let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
  //getting the last day of month
  let lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();
  //getting the last date of last month
  let lastDateOflastMonth = new Date(currYear, currMonth, 0).getDate();

  let liTag = "";
  //creating li of precious month last days
  for (let i = firstDayOfMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateOflastMonth - i + 1}</li>`;
  }
  //creating li of all days of current month
  for (let i = 1; i <= lastDateOfMonth; i++) {
    //adding active class to li if the current dat, month, and year match current one
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    liTag += `<li class="${isToday}">${i}</li>`;
  }
  //creating lu of next month first days
  for (let i = lastDayOfMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
  }

  currentDate.innerHTML = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;
};
renderCalender();

prevNextIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    //if the current month is less than 0 or greater than 11
    //creating a new date of current year and month and pass it as date value
    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth);
      currYear = date.getFullYear(); //updating current year with new date year
      currMonth = date.getMonth(); //updating current month with new date month
    } else {
      //ele pass new Date as date value
      date = new Date();
    }
    renderCalender();
  });
});

function addEntryToDOM(entry) {
  const listItem = document.createElement("li");
  listItem.innerHTML += `<h4 class="entry-date">${entry.when}</h4>
    <button class="entry-title">${entry.why}</button>`;
  entriesList.insertBefore(listItem, entriesList.firstChild);
  // Save the entire entriesList to localStorage
  saveEntriesListToLocalStorage();
}

// Function to save the entire entriesList to localStorage
function saveEntriesListToLocalStorage() {
  const entriesList = document.getElementById("entries").innerHTML;
  localStorage.setItem("entriesList", entriesList);
}

// Retrieve and parse the JSON from localStorage
const json = localStorage.getItem("form");
const entry = JSON.parse(json);

// Add the initial entry
addEntryToDOM(entry);
