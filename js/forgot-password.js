const forgotForm = document.getElementById("forgotForm");
const emailInput = document.getElementById("forgotEmail");
const emailField = document.getElementById("forgotEmailField");

forgotForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const emailIsValid = emailInput.validity.valid;
    emailField.classList.toggle("has-error", !emailIsValid);
    emailInput.setAttribute("aria-invalid", String(!emailIsValid));

    if (!emailIsValid) {
        emailInput.focus();
        return;
    }

    sessionStorage.setItem("resetEmail", emailInput.value.trim());
    sessionStorage.removeItem("resetCodeVerified");
    window.location.href = "reset-code.html";
});

emailInput.addEventListener("input", function () {
    emailField.classList.remove("has-error");
    emailInput.removeAttribute("aria-invalid");
});
