document.addEventListener("DOMContentLoaded", function () {
    const counterContainer = document.querySelector('.counter-container');
    const barsContainer = document.querySelector('.chart-container');

    // Animazione contatore (blocco 4)
    function animateCounter() {
        const counterElement = document.getElementById("counter");
        const targetValue = 135;
        let current = 0;

        const step = () => {
            if (current < targetValue) {
                current += 1;
                counterElement.textContent = current;
                setTimeout(step, 20);
            } else {
                counterElement.textContent = targetValue;
            }
        };

        step();
    }

    // Animazione barre (blocco 6 aggiornato)
    function animateBars() {
        const maxHeight = 300;
        const bars = [
            { id: "bar1", percentId: "p1", percentValue: 45.6 }, // 2019
            { id: "bar2", percentId: "p2", percentValue: 55.7 }  // 2023
        ];

        const duration = 3000;
        const steps = 150;

        bars.forEach((bar) => {
            const height = (bar.percentValue / 100) * maxHeight;
            const incrementHeight = height / steps;
            const incrementPercent = bar.percentValue / steps;

            let currentHeight = 0;
            let currentPercent = 0;

            const interval = setInterval(() => {
                if (currentHeight < height) {
                    currentHeight += incrementHeight;
                    currentPercent += incrementPercent;

                    document.getElementById(bar.id).style.height = currentHeight + "px";
                    document.getElementById(bar.percentId).textContent = currentPercent.toFixed(1) + "%";
                } else {
                    clearInterval(interval);
                    document.getElementById(bar.id).style.height = height + "px";
                    document.getElementById(bar.percentId).textContent = bar.percentValue.toFixed(1) + "%";
                }
            }, duration / steps);
        });
    }

    // Intersection Observer per attivare le animazioni
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target === counterContainer) {
                    animateCounter();
                }
                if (entry.target === barsContainer) {
                    animateBars();
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (counterContainer) observer.observe(counterContainer);
    if (barsContainer) observer.observe(barsContainer);
});

document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById('cookie-banner');
  const btn = document.getElementById('cookie-accept-btn');

  // Controlla se l’utente ha già accettato
  if (localStorage.getItem('cookieAccepted')) {
    banner.style.display = 'none';
  }

  btn.addEventListener('click', () => {
    localStorage.setItem('cookieAccepted', 'true');
    banner.style.display = 'none';
  });
});
