window.addEventListener("load", function () {
  var preloader = document.getElementById("preloader");
  preloader.classList.add("hide-preloader");
  setTimeout(() => {
    preloader.style.display = "none";
  }, 600);
});
const blobs = document.querySelectorAll('.blur-blob');
    function random(min, max) {
        return Math.random() * (max - min) + min;
    }
    blobs.forEach(blob => {
        blob.style.top = `${random(0, window.innerHeight)}px`;
        blob.style.left = `${random(0, window.innerWidth)}px`;
        blob.vx = random(-1, 2);
        blob.vy = random(-1, 2);
    });
    function moveBlobs() {
        blobs.forEach(blob => {
            let x = parseFloat(blob.style.left);
            let y = parseFloat(blob.style.top);
            x += blob.vx;
            y += blob.vy;

            if (x <= 0 || x >= window.innerWidth - 100) blob.vx *= -1;
            if (y <= 0 || y >= window.innerHeight - 100) blob.vy *= -1;

            blob.style.left = `${x}px`;
            blob.style.top = `${y}px`;
        });
        requestAnimationFrame(moveBlobs);
    }
    moveBlobs();
document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("cookieConsent")) {
    document.getElementById("cookieConsent").style.display = "none";
  } else {
    document.getElementById("cookieConsent").style.display = "block";
  }
  document
    .getElementById("acceptCookie")
    .addEventListener("click", function () {
      localStorage.setItem("cookieConsent", "true");
      document.getElementById("cookieConsent").style.display = "none";
    });
});
const mobileBtn = document.querySelector('.menu-icon');
const mobileMenu = document.querySelector('.mobile-menu__links');
mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileBtn.classList.toggle('menu-icon-active');
});
const links = document.querySelectorAll('.mobile-menu__links a');
links.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileBtn.classList.remove('menu-icon-active');
    });
});
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileBtn.contains(e.target) && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        mobileBtn.classList.remove('menu-icon-active');
    }
});
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        let targetId = this.getAttribute('href');
        let targetElement = document.querySelector(targetId);

        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});
const cometBtn = document.getElementById('up-btn');
window.onscroll = function() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    cometBtn.classList.remove('up-hidden');
    cometBtn.classList.add('up-visible');
  } else {
    cometBtn.classList.remove('up-visible');
    cometBtn.classList.add('up-hidden');
  }
};
cometBtn.addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
document.querySelectorAll(".accordion-button").forEach((button) => {
  button.addEventListener("click", function () {
    const accordionContent = this.nextElementSibling;
    let isExpanded = this.classList.contains("active");
    document
      .querySelectorAll(".accordion-item .accordion-content")
      .forEach((content) => {
        content.style.maxHeight = null;
      });
    document.querySelectorAll(".accordion-button").forEach((btn) => {
      btn.classList.remove("active");
      btn.querySelector(".arrow").classList.remove("up");
    });
    if (!isExpanded) {
      this.classList.add("active");
      accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
      this.querySelector(".arrow").classList.add("up");
      setTimeout(() => {
        this.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  var phoneInput = document.getElementById("phone");
  function applyMask(event) {
    var value = phoneInput.value.replace(/\D/g, "");
    var newValue = "";

    if (value.length > 1) {
      newValue += "+" + value.charAt(0);
      if (value.length < 4) {
        newValue += " (" + value.substring(1);
      } else {
        newValue += " (" + value.substring(1, 4);
      }
      if (value.length >= 4) {
        newValue += ") " + value.substring(4, 7);
      }
      if (value.length >= 7) {
        newValue += "-" + value.substring(7, 11);
      }
    } else {
      newValue = value;
    }
    phoneInput.value = newValue;
  }
  phoneInput.addEventListener("input", applyMask);
});
gsap.registerPlugin(ScrollTrigger);
function animateFrom(elem, direction = 1) {
  const y = direction * 100;
  gsap.from(elem, {
    scrollTrigger: {
      trigger: elem,
      start: "top 80%", 
      end: "bottom 20%",
      toggleActions: "restart none none none", 
    },
    y: y,
    opacity: 0,
    duration: 1.5,
    ease: "power1.out"
  });
}

[".about", ".skills"].forEach(className => {
  animateFrom(document.querySelector(className));
});
document.querySelectorAll(".my-project__card").forEach(card => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top bottom",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 100,
    duration: 1,
    ease: "power1.out"
  });
});
function animateSkillBar(change) {
  change.forEach(entry => {
    if (entry.isIntersecting) {
      gsap.fromTo(
        entry.target,
        { width: "0%" },
        { duration: 2, width: entry.target.dataset.width, ease: "power1.out" }
      );
      observer.unobserve(entry.target);
    }
  });
}
const observer = new IntersectionObserver(animateSkillBar, {
  threshold: 0.5
});
document.querySelectorAll(".skill-level").forEach(bar => {
  observer.observe(bar);
}); 
window.addEventListener('load', function() {
  gsap.from("h1", {
    duration: 1.5,
    opacity: 0,
    x: -100, 
    ease: "power2.out"
  });
  gsap.from(".header-button__portfolio, .header-button__contacts", { 
    duration: 5, 
    opacity: 0, 
    rotationX: 360, 
    color: "#FFFFFF", 
    backgroundColor: "#0000FF", 
    stagger: 0.2, 
    delay: 0.3,
    ease: "elastic.out(1, 0.75)", 
});
  gsap.from(".header-image img", {
    duration: 1.5,
    opacity: 0,
    scale: 0.5,
    delay: 1.2,
    ease: "power2.out"
  });
});

