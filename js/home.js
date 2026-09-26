const menuButton = document.getElementById("menuButton");
const navContent = document.getElementById("navContent");
const navLinks = document.querySelectorAll(".nav-content a");

function setMenuState(isOpen) {
    navContent.classList.toggle("show", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "إغلاق القائمة" : "فتح القائمة");
}

function toggleMenu() {
    setMenuState(!navContent.classList.contains("show"));
}

function closeMenu() {
    setMenuState(false);
}

if (menuButton && navContent) {
    menuButton.addEventListener("click", toggleMenu);
    navLinks.forEach((link) => link.addEventListener("click", closeMenu));
}

// Landing page motion: subtle, progressive and disabled for reduced-motion users.
const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion) {
    const revealTargets = document.querySelectorAll(
        ".section-title, .how-grid > *, .feature-card, .contact-strip > *, .growth-text, .growth-visual, .footer-about, .footer-links, .footer-contact"
    );

    revealTargets.forEach((element, index) => {
        element.classList.add("reveal-item");
        element.style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.14, rootMargin: "0px 0px -35px 0px" });

    revealTargets.forEach((element) => revealObserver.observe(element));

    const growthVisual = document.querySelector(".growth-visual");
    if (growthVisual) {
        growthVisual.addEventListener("pointermove", (event) => {
            const rect = growthVisual.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width - 0.5) * 6;
            const y = ((event.clientY - rect.top) / rect.height - 0.5) * 6;
            growthVisual.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
        growthVisual.addEventListener("pointerleave", () => {
            growthVisual.style.transform = "translate3d(0, 0, 0)";
        });
    }
}
