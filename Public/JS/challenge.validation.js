document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.getElementById("name");
  const descriptionInput = document.getElementById("description");
  const submitBtn = document.getElementById("submit");

  function validateInputs() {
    const isNameValid = nameInput.value.trim().length > 5;
    const isDescriptionValid = descriptionInput.value.trim() !== "";

    if (isNameValid && isDescriptionValid) {
      submitBtn.disabled = false;
      submitBtn.classList.remove("opacity-30", "cursor-not-allowed");
      submitBtn.classList.add("opacity-100", "cursor-pointer");
    } else {
      submitBtn.disabled = true;
      submitBtn.classList.add("opacity-30", "cursor-not-allowed");
      submitBtn.classList.remove("opacity-100", "cursor-pointer");
    }
  }

  nameInput.addEventListener("input", validateInputs);
  descriptionInput.addEventListener("input", validateInputs);
});
