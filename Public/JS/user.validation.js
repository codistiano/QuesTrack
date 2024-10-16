document.addEventListener("DOMContentLoaded", function () {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const submitBtn = document.getElementById("submitBtn");
  
    function validateInputs() {
      const isUsernameValid = usernameInput.value.trim().length >= 4;
      const isPasswordValid = passwordInput.value.trim().length >= 8;
  
      if (isUsernameValid && isPasswordValid) {
        submitBtn.disabled = false;
        submitBtn.classList.remove("opacity-30", "cursor-not-allowed");
        submitBtn.classList.add("opacity-100", "cursor-pointer");
      } else {
        submitBtn.disabled = true;
        submitBtn.classList.add("opacity-30", "cursor-not-allowed");
        submitBtn.classList.remove("opacity-100", "cursor-pointer");
      }
    }
  
    // Attach the validation function to input events
    usernameInput.addEventListener("input", validateInputs);
    passwordInput.addEventListener("input", validateInputs);
  });
  