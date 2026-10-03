const resetCodeForm = document.getElementById("resetCodeForm");
const resetCodeInputs = Array.from(document.querySelectorAll(".reset-code-page .otp-input"));
const resetCodeError = document.getElementById("resetCodeError");
const resetCodeEmail = document.getElementById("resetCodeEmail");
const resendResetCode = document.getElementById("resendResetCode");
const resendTimer = document.getElementById("resendTimer");

const savedEmail = sessionStorage.getItem("resetEmail");
if (savedEmail) {
    resetCodeEmail.textContent = savedEmail;
}

resetCodeInputs.forEach(function (input, index) {
    input.addEventListener("input", function () {
        input.value = input.value.replace(/\D/g, "").slice(0, 1);
        resetCodeError.classList.remove("show");
        if (input.value && index < resetCodeInputs.length - 1) {
            resetCodeInputs[index + 1].focus();
        }
    });

    input.addEventListener("keydown", function (event) {
        if (event.key === "Backspace" && !input.value && index > 0) {
            resetCodeInputs[index - 1].focus();
        }
    });

    input.addEventListener("paste", function (event) {
        const pasted = (event.clipboardData || window.clipboardData).getData("text").replace(/\D/g, "").slice(0, 6);
        if (!pasted) return;
        event.preventDefault();
        pasted.split("").forEach(function (digit, digitIndex) {
            if (resetCodeInputs[digitIndex]) resetCodeInputs[digitIndex].value = digit;
        });
        resetCodeInputs[Math.min(pasted.length, resetCodeInputs.length) - 1].focus();
        resetCodeError.classList.remove("show");
    });
});

resetCodeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const code = resetCodeInputs.map(input => input.value).join("");
    if (code.length !== 6) {
        resetCodeError.classList.add("show");
        const firstEmpty = resetCodeInputs.find(input => !input.value);
        (firstEmpty || resetCodeInputs[0]).focus();
        return;
    }

    sessionStorage.setItem("resetCodeVerified", "true");
    window.location.href = "reset-password.html";
});

let timerId;
function startResendTimer(seconds = 30) {
    clearInterval(timerId);
    let remaining = seconds;
    resendResetCode.disabled = true;
    resendTimer.textContent = `(${remaining}ث)`;
    timerId = setInterval(function () {
        remaining -= 1;
        if (remaining <= 0) {
            clearInterval(timerId);
            resendResetCode.disabled = false;
            resendTimer.textContent = "";
            resendResetCode.textContent = "إعادة الإرسال";
            return;
        }
        resendTimer.textContent = `(${remaining}ث)`;
    }, 1000);
}

resendResetCode.addEventListener("click", function () {
    resendResetCode.textContent = "تم الإرسال";
    startResendTimer(30);
});
