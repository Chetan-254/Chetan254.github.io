/* ===== Mobile Navigation ===== */
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ===== Stats Count-Up Animation ===== */
const statNums = document.querySelectorAll('.stat-num');

function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 900;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target;
    }
  }
  requestAnimationFrame(step);
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => observer.observe(el));
} else {
  statNums.forEach(el => { el.textContent = el.dataset.count; });
}

/* ===== BMI & Calorie Calculator ===== */
const calcForm = document.getElementById('calcForm');
const calcResult = document.getElementById('calcResult');

calcForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const age = parseFloat(document.getElementById('age').value);
  const gender = document.getElementById('gender').value;
  const heightCm = parseFloat(document.getElementById('height').value);
  const weightKg = parseFloat(document.getElementById('weight').value);
  const activity = parseFloat(document.getElementById('activity').value);

  if (!age || !heightCm || !weightKg) return;

  // BMI = weight (kg) / height (m)^2
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  let category;
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 25) category = 'Healthy range';
  else if (bmi < 30) category = 'Overweight';
  else category = 'Obesity range';

  // BMR via Mifflin-St Jeor equation
  let bmr;
  if (gender === 'male') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }

  const calories = Math.round(bmr * activity);

  document.getElementById('bmiValue').textContent = bmi.toFixed(1);
  document.getElementById('bmiCategory').textContent = category;
  document.getElementById('calorieValue').textContent = `${calories.toLocaleString()} kcal/day`;

  calcResult.hidden = false;
  calcResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

/* ===== Contact Form (front-end only placeholder) ===== */
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const button = contactForm.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Message logged';
    contactForm.reset();
    setTimeout(() => { button.textContent = originalText; }, 2500);
  });
}
