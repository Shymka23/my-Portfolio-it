/*=============== SHOW MENU ===============*/

/*=============== SHOW/HIDE MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
// Перевіряємо, чи існує кнопка відкриття меню
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
// Перевіряємо, чи існує кнопка закриття меню
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLinks = document.querySelectorAll(".nav__link");

const closeMenu = () => {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
};
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // Запобігаємо стандартній поведінці посилань
    closeMenu();
  });
});

/*=============== ADD BLUR TO HEADER ===============*/
const blurHeader = () => {
  const header = document.getElementById("header");
  if (header) {
    window.scrollY >= 50
      ? header.classList.add("blur-header")
      : header.classList.remove("blur-header");
  }
};
window.addEventListener("scroll", blurHeader);

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById("contact-form");
const contactMessage = document.getElementById("contact-message");

const sendEmail = (e) => {
  e.preventDefault();

  emailjs
    .sendForm(
      "service_v64xa24",
      "template_6za1jaf",
      "#contact-form",
      "T-fZ9FCSQFulvDDRz"
    )
    .then(
      () => {
        contactMessage.textContent = "Message sent successfully ✅";

        // Очистити форму через 5 секунд
        setTimeout(() => {
          contactMessage.textContent = "";
          contactForm.reset();
        }, 5000);
      },
      (error) => {
        contactMessage.textContent = "Message not sent (service error) ❌";
        console.error("EmailJS Error:", error);
      }
    );
};

contactForm.addEventListener("submit", sendEmail);

/*=============== SHOW SCROLL UP ===============*/
const scrollUpButton = document.getElementById("scroll-up");

const handleScroll = () => {
  window.scrollY >= 350
    ? scrollUpButton.classList.add("show-scroll")
    : scrollUpButton.classList.remove("show-scroll");
};

window.addEventListener("scroll", handleScroll);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
// Додаємо плавну прокрутку при кліку
document.querySelectorAll(".nav__menu a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Ваш існуючий код для підсвітки активних посилань
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 58;
    const sectionId = current.getAttribute("id");
    const navLink = document.querySelector(
      `.nav__menu a[href="#${sectionId}"]`
    );

    if (navLink) {
      navLink.classList.toggle(
        "active-link",
        scrollY > sectionTop && scrollY <= sectionTop + sectionHeight
      );
    }
  });
};

window.addEventListener("scroll", scrollActive);
/*=============== SCROLL REVEAL ANIMATION ===============*/
// Ініціалізація ScrollReveal з базовими налаштуваннями
const sr = ScrollReveal({
  origin: `top`, // Напрямок, з якого з'являється елемент (за замовчуванням — зверху)
  distance: `60px`, // Відстань, на яку елемент рухається під час анімації
  duration: `2500`, // Тривалість анімації (у мілісекундах)
  delay: `400`, // Затримка перед початком анімації
  // reset: true      // Розкоментуйте, якщо потрібно, щоб анімація повторювалася при кожному прокручуванні
});

// Анімація для групи елементів (з'являються зверху)
sr.reveal(
  `.home__data, .home__social, .contact__container, .footer__container`
);

// Анімація для зображення в секції "home" (з'являється знизу)
sr.reveal(`.home__image`, { origin: `bottom` });

// Анімація для тексту в секціях "about" та "skills" (з'являється зліва)
sr.reveal(`.about__data, .skills__data`, { origin: `left` });

// Анімація для зображення в секції "about" та контенту в секції "skills" (з'являється справа)
sr.reveal(`.about__image, .skills__content`, { origin: `right` });

// Анімація для карток в секціях "services" та "projects" (з'являються справа)
sr.reveal(`.services__card, .projects__card`, { origin: `right` });
