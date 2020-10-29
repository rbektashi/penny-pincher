"use-strict";

//  creating code to remove form.

let form = document.querySelector(".form-container");

let submitBtn = document.querySelector(".login-btn");

submitBtn.addEventListener("click", (e) => {
  form.classList.add("display-none");
  weeksContainer.classList.remove("display-none");
});

let formUsername = document.querySelector(".username-add");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let snapshot = new FormData(form);
  let name = snapshot.get("username");
  let username = document.createElement("p");
  username.innerText = name;
  formUsername.innerHTML = `<i class="fas fa-user-circle"></i> ${name}`;
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
let slideout = document.querySelector(".slideout");
let burgerNavigation = document.querySelector(".fa-hamburger");
burgerNavigation.addEventListener("click", (e) => {
  e.preventDefault();
  slideout.classList.toggle("display-none");
});

let display = () => {
  weeks.forEach((item) => {
    let weeks = document.createElement("div");
    weeks.classList.add("week-block");
    let week = document.createElement("p");
    week.classList.add("week-style");
    // week.innerText = item.week;
    week.innerHTML = `<img class="ent-size calendar-img" src="assets/calendar.svg"/>${item.week}`;
    let entertainment = document.createElement("p");
    entertainment.innerText = item.entertainment;
    entertainment.innerHTML = `<img class="ent-size" src="assets/ticket (2).svg"/> Entertainment: $${item.entertainment}`;
    let food = document.createElement("p");
    food.innerText = item.food;
    food.innerHTML = `<img class="ent-size" src="assets/vegetables.svg"/> Food: $${item.food}`;
    let clothing = document.createElement("p");
    clothing.innerText = item.clothing;
    clothing.innerHTML = `<img class="ent-size" src="assets/hoodie.svg"/> Clothing: $${item.clothing}`;
    let bills = document.createElement("p");
    bills.innerText = item.bills;
    bills.innerHTML = `<img class="ent-size" src="assets/home.svg"/> Bills: $${item.bills}`;
    weeks.append(week, entertainment, food, clothing, bills);
    weeksContainer.append(weeks);
  });
};
display();
