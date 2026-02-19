// =====================
// MATRIX RAIN EFFECT
// =====================
const canvas = document.getElementById("matrix-rain");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const chars =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]<>/\\|+=*&^%$#@!";
const charArray = chars.split("");
const fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(10, 10, 10, 0.06)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff41";
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = charArray[Math.floor(Math.random() * charArray.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrix, 50);

window.addEventListener("resize", () => {
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
});

// =====================
// NAVBAR SCROLL
// =====================
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 80) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// =====================
// MOBILE MENU
// =====================
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// =====================
// SMOOTH SCROLL
// =====================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// =====================
// INTERSECTION OBSERVER
// =====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -80px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Skills section became visible
    }
  });
}, observerOptions);

const animatedElements = document.querySelectorAll(
  ".section-title, .about-content, .project-card, .timeline-item, .contact-container, .education-grid, .skills-terminal",
);
animatedElements.forEach((el) => observer.observe(el));

// =====================
// STAGGER ANIMATIONS
// =====================
document.querySelectorAll(".project-card").forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll(".timeline-item").forEach((item, index) => {
  item.style.transitionDelay = `${index * 0.15}s`;
});

// =====================
// EMAILJS CONFIG
// =====================
const EMAILJS_CONFIG = {
  publicKey: "mAORb-ruiap4k_ZD6",
  serviceID: "service_8cln4ft",
  templateID: "template_9kykgzh",
};

emailjs.init(EMAILJS_CONFIG.publicKey);

const contactForm = document.querySelector(".contact-form");
const submitBtn = document.querySelector(".submit-btn");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (!name || !email || !message) {
    alert("Por favor completá todos los campos");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Por favor ingresá un email válido");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ejecutando...';

  emailjs
    .send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, {
      name,
      email,
      message,
    })
    .then(
      () => {
        alert("¡Mensaje enviado exitosamente! Te contactaré pronto.");
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML =
          '<i class="fas fa-terminal"></i> ejecutar enviar_mensaje()';
      },
      (error) => {
        console.error("Error:", error);
        alert("Error al enviar el mensaje. Intentá nuevamente.");
        submitBtn.disabled = false;
        submitBtn.innerHTML =
          '<i class="fas fa-terminal"></i> ejecutar enviar_mensaje()';
      },
    );
});
