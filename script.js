"use-strict";
// main form declaration
let form = document.querySelector(".form-container");
let submitBtn = document.querySelector(".login-btn");
// constructor for transaction item
class newItem {
  constructor(price, category) {
    this.price = price;
    this.category = category;
  }
}
// set defaults to zero for activity and categories ||| used to get updated totals
let activityList = [];
let dollarsSpent = [0, 0, 0, 0];
let totalCashSpent = 0;
let totalBudget = 0;
// hiding landing page to show main content
submitBtn.addEventListener("click", (e) => {
  form.classList.add("display-none");
  weeksContainer.classList.remove("display-none");
});
// setting username on main screen
let formUsername = document.querySelector(".username-add");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let snapshot = new FormData(form);
  let name = snapshot.get("username");
  let username = document.createElement("p");
  username.innerText = name;
  formUsername.innerHTML = `Hello! <i class="fas fa-user-circle"></i> ${name}`;
  console.log(name);
});
// static data for user
let weeks = [
  {
    week: "Week 4",
    entertainment: 75,
    food: 100,
    clothing: 25,
    bills: 850,
  },
  {
    week: "Week 3",
    entertainment: 125,
    food: 80,
    clothing: 150,
    bills: 350,
  },
  {
    week: "Week 2",
    entertainment: 220,
    food: 125,
    clothing: 0,
    bills: 110,
  },
  {
    week: "Week 1",
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
// populating static data to main content page
let display = () => {
  weeksContainer.innerHTML = "";
  weeks.forEach((item, index) => {
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
    let deletebutton = document.createElement("button");
    deletebutton.innerHTML = `<img class="delete-icon delete" src="assets/delete.svg" />`;
    deletebutton.setAttribute("data-index", index);
    deletebutton.classList.add("delete");
    weeks.append(week, entertainment, food, clothing, bills, deletebutton);
    weeksContainer.append(weeks);
  });
};
display();
// hiding side panel on slideout click
slideout.addEventListener("click", (e) => {
  if (e.target.classList.contains("slideout")) {
    slideout.classList.toggle("display-none");
  }
});
// delete week by clicking trash can
weeksContainer.addEventListener("click", (e) => {
  weeksContainer.innerHTML = "";
  if (e.target.classList.contains("delete")) {
    let index = e.target.getAttribute("data-index");
    console.log(index);
    weeks.splice(index, 1);
    console.log(weeks);
  }
  display();
});
// query selectors to dynamically track total budget
let addMoolah = document.querySelector(".add-moolah");
let mainForm = document.querySelector(".main-form");
let totalCash = document.querySelector(".total-cash");
let removeCashForm = document.querySelector(".remove-cash");
let categoryForm = document.querySelector(".category-form");
let showCategory = document.querySelector(".show-category");
addMoolah.addEventListener("click", (e) => {
  e.preventDefault();
  let cashAdd = new FormData(mainForm);
  let cash = cashAdd.get("moolah");
  let cashplus = document.createElement("p");
  cashplus.innerText = cash;
  console.log(cash);
  totalCash.append(`${cash}`);
  totalBudget = Number(cash);
  removeCashForm.classList.add("display-none");
  showCategory.classList.remove("display-none");
});
// main functionality to re render total and capture transaction data
let submitCategory = document.querySelector(".submit-category");
submitCategory.addEventListener("click", (e) => {
  e.preventDefault();
  let category = new FormData(mainForm);
  let categoryAmt = category.get("amount");
  let categoryType = category.get("category");
  let categoryIcon = document.createElement("div");
  categoryIcon.innerText = ` ${categoryAmt} ${categoryType}`;
  console.log(categoryIcon);
  let total = parseFloat(totalCash.innerText);
  totalCash.innerText = "";
  let x = total;
  let y = categoryAmt;
  let updatedTotal = x - y;
  if (updatedTotal < 0) {
    alert("Watch out, you're broke!");
    let cryingPig = document.querySelector(".slideout-brand");
    cryingPig.src = "assets/cryingpig.svg";
    submitCategory.setAttribute("disabled", true);
  } else {
    totalCash.innerText = "";
    totalCash.append(updatedTotal);
  }
  const priceofitem = Number(document.querySelector("#amount").value);
  if (priceofitem > 0) {
    totalCashSpent += priceofitem;
    totalBar();
  }
  console.log(totalCashSpent);
  console.log(priceofitem);
  const categoryIdentify = document.querySelector("#category");
  const categoryName =
    categoryIdentify.options[categoryIdentify.selectedIndex].text;
  console.log(categoryName);
  const newestPurchase = new newItem(priceofitem, categoryName);
  let activityTracking = document.querySelector(".activity");
  let actiV = document.createElement("p");
  actiV.innerHTML = `<i class="far fa-minus-square remove-icon"></i> ${categoryName} $${priceofitem}`;
  activityTracking.append(actiV);
  console.log(newestPurchase);
  activityList.unshift(newestPurchase);
  const buyIndex = categoryIdentify.selectedIndex;
  refreshTotals(buyIndex, newestPurchase.price);
  // updateActivity();
  mainForm.reset();
});
// switch declaration to keep totals working correctly
let refreshTotals = (category, price = 0) => {
  dollarsSpent[category] += price;
  let totalDisplay;
  switch (category) {
    case 0:
      totalDisplay = document.querySelector("#dollars1");
      break;
    case 1:
      totalDisplay = document.querySelector("#dollars2");
      break;
    case 2:
      totalDisplay = document.querySelector("#dollars3");
      break;
    case 3:
      totalDisplay = document.querySelector("#dollars4");
      break;
  }
  totalDisplay.innerHTML = `$${dollarsSpent[category].toFixed(2)}`;
  console.log(dollarsSpent);
  refreshTotals.reset();
};

function totalBar() {
  const percentageBar = (totalCashSpent / totalBudget) * 100;
  document.getElementById("myBar").style.width = `${percentageBar}%`;
  document.getElementById(
    "myBar"
  ).innerHTML = `<img class="coin-bar" src="assets/pigcoin.svg" />${totalCashSpent}`;
  if (totalBudget < totalCashSpent) {
    document.getElementById("myBar").style.width = `100%`;
  }
  console.log(percentageBar);
}

console.log(dollarsSpent);
console.log(Object.assign({}, dollarsSpent));

let addWeekButton = document.querySelector(".add-week-btn");
addWeekButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(dollarsSpent[0]);
  let entertainmentAmount = dollarsSpent[0];
  console.log(entertainmentAmount);
  let dollarsone = document.querySelector("#dollars1");
  console.log(dollarsone);
  for (let i = 5; i < weeks.length; i++) {
    console.log(i);
  }

  let correctArray = Object.assign({}, dollarsSpent);
  let newWeek = {
    week: `Week ${weeks.length + 1}`,
    entertainment: correctArray[0],
    food: correctArray[1],
    clothing: correctArray[2],
    bills: correctArray[3],
  };
  console.log(newWeek);
  weeks.unshift(newWeek);
  console.log(weeks);
  display();
});
