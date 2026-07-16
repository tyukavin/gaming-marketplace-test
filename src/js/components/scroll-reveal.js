const REVEAL_SELECTOR = "[data-reveal]";
const REVEAL_CLASS = "reveal";
const VISIBLE_CLASS = "is-visible";

export function initScrollReveal() {
    const elements = document.querySelectorAll(REVEAL_SELECTOR);

    if (!elements.length) {
        return;
    }

    if (
        !window.IntersectionObserver ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        return;
    }

    elements.forEach((element) => element.classList.add(REVEAL_CLASS));

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add(VISIBLE_CLASS);
                observer.unobserve(entry.target);
            });
        },
        {
            rootMargin: "0px 0px -64px",
            threshold: 0.08,
        },
    );

    elements.forEach((element) => observer.observe(element));
}
