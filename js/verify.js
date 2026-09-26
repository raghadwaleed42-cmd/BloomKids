const verifyForm = document.getElementById("verifyForm");
const otpInputs = document.querySelectorAll(".otp-input");
const otpError = document.getElementById("otpError");
const resendButton = document.getElementById("resendCode");

otpInputs.forEach(function (input, index) {
    input.addEventListener("input", function () {
        input.value = input.value.replace(/\D/g, "");
        otpError.classList.remove("show");

        if (input.value && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
        }
    });

    input.addEventListener("keydown", function (event) {
        if (event.key === "Backspace" && !input.value && index > 0) {
            otpInputs[index - 1].focus();
        }
    });
});

verifyForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let code = "";

    otpInputs.forEach(function (input) {
        code += input.value;
    });

    if (code.length !== otpInputs.length) {
        otpError.classList.add("show");
        otpInputs[0].focus();
        return;
    }

    window.location.href = "success.html";
});

resendButton.addEventListener("click", function () {
    resendButton.textContent = "تم الإرسال";
    resendButton.disabled = true;

    setTimeout(function () {
        resendButton.textContent = "إعادة الإرسال";
        resendButton.disabled = false;
    }, 2000);
});
