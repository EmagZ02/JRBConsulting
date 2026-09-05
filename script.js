const petalsContainer = document.getElementById("petals");
const leavesContainer = document.getElementById("leaves");

/* =========================
   REALISTIC SAKURA PETALS
========================= */
function createPetals(count = 105) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
        const petal = document.createElement("span");
        petal.className = "petal";

        const size = 6 + Math.random() * 9;
        const duration = 11 + Math.random() * 14;
        const delay = -(Math.random() * duration);
        const startX = Math.random() * 100;
        const drift = -120 + Math.random() * 260;
        const rotation = 260 + Math.random() * 600;
        const sway = 25 + Math.random() * 70;
        const scale = .65 + Math.random() * .8;

        petal.style.width = `${size}px`;
        petal.style.height = `${size * (.65 + Math.random() * .35)}px`;
        petal.style.left = `${startX}vw`;
        petal.style.opacity = `${.35 + Math.random() * .55}`;
        petal.style.filter = `blur(${Math.random() < .18 ? 1.5 : Math.random() * .6}px)`;
        petal.style.animation = `sakura-${i} ${duration}s linear ${delay}s infinite`;

        const style = document.createElement("style");
        style.textContent = `
        @keyframes sakura-${i}{
            0%{
                transform:translate3d(0,-80px,0) rotate(0deg) scale(${scale});
            }
            18%{
                transform:translate3d(${sway}px,20vh,0) rotate(${rotation*.18}deg) scale(${scale*1.08});
            }
            38%{
                transform:translate3d(${-sway*.7}px,42vh,0) rotate(${rotation*.4}deg) scale(${scale});
            }
            58%{
                transform:translate3d(${sway*.8}px,64vh,0) rotate(${rotation*.62}deg) scale(${scale*.92});
            }
            78%{
                transform:translate3d(${-sway}px,86vh,0) rotate(${rotation*.82}deg) scale(${scale});
            }
            100%{
                transform:translate3d(${drift}px,115vh,0) rotate(${rotation}deg) scale(${scale*.8});
            }
        }`;
        document.head.appendChild(style);
        fragment.appendChild(petal);
    }
    petalsContainer.appendChild(fragment);
}
createPetals();

/* =========================
   NATURAL FALLING LEAVES
========================= */
function createLeaves(count = 28) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
        const leaf = document.createElement("span");
        leaf.className = "leaf";

        const size = 9 + Math.random() * 12;
        const duration = 15 + Math.random() * 15;
        const delay = -(Math.random() * duration);
        const sway = -100 + Math.random() * 220;

        leaf.style.width = `${size * 1.35}px`;
        leaf.style.height = `${size * .72}px`;
        leaf.style.left = `${Math.random() * 100}vw`;
        leaf.style.opacity = `${.25 + Math.random() * .55}`;
        leaf.style.animation = `leaf-${i} ${duration}s linear ${delay}s infinite`;

        const style = document.createElement("style");
        style.textContent = `
        @keyframes leaf-${i}{
            0%{transform:translate3d(0,-80px,0) rotate(0deg)}
            30%{transform:translate3d(${sway*.35}px,30vh,0) rotate(150deg)}
            60%{transform:translate3d(${-sway*.55}px,65vh,0) rotate(340deg)}
            100%{transform:translate3d(${sway}px,115vh,0) rotate(650deg)}
        }`;
        document.head.appendChild(style);
        fragment.appendChild(leaf);
    }
    leavesContainer.appendChild(fragment);
}
createLeaves();

/* =========================
   NAVIGATION
========================= */
const navbar = document.querySelector(".navbar");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
}, { passive: true });

menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

/* =========================
   APPEAR-ON-SCROLL
========================= */
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("appear");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.14 });

    revealItems.forEach(item => revealObserver.observe(item));
} else {
    revealItems.forEach(item => item.classList.add("appear"));
}

/* =========================
   ANIMATED RESULTS COUNTERS
========================= */
const counters = document.querySelectorAll(".counter");

function animateCounter(counter) {
    const target = Number(counter.dataset.target);
    const suffix = counter.dataset.suffix || "";
    const duration = 1700;
    const start = performance.now();

    function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(target * eased);

        counter.textContent = value.toLocaleString() + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.55 });

    counters.forEach(counter => counterObserver.observe(counter));
} else {
    counters.forEach(counter => {
        counter.textContent = Number(counter.dataset.target).toLocaleString() + (counter.dataset.suffix || "");
    });
}

/* =========================
   CONSULTATION FORM
========================= */
const form = document.getElementById("consultationForm");

form.addEventListener("submit", event => {
    event.preventDefault();

    const button = form.querySelector("button");
    const original = button.innerHTML;

    button.innerHTML = "Thank you — we'll be in touch <span>✓</span>";
    button.disabled = true;

    setTimeout(() => {
        button.innerHTML = original;
        button.disabled = false;
        form.reset();
    }, 3000);
});

/* =========================
   VIDEO FALLBACK / MOBILE
========================= */
const bgVideo = document.getElementById("bgVideo");

bgVideo.addEventListener("error", () => {
    document.querySelector(".video-container").classList.add("video-unavailable");
});

/* Pause decorative animation when page is hidden */
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        bgVideo.pause();
    } else {
        bgVideo.play().catch(() => {});
    }
});
