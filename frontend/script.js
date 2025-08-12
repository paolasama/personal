/**
 * Script principal para el portafolio profesional
 * Funcionalidades interactivas y efectos
 */

document.addEventListener('DOMContentLoaded', () => {
  // ======================
  // Variables globales
  // ======================
  const navbar = document.querySelector('.navbar');
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');
  const navLinks = document.querySelectorAll('.navbar-menu a');
  const contactForm = document.getElementById('contactForm');
  const currentYear = document.getElementById('currentYear');
  const skillLevels = document.querySelectorAll('.skill-level');

  // ======================
  // Funciones principales
  // ======================

  // Inicializar el año actual
  function initCurrentYear() {
    const year = new Date().getFullYear();
    currentYear.textContent = year;
  }

  // Efecto de scroll en navbar
  function handleScroll() {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Resaltar enlace activo
    highlightNavLink();
  }

  // Resaltar enlace de navegación activo
  function highlightNavLink() {
    const scrollPosition = window.scrollY + 100;

    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Animación de niveles de habilidad
  function animateSkillLevels() {
    skillLevels.forEach(level => {
      const width = level.getAttribute('data-level');
      level.style.setProperty('--width', `${width}%`);
      level.querySelector('::after').style.width = `${width}%`;
    });
  }

  // Manejar el envío del formulario
  function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado:', data);
    
    // Mostrar mensaje de éxito
    alert('¡Mensaje enviado con éxito! Gracias por contactarme.');
    contactForm.reset();
  }

  // Inicializar el menú móvil
  function initMobileMenu() {
    navbarToggle.addEventListener('click', () => {
      navbarToggle.classList.toggle('active');
      navbarMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbarMenu.classList.remove('active');
        navbarToggle.classList.remove('active');
      });
    });
  }

  // Observador de intersección para animaciones
  function initIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observar elementos que deben animarse
    document.querySelectorAll('.skill-category, .project-card, .timeline-item, .contact-form').forEach(el => {
      observer.observe(el);
    });
  }

  // ======================
  // Inicialización
  // ======================
  function init() {
    initCurrentYear();
    initMobileMenu();
    initIntersectionObserver();
    
    // Configurar eventos
    window.addEventListener('scroll', handleScroll);
    if (contactForm) contactForm.addEventListener('submit', handleFormSubmit);
    
    // Animaciones iniciales
    animateSkillLevels();
    highlightNavLink();
  }

  // Iniciar la aplicación
  init();
});