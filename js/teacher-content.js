(function () {
    const optionButtons = document.querySelectorAll('.row-options-btn');

    function closeAll(exceptButton) {
        optionButtons.forEach((button) => {
            if (button === exceptButton) return;
            button.setAttribute('aria-expanded', 'false');
            const menu = button.nextElementSibling;
            if (menu) menu.classList.remove('open');
        });
    }

    optionButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            const menu = button.nextElementSibling;
            const isOpen = button.getAttribute('aria-expanded') === 'true';

            closeAll(button);
            button.setAttribute('aria-expanded', String(!isOpen));
            if (menu) menu.classList.toggle('open', !isOpen);
        });
    });

    document.addEventListener('click', () => closeAll());

    document.querySelectorAll('[data-delete-row]').forEach((button) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            const row = button.closest('tr');
            if (row) row.remove();
        });
    });
})();
