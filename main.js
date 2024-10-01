// menu
function toggleMenu() {
  const menu = document.querySelector('.menu');
  menu.classList.toggle('active');
}

function toggleDropdown(event) {
  const dropdown = event.currentTarget;
  dropdown.classList.toggle('active');
}

window.addEventListener("scroll", function () {
  var header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
})

const navMenuItems = document.querySelectorAll('.nav-menu li');

navMenuItems.forEach(item => {
  item.addEventListener('click', () => {
    item.querySelector('ul').classList.toggle('show-submenu');
  });
});

// Start
// إظهار الزر عند النزول للأسفل
window.onscroll = function () {
  var scrollBtn = document.getElementById("scrollBtn");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
};

// وظيفة الانتقال إلى الأعلى
function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
// End

document.addEventListener("scroll", function () {
  const paragraphs = document.querySelectorAll('.txt-head p');
  const windowHeight = window.innerHeight;

  paragraphs.forEach((p) => {
    const elementTop = p.getBoundingClientRect().top;

    // تحقق إذا كانت الفقرة في نطاق العرض
    if (elementTop < windowHeight && elementTop > 0) {
      p.style.opacity = 1; // جعل النص مرئي
      p.style.transform = 'translateY(0)'; // إعادة موضع النص
    }
  });
});
const counters = document.querySelectorAll('.counter');

const animationDuration = 2000; // desired animation duration in milliseconds
const incrementAmount = 100; // increment amount for values 200 and above

counters.forEach((counter) => {
  const target = counter.querySelector('[data-target]').dataset.target;
  const countElement = counter.querySelector('.count');
  let currentCount = 0;
  let startTime;
  let animationStarted = false;

  function incrementCount() {
    const currentTime = performance.now();
    const elapsed = currentTime - startTime;
    const progress = elapsed / animationDuration;
    currentCount = Math.min(target, progress * target);

    if (currentCount < 200) {
      currentCount = Math.round(progress * target); // increment slowly for values less than 200
    } else {
      currentCount = Math.round(progress * target / incrementAmount) * incrementAmount; // increment by 100 for values 200 and above
    }

    countElement.textContent = currentCount + '+';

    if (elapsed < animationDuration) {
      requestAnimationFrame(incrementCount);
    } else {
      countElement.textContent = target + '+';
    }
  }

  function checkIfInView() {
    const rect = counter.getBoundingClientRect();
    const viewHeight = window.innerHeight;
    const offset = 100;

    if (rect.top <= viewHeight + offset && !animationStarted) {
      animationStarted = true;
      startTime = performance.now();
      incrementCount();
    }
  }
  // لعمل ال dropdown
  window.addEventListener('scroll', checkIfInView);
  checkIfInView(); // initial check
});
document.addEventListener('DOMContentLoaded', function () {
  const dropdownBtn = document.querySelector('.dropbtn');
  const dropdownContent = document.querySelector('.dropdown-content');

  dropdownBtn.addEventListener('click', function (event) {
    event.preventDefault(); // لمنع الانتقال إلى الرابط
    dropdownContent.classList.toggle('show'); // إضافة أو إزالة الكلاس "show"
  });

  // إغلاق القائمة المنسدلة عند النقر في أي مكان آخر في الصفحة
  window.addEventListener('click', function (event) {
    if (!event.target.matches('.dropbtn')) {
      if (dropdownContent.classList.contains('show')) {
        dropdownContent.classList.remove('show');
      }
    }
  });
});

// scroll
document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('.article-txt, .cards2, .counter-wrapper, .section-1, form');

  function checkVisibility() {
    const windowHeight = window.innerHeight;

    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop < windowHeight - 50) { // 50px من الأسفل
        section.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkVisibility);
  checkVisibility(); // تأكد من تشغيله عند التحميل
});

let navVisible = false;

document.querySelector('.row').addEventListener('click', function() {
  if (!navVisible) {
    document.querySelector('.screen-small').classList.add('animate');
    navVisible = true;
  } else {
    document.querySelector('.screen-small').classList.add('animate-hide');
    setTimeout(function() {
      document.querySelector('.screen-small').classList.remove('animate', 'animate-hide');
      navVisible = false;
    },1000);
  }
});
