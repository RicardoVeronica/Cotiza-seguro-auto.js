document.addEventListener("DOMContentLoaded", () => {
  UserInterface.prototype.fullYearOption();
});

document.addEventListener("click", (e) => {
  if (e.target.matches("form button")) {
    quoteInsurance(e);
  }
});

function quoteInsurance(e) {
  e.preventDefault();

  // Read brand
  const brandSelected = document.getElementById("marca").value;
  // Read year
  const yearSelected = document.getElementById("year").value;
  // Read type
  const typeSelected = document.querySelector("input[name='tipo']:checked")
    .value;

  if (brandSelected === "" || yearSelected === "" || typeSelected === "")
    console.log(false);
  else console.log(true);
}

// Construct
function Insurance(brand, year, type) {
  this.brand = brand;
  this.year = year;
  this.type = type;
}

// User interface
function UserInterface() {}

// Creates year options for brand cars
UserInterface.prototype.fullYearOption = () => {
  const maxYear = new Date().getFullYear();
  const minYear = maxYear - 20;
  const selectYear = document.getElementById("year");

  for (let i = maxYear; i > minYear; i--) {
    let options = document.createElement("option");
    options.value = i;
    options.textContent = i;
    selectYear.appendChild(options);
  }
};

// Instance of UserInterface
const ui = new UserInterface();
