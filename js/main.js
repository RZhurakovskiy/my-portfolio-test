window.addEventListener("load", function () {
  var preloader = document.getElementById("preloader");
  preloader.classList.add("hide-preloader");
  setTimeout(() => {
    preloader.style.display = "none";
  }, 600);
});

document.addEventListener("DOMContentLoaded", function () {
  // Проверяем, есть ли разрешение в localStorage
  if (localStorage.getItem("cookieConsent")) {
    // Если разрешение уже дано, скрываем сообщение
    document.getElementById("cookieConsent").style.display = "none";
  } else {
    document.getElementById("cookieConsent").style.display = "block";
  }

  // При клике на кнопку "Принять"
  document
    .getElementById("acceptCookie")
    .addEventListener("click", function () {
      // Сохраняем разрешение в localStorage
      localStorage.setItem("cookieConsent", "true");
      // Скрываем сообщение
      document.getElementById("cookieConsent").style.display = "none";
    });
});

const mobileBtn = document.querySelector(".mobile-btn");
const mobileMenu = document.querySelector(".mobile-menu__links");

mobileBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
});

const links = document.querySelectorAll(".mobile-menu__links a");

links.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });
});

document.addEventListener("click", (e) => {
  if (
    !mobileMenu.contains(e.target) &&
    !mobileBtn.contains(e.target) &&
    mobileMenu.classList.contains("active")
  ) {
    mobileMenu.classList.remove("active");
  }
});
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault(); // Предотвращаем стандартное поведение перехода по ссылке
    let targetId = this.getAttribute("href"); // Получаем ID целевого элемента
    let targetElement = document.querySelector(targetId); // Находим элемент

    // Проверяем, существует ли целевой элемент
    if (targetElement) {
      // Плавно прокручиваем к элементу
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  });
});
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  // Получаем кнопку
  let mybutton = document.querySelector(".scrollTop");

  // Когда пользователь прокручивает страницу более чем на 20px вниз, показываем кнопку
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// При клике на кнопку, прокручиваем страницу наверх
document.getElementById("scrollTop").addEventListener("click", function() {
  window.scrollTo({
      top: 0,
      behavior: "smooth"
  });
});

// Optional: Hide button when user is at the top of the page
window.onscroll = function() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("scrollTop").style.display = "block";
  } else {
      document.getElementById("scrollTop").style.display = "none";
  }
};



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

// Функция и обсервер для анимирования полосы навыков
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
  // Анимация для заголовка h1
  gsap.from("h1", {
    duration: 1.5,
    opacity: 0,
    x: -100, 
    ease: "power2.out"
  });

  // Анимация для кнопок
  gsap.from(".header-button__portfolio, .header-button__contacts", { 
    duration: 5,  // продолжительность анимации
    opacity: 0,  // начальная прозрачность
    rotationX: 360,  // вращение по оси X для эффекта переворота
    color: "#FFFFFF",  // начальный цвет текста
    backgroundColor: "#0000FF",  // начальный цвет фона
    stagger: 0.2,  // интервал между анимациями разных кнопок
    delay: 0.3,  // задержка перед началом анимации
    ease: "elastic.out(1, 0.75)",  // эластичный easing для добавления "резинового" эффекта
   
});
  // Анимация для изображения
  gsap.from(".header-image img", {
    duration: 1.5,
    opacity: 0,
    scale: 0.5,
    delay: 1.2,
    ease: "power2.out"
  });
});

// document.addEventListener("DOMContentLoaded", function() {
//   gsap.registerPlugin(ScrollTrigger);

//   document.querySelectorAll('.skill').forEach(skill => {
//       const border = document.createElement('div');
//       border.classList.add('border-animate');
//       skill.appendChild(border);

//       gsap.fromTo(border, {
//               clipPath: 'inset(0 100% 0 0)' // Полностью закрыт справа налево.
//           }, {
//               clipPath: 'inset(0 0% 0 0)', // Полностью открыт.
//               duration: 2, // Продолжительность анимации увеличена для более медленного эффекта.
//               ease: "power4.out", // Применение эффекта плавности на конце анимации.
//               scrollTrigger: {
//                   trigger: skill,
//                   start: "top bottom",  // Начинается, когда верх .skill встречает нижнюю часть вьюпорта.
//                   toggleActions: 'play none none none',
//               }
             
//           });
     


//   });
// });
