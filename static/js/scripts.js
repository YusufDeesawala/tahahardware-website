function throttle(func, wait) {
  let timeout;
  return (...args) => {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func(...args);
      }, wait);
    }
  };
}

function toggleTheme() {
  console.log('Toggling theme');
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  document.body.style.transition = 'none';
  document.body.offsetHeight;
  document.body.style.transition = 'background 0.3s ease, color 0.3s ease';
}

function setupMobileMenu() {
  console.log('Setting up mobile menu');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });
    mobileMenuBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
      }
    });
  }
}

function setupSmoothScrolling() {
  console.log('Setting up smooth scrolling');
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function setupScrollAnimations() {
  console.log('Setting up scroll animations');
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

const handleNavbarScroll = throttle(() => {
  console.log('Handling navbar scroll');
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, 16);

function setupDynamicGradient() {
  console.log('Setting up dynamic gradient');
  const hero = document.querySelector('.hero');
  const heroGradient = document.getElementById('heroGradient');
  if (hero && heroGradient) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      heroGradient.style.background = `radial-gradient(circle 300px at ${x}% ${y}%, rgba(37, 99, 235, 0.2), transparent)`;
    });
    hero.addEventListener('mouseleave', () => {
      heroGradient.style.background = `radial-gradient(circle 300px at 50% 50%, rgba(37, 99, 235, 0.2), transparent)`;
    });
  }
}

function setupProductCardEffects() {
  console.log('Setting up product card effects');
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
    });
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
    });
  });
}

function setupButtonEffects() {
  console.log('Setting up button effects');
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const ripple = document.createElement('span');
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.classList.add('ripple');
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

function setupFloatingShapes() {
  console.log('Setting up floating shapes');
  const floatingShapes = document.querySelectorAll('.floating-shape');
  floatingShapes.forEach((shape, index) => {
    const duration = 6 + Math.random() * 4;
    const delay = Math.random() * 2;
    shape.style.animationDuration = `${duration}s`;
    shape.style.animationDelay = `${delay}s`;
    setInterval(() => {
      const randomX = Math.random() * 20 - 10;
      shape.style.transform = `translateX(${randomX}px)`;
    }, 3000 + Math.random() * 2000);
  });
}

function setupKeyboardNavigation() {
  console.log('Setting up keyboard navigation');
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      denyUserData();
      const navLinks = document.querySelector('.nav-links');
      const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
      if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      }
    }
  });
}

function setupPageLoadAnimation() {
  console.log('Setting up page load animation');
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease-in-out';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
}

function setActiveTab(tab) {
  console.log('Active tab set to:', tab);
}

function getCookie(name) {
  console.log('Checking cookie:', name);
  let cookieArr = document.cookie.split(';');
  for (let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].trim();
    if (cookiePair.startsWith(name + '=')) {
      console.log('Found cookie:', cookiePair);
      return cookiePair.substring(name.length + 1);
    }
  }
  console.log('No cookie found:', name);
  return null;
}

function setCookie(name, value, days) {
  console.log('Setting cookie:', name, value);
  let expires = '';
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + value + expires + '; path=/';
}

function setCookie(name, value, days) {
  console.log('Setting cookie:', name, value);
  let expires = '';
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + value + expires + '; path=/';
}

function submitUserData(event) {
  event.preventDefault();
  console.log('Submitting user data');
  const name = document.getElementById('name')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const location = document.getElementById('location')?.value.trim();

  if (!name || !email || !location) {
    console.log('Validation failed: Missing fields');
    alert('Please fill in all fields.');
    return;
  }
  if (!email.includes('@')) {
    console.log('Validation failed: Invalid email');
    alert('Please provide a valid email address.');
    return;
  }

  const payload = { name, email_address: email, location };
  console.log('Sending payload:', payload);

  fetch('/store-user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(response => {
      console.log('Fetch response:', response.status, response.statusText);
      if (!response.ok) {
        return response.json().then(err => {
          throw new Error(`HTTP ${response.status}: ${err.error || response.statusText}`);
        });
      }
      return response.json();
    })
    .then(data => {
      console.log('User stored:', data);
      setCookie('userDataConsent', 'accepted', 30);
      const modal = document.getElementById('userDataModal');
      if (modal) modal.style.display = 'none';
    })
    .catch(error => {
      console.error('Error storing user:', error.message);
      alert(`Failed to save data: ${error.message}`);
    });
}

function denyUserData() {
  console.log('User denied data sharing');
  setCookie('userDataConsent', 'declined', 30);
  const modal = document.getElementById('userDataModal');
  if (modal) modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded');
  try {
    document.documentElement.setAttribute('data-theme', 'light');
    setupMobileMenu();
    setupSmoothScrolling();
    setupScrollAnimations();
    setupDynamicGradient();
    setupProductCardEffects();
    setupButtonEffects();
    setupFloatingShapes();
    setupKeyboardNavigation();
    setupPageLoadAnimation();
    window.addEventListener('scroll', handleNavbarScroll);

    console.log('Checking user data modal');
    const modal = document.getElementById('userDataModal');
    if (!modal) {
      console.error('Modal element not found');
      return;
    }
    const consent = getCookie('userDataConsent');
    console.log('Consent cookie:', consent);
    if (!consent) {
      console.log('No consent cookie, showing modal');
      setTimeout(() => {
        modal.style.display = 'flex';
        console.log('Modal displayed');
      }, 500);
    } else {
      console.log('Consent cookie exists:', consent);
    }
    const form = document.getElementById('userDataForm');
    if (form) {
      form.addEventListener('submit', submitUserData);
      console.log('Form event listener added');
    } else {
      console.error('Form element not found');
    }
    console.log('Taha Hardware scripts loaded successfully!');
  } catch (error) {
    console.error('Error in DOMContentLoaded:', error);
  }
});