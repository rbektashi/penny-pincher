"use-strict";

//  creating code to remove form.

let form = document.querySelector(".form-container");

let submitBtn = document.querySelector(".login-btn");

submitBtn.addEventListener("click", (e) => {
  form.classList.add("display-none");
  weeksContainer.classList.remove("display-none");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let snapshot = new FormData(form);
  let name = snapshot.get("username");
  let username = document.createElement("p");
  username.innerText = name;
  console.log(name);
});

let weeks = [
  {
    week: "Week Four",
    entertainment: 75,
    food: 100,
    clothing: 25,
    bills: 850,
  },
  {
    week: "Week Three",
    entertainment: 125,
    food: 80,
    clothing: 150,
    bills: 350,
  },
  {
    week: "Week Two",
    entertainment: 220,
    food: 125,
    clothing: 0,
    bills: 110,
  },
  {
    week: "Week One",
    entertainment: 14,
    food: 100,
    clothing: 10,
    bills: 50,
  },
];
console.log(weeks);
let weeksContainer = document.querySelector(".weeks-container");

let display = () => {
  weeks.forEach((item) => {
    let weeks = document.createElement("div");
    weeks.classList.add("week-block");
    let week = document.createElement("p");
    // week.innerText = item.week;
    week.innerHTML = `${item.week} <i class="far fa-calendar-alt"> </i>`;
    let entertainment = document.createElement("p");
    entertainment.innerText = item.entertainment;
    entertainment.innerHTML = `${item.entertainment} <i class="far fa-calendar-alt"> </i>`;
    let food = document.createElement("p");
    food.innerText = item.food;
    // food.innerHTML = '<i class="far fa-calendar-alt"> </i>';
    let clothing = document.createElement("p");
    clothing.innerText = item.clothing;
    // clothing.innerHTML = '<i class="far fa-calendar-alt"> </i>';
    let bills = document.createElement("p");
    bills.innerText = item.bills;
    // bills.innerHTML = '<i class="far fa-calendar-alt"> </i>';
    weeks.append(week, entertainment, food, clothing, bills);
    weeksContainer.append(weeks);
  });
};
display();
