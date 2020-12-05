document.addEventListener("DOMContentLoaded", () => {
  UserInterface.prototype.fullYearOption();
});

// Construct
function Secure(brand, year, type) {
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
