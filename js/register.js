const registerForm = document.getElementById("registerForm");
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("registerEmail");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("registerPassword");
const confirmPasswordInput = document.getElementById("confirmPassword");

const nameField = document.getElementById("nameField");
const emailField = document.getElementById("registerEmailField");
const phoneField = document.getElementById("phoneField");
const passwordField = document.getElementById("registerPasswordField");
const confirmPasswordField = document.getElementById("confirmPasswordField");

const passwordButtons = document.querySelectorAll("[data-password-button]");

passwordButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const inputId = button.getAttribute("data-password-button");
        const input = document.getElementById(inputId);
        const isHidden = input.type === "password";

        input.type = isHidden ? "text" : "password";
        button.classList.toggle("is-visible", isHidden);
        button.setAttribute("aria-label", isHidden ? "إخفاء كلمة المرور" : "إظهار كلمة المرور");
    });
});

registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameIsValid = fullNameInput.value.trim().length >= 3;
    const emailIsValid = emailInput.validity.valid;
    const cleanPhone = phoneInput.value.replace(/\s/g, "");
    const phoneIsValid = /^[0-9]{7,15}$/.test(cleanPhone);
    const passwordIsValid = passwordInput.value.length >= 6;
    const passwordsMatch = passwordInput.value === confirmPasswordInput.value && confirmPasswordInput.value !== "";

    nameField.classList.toggle("has-error", !nameIsValid);
    emailField.classList.toggle("has-error", !emailIsValid);
    phoneField.classList.toggle("has-error", !phoneIsValid);
    passwordField.classList.toggle("has-error", !passwordIsValid);
    confirmPasswordField.classList.toggle("has-error", !passwordsMatch);

    fullNameInput.setAttribute("aria-invalid", String(!nameIsValid));
    emailInput.setAttribute("aria-invalid", String(!emailIsValid));
    phoneInput.setAttribute("aria-invalid", String(!phoneIsValid));
    passwordInput.setAttribute("aria-invalid", String(!passwordIsValid));
    confirmPasswordInput.setAttribute("aria-invalid", String(!passwordsMatch));

    if (!nameIsValid) {
        fullNameInput.focus();
        return;
    }

    if (!emailIsValid) {
        emailInput.focus();
        return;
    }

    if (!phoneIsValid) {
        phoneInput.focus();
        return;
    }

    if (!passwordIsValid) {
        passwordInput.focus();
        return;
    }

    if (!passwordsMatch) {
        confirmPasswordInput.focus();
        return;
    }

    sessionStorage.setItem("verifyEmail", emailInput.value.trim());
    window.location.href = "verify.html";
});

const registerInputs = document.querySelectorAll("#registerForm input");

registerInputs.forEach(function (input) {
    input.addEventListener("input", function () {
        input.closest(".field").classList.remove("has-error");
        input.removeAttribute("aria-invalid");
    });
});
