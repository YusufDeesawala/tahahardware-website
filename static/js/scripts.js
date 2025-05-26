// Utility Functions
const throttle = (func, wait) => {
    let timeout;
    return (...args) => {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          func(...args);
        }, wait);
      }
    };
  };

  // Theme Toggle
  const toggleTheme = () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    // Force style recalculation
    document.body.style.transition = 'none';
    document.body.offsetHeight; // Trigger reflow
    document.body.style.transition = 'background 0.3s ease, color 0.3s ease';
  };

  // Mobile Menu
  const setupMobileMenu = () => {
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
  };

  // Smooth Scrolling
  const setupSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  };

  // Scroll Animations
  const setupScrollAnimations = () => {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  };

  // Cookie Consent
  const handleCookies = () => {
    const modal = document.getElementById('cookieModal');
    setTimeout(() => {
      if (modal) modal.style.display = 'flex';
    }, 2000);
  };

  const acceptCookies = () => {
    const modal = document.getElementById('cookieModal');
    if (modal) modal.style.display = 'none';
  };

  const rejectCookies = () => {
    const modal = document.getElementById('cookieModal');
    if (modal) modal.style.display = 'none';
  };

  // Navbar Scroll Effect
  const handleNavbarScroll = throttle(() => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, 16);

  // Dynamic Gradient
  const setupDynamicGradient = () => {
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
  };

  // Product Card 3D Effect
  const setupProductCardEffects = () => {
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
  };

  // Button Ripple Effect
  const setupButtonEffects = () => {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  };

  // Floating Shapes Animation
  const setupFloatingShapes = () => {
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
  };

  // Keyboard Navigation
  const setupKeyboardNavigation = () => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        rejectCookies();
        const navLinks = document.querySelector('.nav-links');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          mobileMenuBtn.classList.remove('active');
        }
      }
    });
  };

  // Page Load Animation
  const setupPageLoadAnimation = () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);
  };

  // Set Active Tab
  const setActiveTab = (tab) => {
    console.log('Active tab set to:', tab);
  };

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.setAttribute('data-theme', 'light');
    setupMobileMenu();
    setupSmoothScrolling();
    setupScrollAnimations();
    handleCookies();
    setupDynamicGradient();
    setupProductCardEffects();
    setupButtonEffects();
    setupFloatingShapes();
    setupKeyboardNavigation();
    setupPageLoadAnimation();
    window.addEventListener('scroll', handleNavbarScroll);
    console.log('Taha Hardware homepage scripts loaded successfully!');
  });