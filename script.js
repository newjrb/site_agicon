// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
  });
});

// Scroll reveal animation
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) el.classList.add('active');
  });
};
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Counter animation
const counters = document.querySelectorAll('.stat-number[data-target]');
let countersStarted = false;
const startCounters = () => {
  if (countersStarted) return;
  const statsSection = document.querySelector('.about-stats');
  if (!statsSection) return;
  const top = statsSection.getBoundingClientRect().top;
  if (top < window.innerHeight - 100) {
    countersStarted = true;
    counters.forEach(counter => {
      const target = +counter.dataset.target;
      const prefix = target >= 100 && counter.closest('.stat-item').querySelector('.stat-label').textContent.includes('%') ? '' : '+';
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      const update = () => {
        current += step;
        if (current < target) {
          counter.textContent = prefix + Math.floor(current);
          requestAnimationFrame(update);
        } else {
          counter.textContent = prefix + target;
        }
      };
      update();
    });
  }
};
window.addEventListener('scroll', startCounters);

// Phone mask
const phoneInput = document.getElementById('telefone');
if (phoneInput) {
  phoneInput.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length > 6) v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
    else if (v.length > 2) v = `(${v.slice(0,2)}) ${v.slice(2)}`;
    else if (v.length > 0) v = `(${v}`;
    e.target.value = v;
  });
}

// Form submit → WhatsApp
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const nome = form.nome.value;
  const telefone = form.telefone.value;
  const email = form.email.value;
  const assunto = form.assunto.value;
  const mensagem = form.mensagem.value;
  let text = `*Nova mensagem do site*\n\n`;
  text += `*Nome:* ${nome}\n`;
  text += `*Telefone:* ${telefone}\n`;
  if (email) text += `*E-mail:* ${email}\n`;
  if (assunto) text += `*Assunto:* ${assunto}\n`;
  text += `*Mensagem:* ${mensagem}`;
  const url = `https://wa.me/5543996160143?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
