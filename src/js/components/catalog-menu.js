export function initCatalogMenu() {
    const toggle = document.querySelector("[data-catalog-toggle]");
    const menu = document.querySelector("[data-catalog-menu]");

    if (!toggle || !menu) {
        return;
    }

    const isOpen = () => toggle.getAttribute("aria-expanded") === "true";

    const openMenu = () => {
        menu.hidden = false;
        toggle.setAttribute("aria-expanded", "true");
    };

    const closeMenu = (restoreFocus = false) => {
        menu.hidden = true;
        toggle.setAttribute("aria-expanded", "false");

        if (restoreFocus) {
            toggle.focus();
        }
    };

    toggle.addEventListener("click", () => {
        if (isOpen()) {
            closeMenu();
            return;
        }

        openMenu();
    });

    document.addEventListener("pointerdown", (event) => {
        if (
            isOpen() &&
            !menu.contains(event.target) &&
            !toggle.contains(event.target)
        ) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && isOpen()) {
            closeMenu(true);
        }
    });
}
