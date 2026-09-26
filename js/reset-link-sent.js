const sentEmail = document.getElementById("sentEmail");
const resendButton = document.getElementById("resendLink");
const resendMessage = document.getElementById("resendMessage");
const savedEmail = sessionStorage.getItem("resetEmail");

if (savedEmail) {
    sentEmail.textContent = savedEmail;
}

resendButton.addEventListener("click", function () {
    resendMessage.classList.add("show");
    resendButton.disabled = true;

    setTimeout(function () {
        resendMessage.classList.remove("show");
        resendButton.disabled = false;
    }, 2500);
});
