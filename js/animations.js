(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.08 });

    document.querySelectorAll('.section .kicker, .section h2, .section .lead, .card, .gallery-tile, .illustration-box, .location, .cta').forEach((element) => {
        // Keep content visible if initialization fails or JavaScript is unavailable.
        observer.observe(element);
        element.classList.add('reveal');
    });

    preference.addEventListener('change', (event) => {
        if (!event.matches) return;
        observer.disconnect();
        document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
    });
})();