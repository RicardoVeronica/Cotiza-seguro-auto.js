// Insurance prototype
function Insurance(brand, year, type) {
  this.brand = brand;
  this.year = year;
  this.type = type;
}

// Calculate insurance
Insurance.prototype.quoteInsurance = function () {
  const base = 2000;
  let amount;

  switch (this.brand) {
    case "1":
      // Americano = 1.15 = 2300
      amount = base * 1.15;
      break;
    case "2":
      // Asiatico = 1.05 = 2100
      amount = base * 1.05;
      break;
    case "3":
      // Europeo = 1.35 = 2700
      amount = base * 1.35;
      break;
  }

  // calculate year (-3% per year)
  const diff = new Date().getFullYear() - this.year;
  amount -= (diff * 3 * amount) / 100;

  // calculate type (basico = amount * 30%) || (completo = amount * 50%)
  if (this.type === "basico") amount *= 1.3;
  if (this.type === "completo") amount *= 1.5;

  return amount;
};

// User interface prototype
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

// Shows message validation
UserInterface.prototype.showMessage = (msg, type) => {
  const form = document.getElementById("cotizar-seguro");
  const result = document.getElementById("resultado");
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerText = msg;

  if (type === "error") div.classList.add("error");
  else div.classList.add("correcto");

  form.insertBefore(div, result);

  setTimeout(() => {
    div.remove();
  }, 2500);
};

UserInterface.prototype.showResult = (insurance, total) => {
  const resultDiv = document.getElementById("resultado");
  let { brand, year, type } = insurance;

  if (brand === "1") brand = "Americano";
  if (brand === "2") brand = "Asiatico";
  if (brand === "3") brand = "Europeo";

  const div = document.createElement("div");
  div.classList.add("mt-10");
  div.innerHTML = `
    <p class="header">Tu resumen</p>
    <p class="font-bold">Brand: <span class="font-normal">${brand}</span></p>
    <p class="font-bold">Year: <span class="font-normal">${year}</span></p>
    <p class="font-bold">Insurance: <span class="font-normal capitalize">${type}</span></p>
    <p class="font-bold">Total: <span class="font-normal">$${total}</span></p>
  `;

  // shows spinner
  const spinner = document.getElementById("cargando");
  spinner.style.display = "block";

  setTimeout(() => {
    spinner.style.display = "none";
    resultDiv.appendChild(div);
  }, 2500);
};

// Instances
const ui = new UserInterface();

// Events
document.addEventListener("DOMContentLoaded", () => {
  UserInterface.prototype.fullYearOption();
});

document.addEventListener("click", (e) => {
  if (e.target.matches("form button")) {
    readUserInfo(e);
  }
});

function readUserInfo(e) {
  e.preventDefault();

  // Read brand
  const brandSelected = document.getElementById("marca").value;
  // Read year
  const yearSelected = document.getElementById("year").value;
  // Read type
  const typeSelected = document.querySelector("input[name='tipo']:checked")
    .value;

  if (brandSelected === "" || yearSelected === "" || typeSelected === "") {
    ui.showMessage("Todos los campos son obligatorios", "error");
    return;
  }

  ui.showMessage("Cotizando...", "correcto");

  // remove previous quoteInsurance
  const previousQuotes = document.querySelector("#resultado div");
  if (previousQuotes != null) {
    previousQuotes.remove();
  }

  const insurance = new Insurance(brandSelected, yearSelected, typeSelected);
  const total = insurance.quoteInsurance();

  ui.showResult(insurance, total);
}
