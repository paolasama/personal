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

async function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  let formMessage = document.getElementById('formMessage');
  
  // Crear elemento de mensaje si no existe
  if (!formMessage) {
    formMessage = document.createElement('div');
    formMessage.id = 'formMessage';
    formMessage.style.padding = '10px';
    formMessage.style.margin = '10px 0';
    formMessage.style.borderRadius = '4px';
    form.insertBefore(formMessage, submitBtn);
  }

  try {
    // Configuración inicial
    submitBtn.disabled = true;
    formMessage.style.display = 'none';

    // Obtener datos del formulario
    const formData = new FormData(form);
    const data = {
      nombre: formData.get('nombre').trim(),
      correo_electronico: formData.get('email').trim(),
      asunto: formData.get('asunto').trim(),
      mensaje: formData.get('mensaje').trim()
    };

    // Validación mejorada
    if (!data.nombre) throw new Error('El nombre es requerido');
    if (!data.correo_electronico) throw new Error('El correo electrónico es requerido');
    if (!data.mensaje) throw new Error('El mensaje es requerido');
    
    // Validar formato de email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.correo_electronico)) {
      throw new Error('Por favor ingresa un correo electrónico válido');
    }

    // Enviar a la API
    const response = await fetch('http://localhost:3001/api/contacto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || `Error HTTP: ${response.status}`);
    }

    // Éxito
    showMessage('¡Mensaje enviado con éxito!', 'success');
    form.reset();

  } catch (error) {
    showMessage(error.message || 'Error al enviar el mensaje', 'error');
    console.error('Error en handleFormSubmit:', error);
  } finally {
    submitBtn.disabled = false;
  }
}

// Función unificada para mostrar mensajes
function showMessage(message, type) {
  const el = document.getElementById('formMessage');
  if (!el) return;
  
  el.textContent = message;
  el.style.display = 'block';
  
  if (type === 'success') {
    el.style.color = '#155724';
    el.style.backgroundColor = '#d4edda';
    el.style.border = '1px solid #c3e6cb';
  } else {
    el.style.color = '#721c24';
    el.style.backgroundColor = '#f8d7da';
    el.style.border = '1px solid #f5c6cb';
  }
}

// Agregar event listener de forma segura
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
});

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