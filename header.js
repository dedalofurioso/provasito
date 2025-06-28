document.addEventListener("DOMContentLoaded", function () {
    // Carica dinamicamente l'header
    fetch('header.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('header').innerHTML = html;
            initializeHeader();  // Inizializza funzionalità header dopo che è stato caricato
        })
        .catch(error => console.error('Errore nel caricare l\'header:', error));
});

// Funzione per inizializzare eventi e comportamenti sull'header
function initializeHeader() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.querySelector('nav ul');

    // Gestione menu hamburger (mobile)
    if (hamburger && menu) {
        hamburger.addEventListener('click', function () {
            menu.classList.toggle('active');
            hamburger.classList.toggle('active');
            if (menu.classList.contains('active')) {
                hamburger.style.position = 'fixed';
                hamburger.style.top = '10px';
                hamburger.style.right = '10px';
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                hamburger.style.position = 'absolute';
                hamburger.style.top = '';
                hamburger.style.right = '';
            }
        });
    }

    // Gestione dropdown lingua (voce globo)
    const dropdownLinks = document.querySelectorAll('.navbar .dropdown > a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const submenu = this.nextElementSibling;
            if (!submenu) return;

            const isOpen = !submenu.hasAttribute('hidden');

            // Chiudi tutti i submenu aperti
            document.querySelectorAll('.submenu').forEach(menu => {
                menu.setAttribute('hidden', '');
                menu.parentElement.querySelector('a').setAttribute('aria-expanded', 'false');
            });

            if (!isOpen) {
                submenu.removeAttribute('hidden');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Chiudi sottomenu cliccando fuori
    document.addEventListener('click', function(e) {
        const dropdowns = document.querySelectorAll('.navbar .dropdown');
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            const submenu = dropdown.querySelector('.submenu');
            if (!dropdown.contains(e.target)) {
                submenu.setAttribute('hidden', '');
                link.setAttribute('aria-expanded', 'false');
            }
        });
    });
}
