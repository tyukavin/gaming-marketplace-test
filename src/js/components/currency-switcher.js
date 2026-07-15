const ACTIVE_CLASS = "services__currency-button--active";

export function initCurrencySwitchers() {
    const switchers = document.querySelectorAll("[data-currency-switcher]");

    switchers.forEach((switcher) => {
        const buttons = switcher.querySelectorAll(".services__currency-button");

        switcher.addEventListener("click", (event) => {
            const selectedButton = event.target.closest(
                ".services__currency-button",
            );

            if (!selectedButton || !switcher.contains(selectedButton)) {
                return;
            }

            buttons.forEach((button) => {
                const isSelected = button === selectedButton;

                button.classList.toggle(ACTIVE_CLASS, isSelected);
                button.setAttribute("aria-pressed", String(isSelected));
            });
        });
    });
}
