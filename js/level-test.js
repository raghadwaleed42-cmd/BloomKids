const finishTestButton = document.getElementById("finishTestButton");

finishTestButton.addEventListener("click", function () {
    const selectedAnswer = document.querySelector(".answer-option.selected");

    if (!selectedAnswer) {
        showDashboardMessage("اختر إجابة أولاً");
        return;
    }

    window.location.href = "child-profile.html";
});
