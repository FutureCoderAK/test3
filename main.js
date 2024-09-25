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

document.addEventListener("scroll", function() {
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

  window.addEventListener('scroll', checkIfInView);
  checkIfInView(); // initial check
});