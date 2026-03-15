/* ══════════════════════════════════════════════
   VEDANT PANDIT PORTFOLIO — script.js
══════════════════════════════════════════════ */

// ── 1. CUSTOM CURSOR ──
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mouseX = 0,
    mouseY = 0;
let ringX = 0,
    ringY = 0;

if (dot && ring) {
    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    // Smooth ring follow
    function animateRing() {
        ringX += (mouseX - ringX) * 0.14;
        ringY += (mouseY - ringY) * 0.14;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effect on interactive elements
    document.querySelectorAll('a, button, .skill-pill, .glass-card, .soft-card').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
    });
}

// ── 2. TYPING EFFECT ──
const phrases = [
    "BTech Student in Computer Science",
    "At Noida International University",
    "AI & ML Enthusiast",
    "Data Science Explorer",
    "Fun with Cybersecurity",
    "Problem Solver"
];
let i = 0,
    j = 0;
let currentPhrase = [];
let isDeleting = false;
let isEnd = false;

function loop() {
    isEnd = false;
    const el = document.getElementById('typewriter');
    if (!el) return;

    el.innerHTML = currentPhrase.join('');

    if (i < phrases.length) {
        if (!isDeleting && j <= phrases[i].length) {
            currentPhrase.push(phrases[i][j]);
            j++;
            el.innerHTML = currentPhrase.join('');
        }
        if (isDeleting && j <= phrases[i].length) {
            currentPhrase.pop();
            j--;
            el.innerHTML = currentPhrase.join('');
        }
        if (j === phrases[i].length) {
            isEnd = true;
            isDeleting = true;
        }
        if (isDeleting && j === 0) {
            currentPhrase = [];
            isDeleting = false;
            i++;
            if (i === phrases.length) i = 0;
        }
    }

    const speedUp = Math.random() * 30 + 40;
    const normalSpeed = Math.random() * 60 + 90;
    const time = isEnd ? 2000 : isDeleting ? speedUp : normalSpeed;
    setTimeout(loop, time);
}

// ── 3. SCROLL FADE-IN (Intersection Observer) ──
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
});

fadeEls.forEach(el => observer.observe(el));

// ── 4. NAVBAR SCROLL BEHAVIOUR ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ── 5. ACTIVE NAV LINK HIGHLIGHT ──
const sections = document.querySelectorAll('section[id], section.section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navAnchors.forEach(a => {
                a.style.color = '';
                if (a.getAttribute('href') === '#' + entry.target.id) {
                    a.style.color = 'var(--accent)';
                }
            });
        }
    });
}, {
    threshold: 0.45
});

sections.forEach(s => sectionObserver.observe(s));

// ── 6. MOBILE HAMBURGER ──
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(a => {
        a.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ── 7. SMOOTH SCROLL FOR ANCHOR LINKS ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ── 8. CONTACT FORM FEEDBACK ──
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', e => {
        const btn = contactForm.querySelector('button[type="submit"]');
        if (btn) {
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;
            // Re-enable after 5s as fallback
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                btn.style.background = '#4ade80';
            }, 3000);
        }
    });
}

// ── 9. TERMINAL TYPING ANIMATION ──
function typeTerminal() {
    const lines = document.querySelectorAll('.t-json p');
    lines.forEach((line, idx) => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-6px)';
        line.style.transition = 'opacity 0.3s, transform 0.3s';
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, 400 + idx * 150);
    });
}

// Trigger terminal animation when about section is visible
const aboutSection = document.getElementById('about');
if (aboutSection) {
    const terminalObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            typeTerminal();
            terminalObserver.disconnect();
        }
    }, {
        threshold: 0.3
    });
    terminalObserver.observe(aboutSection);
}

// ── 10. TILT EFFECT ON PROJECT CARDS ──
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-4px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(loop, 700);
});