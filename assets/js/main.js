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
/* const contactForm = document.getElementById("contact-form");
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
 */
/*   // Очистити форму через 5 секунд
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

contactForm.addEventListener("submit", sendEmail); */
const contactForm = document.getElementById("contact-form");
const contactMessage = document.getElementById("contact-message");

// Modern validation with real-time feedback
const validateInput = (input) => {
  const inputGroup = input.closest(".input-group");
  const errorElement = inputGroup.querySelector(".input-error");

  if (input.validity.valid) {
    input.classList.remove("invalid");
    input.classList.add("valid");
    errorElement.style.display = "none";
    return true;
  }

  input.classList.remove("valid");
  input.classList.add("invalid");
  errorElement.style.display = "block";

  if (input.validity.valueMissing) {
    errorElement.textContent = "This field is required";
  } else if (input.validity.typeMismatch) {
    errorElement.textContent = "Please enter a valid email address";
  } else if (input.validity.patternMismatch) {
    if (input.type === "text") {
      errorElement.textContent = "Name should only contain letters";
    } else if (input.type === "email") {
      errorElement.textContent = "Please enter a valid email address";
    }
  } else if (input.validity.tooShort) {
    errorElement.textContent = `Minimum length is ${input.minLength} characters`;
  } else if (input.validity.tooLong) {
    errorElement.textContent = `Maximum length is ${input.maxLength} characters`;
  }

  return false;
};

// Add real-time validation on blur
document.querySelectorAll(".contact__input").forEach((input) => {
  input.addEventListener("blur", () => validateInput(input));
  input.addEventListener("input", () => {
    if (input.classList.contains("invalid")) {
      validateInput(input);
    }
  });
});

const sendEmail = async (e) => {
  e.preventDefault();

  // Validate all fields before submission
  let isValid = true;
  document.querySelectorAll(".contact__input").forEach((input) => {
    if (!validateInput(input)) {
      isValid = false;
    }
  });

  if (!isValid) {
    contactMessage.textContent = "Please fix the errors before submitting";
    contactMessage.style.color = "#ff3860";
    setTimeout(() => {
      contactMessage.textContent = "";
    }, 5000);
    return;
  }

  try {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="loader"></span> Sending...';

    const response = await emailjs.sendForm(
      "service_v64xa24",
      "template_6za1jaf",
      "#contact-form",
      "T-fZ9FCSQFulvDDRz"
    );

    contactMessage.textContent = "Message sent successfully ✅";
    contactMessage.style.color = "#09c372";

    // Reset form after success
    setTimeout(() => {
      contactMessage.textContent = "";
      contactForm.reset();
      document.querySelectorAll(".contact__input").forEach((input) => {
        input.classList.remove("valid", "invalid");
        input
          .closest(".input-group")
          .querySelector(".input-error").style.display = "none";
      });
    }, 5000);
  } catch (error) {
    contactMessage.textContent = "Message not sent (service error) ❌";
    contactMessage.style.color = "#ff3860";
    console.error("EmailJS Error:", error);
  } finally {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = false;
    submitButton.textContent = "Send Message";
  }
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

document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".cursor");
  const follower = document.querySelector(".cursor-follower");

  // Position cursor
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    follower.style.left = `${e.clientX}px`;
    follower.style.top = `${e.clientY}px`;
  });

  // Click effects
  document.addEventListener("mousedown", () => {
    cursor.classList.add("active");
    follower.classList.add("active");
  });

  document.addEventListener("mouseup", () => {
    cursor.classList.remove("active");
    follower.classList.remove("active");
  });

  // Hover effects for all links and buttons
  const hoverTargets = document.querySelectorAll(
    "a, button, [data-cursor-hover]"
  );
  hoverTargets.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
      follower.classList.add("hover");
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
      follower.classList.remove("hover");
    });
  });

  // Hide cursor when not needed
  document.addEventListener("mouseout", (e) => {
    if (!e.relatedTarget) {
      cursor.classList.add("hidden");
      follower.classList.add("hidden");
    }
  });

  document.addEventListener("mouseover", () => {
    cursor.classList.remove("hidden");
    follower.classList.remove("hidden");
  });
});
