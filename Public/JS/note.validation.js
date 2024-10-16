document.addEventListener("DOMContentLoaded", function () {
  const titleInput = document.getElementById("title");
  const noteInput = document.getElementById("note");
  const submitBtn = document.getElementById("submit");

  function validateInputs() {
    const isTitleValid =
      titleInput.value.trim().length > 5 &&
      titleInput.value.trim().length < 150;
    const isNoteValid = noteInput.value.trim().length > 20;

    if (isTitleValid && isNoteValid) {
      submitBtn.disabled = false;
      submitBtn.classList.remove("opacity-30", "cursor-not-allowed");
      submitBtn.classList.add("opacity-100", "cursor-pointer");
    } else {
      submitBtn.disabled = true;
      submitBtn.classList.add("opacity-30", "cursor-not-allowed");
      submitBtn.classList.remove("opacity-100", "cursor-pointer");
    }
  }

  titleInput.addEventListener("input", validateInputs);
  noteInput.addEventListener("input", validateInputs);
});
