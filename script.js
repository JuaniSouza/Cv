// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll(
  ".section-title, .about-content, .project-card, .timeline-item, .contact-container",
);

animatedElements.forEach((el) => observer.observe(el));

// Carrusel de Habilidades Infinito
const carousel = document.querySelector(".skills-carousel");
const slides = document.querySelectorAll(".skill-slide");

// Duplicar los slides para crear el efecto infinito
slides.forEach((slide) => {
  const clone = slide.cloneNode(true);
  carousel.appendChild(clone);
});

// ============================================
// 📧 CONFIGURACIÓN DE EMAILJS
// ============================================

// Configuración con tus IDs de EmailJS
const EMAILJS_CONFIG = {
  publicKey: "mAORb-ruiap4k_ZD6",
  serviceID: "service_8cln4ft",
  templateID: "template_9kykgzh",
};

// Inicializar EmailJS
emailjs.init(EMAILJS_CONFIG.publicKey);

// Form submission con EmailJS
const contactForm = document.querySelector(".contact-form");
const submitBtn = document.querySelector(".submit-btn");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Obtener los valores del formulario
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Validación básica
  if (!name || !email || !message) {
    alert("Por favor completá todos los campos");
    return;
  }

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Por favor ingresá un email válido");
    return;
  }

  // Deshabilitar el botón mientras se envía
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

  // Parámetros para la plantilla de EmailJS
  const templateParams = {
    name: name,
    email: email,
    message: message,
  };

  // Enviar email usando EmailJS
  emailjs
    .send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, templateParams)
    .then(
      (response) => {
        console.log(
          "Email enviado exitosamente!",
          response.status,
          response.text,
        );

        // Mostrar mensaje de éxito
        alert("¡Gracias por tu mensaje! Te contactaré pronto. 😊");

        // Resetear el formulario
        contactForm.reset();

        // Restaurar el botón
        submitBtn.disabled = false;
        submitBtn.innerHTML =
          '<i class="fas fa-paper-plane"></i> Enviar Mensaje';
      },
      (error) => {
        console.error("Error al enviar el email:", error);

        // Mostrar mensaje de error más específico
        let errorMessage = "Hubo un error al enviar el mensaje. ";

        if (error.text) {
          errorMessage += "Por favor intentá nuevamente.";
        } else {
          errorMessage +=
            "Verificá tu conexión a internet e intentá nuevamente.";
        }

        alert(errorMessage);

        // Restaurar el botón
        submitBtn.disabled = false;
        submitBtn.innerHTML =
          '<i class="fas fa-paper-plane"></i> Enviar Mensaje';
      },
    );
});

// Add stagger animation to project cards
document.querySelectorAll(".project-card").forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.1}s`;
});

// Add stagger animation to timeline items
document.querySelectorAll(".timeline-item").forEach((item, index) => {
  item.style.transitionDelay = `${index * 0.2}s`;
});

// Animación de typing effect en el hero
const heroText = document.querySelector(".hero h1");
if (heroText) {
  const text = heroText.textContent;
  heroText.textContent = "";
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      heroText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }

  setTimeout(typeWriter, 500);
}
