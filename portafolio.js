document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileNav = document.querySelector('nav');
    const projectsMenuItemLink = document.querySelector('.projects-menu > a');
    const projectsMenuItemLi = document.querySelector('.projects-menu');
    const submenu = document.querySelector('.submenu');
    const backToTopButton = document.querySelector('.back-to-top a');
    const navLinks = document.querySelectorAll('nav a');

    // Mostrar/ocultar el menú móvil al hacer clic en el botón
    if (mobileMenuButton && mobileNav) {
        mobileMenuButton.addEventListener('click', function() {
            mobileNav.classList.toggle('open');
            if (projectsMenuItemLi) {
                projectsMenuItemLi.classList.remove('open-submenu'); // Cerrar el submenu si el menú principal se abre/cierra
            }
        });
    }

    // Mostrar/ocultar el submenu de proyectos al hacer clic en el item "Proyectos"
    if (projectsMenuItemLink && projectsMenuItemLi && submenu) {
        projectsMenuItemLink.addEventListener('click', function(event) {
            event.preventDefault(); // Evitar el desplazamiento del enlace principal
            if (window.innerWidth <= 768) {
                projectsMenuItemLi.classList.toggle('open-submenu');
            } else {
                submenu.style.display = submenu.style.display === 'flex' ? 'none' : 'flex';
            }
        });

        // Ocultar el submenu si se hace clic fuera del menú en escritorio
        document.addEventListener('click', function(event) {
            if (window.innerWidth > 768 && !projectsMenuItemLi.contains(event.target) && submenu.style.display === 'flex') {
                submenu.style.display = 'none';
            }
        });

        // Comportamiento del submenu en escritorio (hover) - Opcional, puedes comentar si solo quieres clic
        projectsMenuItemLi.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                submenu.style.display = 'flex';
            }
        });

        projectsMenuItemLi.addEventListener('mouseleave', function(event) {
            if (window.innerWidth > 768 && !submenu.contains(event.relatedTarget)) {
                submenu.style.display = 'none';
            }
        });
    }

    // Cerrar el menú móvil si se hace clic fuera de él
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768 && mobileNav.classList.contains('open') && !mobileMenuButton.contains(event.target) && !mobileNav.contains(event.target)) {
            mobileNav.classList.remove('open');
            if (projectsMenuItemLi) {
                projectsMenuItemLi.classList.remove('open-submenu');
            }
        }
    });

    // Desplazamiento suave al hacer clic en los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                event.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
                // Ocultar el menú móvil y el submenu después de hacer clic en un enlace
                if (window.innerWidth <= 768 && mobileNav.classList.contains('open')) {
                    mobileNav.classList.remove('open');
                    if (projectsMenuItemLi) {
                        projectsMenuItemLi.classList.remove('open-submenu');
                    }
                }
            } else if (this.getAttribute('href') === '#' && window.innerWidth > 768 && projectsMenuItemLink === this) {
                // Evitar que el enlace "Proyectos" sin submenú haga scroll en escritorio
                event.preventDefault();
            }
        });
    });

    // Volver al inicio
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(event) {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});