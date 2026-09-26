// عند فتح صفحة تسجيل الدخول نعتبر الجلسة التجريبية السابقة منتهية.
sessionStorage.removeItem("bloomKidsDemoAuth");
sessionStorage.removeItem("bloomKidsDemoRole");
sessionStorage.removeItem("bloomKidsDemoEmail");

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailField = document.getElementById("emailField");
const passwordField = document.getElementById("passwordField");
const loginMessage = document.getElementById("loginMessage");
const passwordButton = document.querySelector("[data-password-button]");

passwordButton.addEventListener("click", function () {
    const isHidden = passwordInput.type === "password";

    passwordInput.type = isHidden ? "text" : "password";
    passwordButton.classList.toggle("is-visible", isHidden);
    passwordButton.setAttribute("aria-label", isHidden ? "إخفاء كلمة المرور" : "إظهار كلمة المرور");
});

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const emailIsValid = emailInput.validity.valid;
    const passwordIsValid = passwordInput.value.length >= 6;

    emailField.classList.toggle("has-error", !emailIsValid);
    passwordField.classList.toggle("has-error", !passwordIsValid);
    emailInput.setAttribute("aria-invalid", String(!emailIsValid));
    passwordInput.setAttribute("aria-invalid", String(!passwordIsValid));
    loginMessage.classList.remove("show");

    if (!emailIsValid) {
        emailInput.focus();
        return;
    }

    if (!passwordIsValid) {
        passwordInput.focus();
        return;
    }

    // تسجيل دخول تجريبي Frontend فقط — بدون API أو Backend.
    // يتم تحديد الواجهة من البريد لتسهيل تجربة الأدوار داخل النموذج.
    const email = emailInput.value.trim().toLowerCase();
    const requestedRole = new URLSearchParams(window.location.search).get("role");
    let destination = "parent-dashboard.html";
    let role = "parent";

    if (requestedRole === "teacher") {
        destination = "teacher-dashboard.html";
        role = "teacher";
    } else if (requestedRole === "admin") {
        destination = "admin-dashboard.html";
        role = "admin";
    } else if (requestedRole === "parent") {
        destination = "parent-dashboard.html";
        role = "parent";
    } else if (email.includes("admin")) {
        destination = "admin-dashboard.html";
        role = "admin";
    } else if (email.includes("teacher") || email.includes("moalem") || email.includes("muallim")) {
        destination = "teacher-dashboard.html";
        role = "teacher";
    }

    sessionStorage.setItem("bloomKidsDemoAuth", "true");
    sessionStorage.setItem("bloomKidsDemoRole", role);
    sessionStorage.setItem("bloomKidsDemoEmail", email);

    // استبدال الصفحة مباشرة حتى لا تظهر رسالة انتظار API.
    window.location.replace(destination);
});

emailInput.addEventListener("input", function () {
    emailField.classList.remove("has-error");
    emailInput.removeAttribute("aria-invalid");
});

passwordInput.addEventListener("input", function () {
    passwordField.classList.remove("has-error");
    passwordInput.removeAttribute("aria-invalid");
});


// أزرار الدخول السريع للمناقشة: لا تحتاج بريدًا أو كلمة مرور.
document.querySelectorAll("[data-demo-role]").forEach(function (button) {
    button.addEventListener("click", function () {
        const role = button.dataset.demoRole;
        const destination = button.dataset.demoDestination;

        if (!role || !destination) return;

        sessionStorage.setItem("bloomKidsDemoAuth", "true");
        sessionStorage.setItem("bloomKidsDemoRole", role);
        sessionStorage.setItem("bloomKidsDemoEmail", role + "@bloomkids.demo");

        window.location.href = destination;
    });
});
