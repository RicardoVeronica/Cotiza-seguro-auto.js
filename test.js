document.addEventListener("click", (e) => {
  if (e.target.matches("form button")) {
    submitButton(e);
  }
});

function submitButton(e) {
  e.preventDefault();
  console.log("hello fucking world");
}
