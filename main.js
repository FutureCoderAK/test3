// Start animation header

window.addEventListener("scroll", function () {
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
})

// End animation header


//   Start Dropdown

// لعمل ال dropdown
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

//   End Dropdown


// Start COntent Menu

document.addEventListener('DOMContentLoaded', () => { 
    const menuButton = document.getElementById('menuButton'); 
    const menuContent = document.getElementById('menuContent'); 
    const closeIcon = document.querySelector('.close-icon'); 
    const spans = menuButton.querySelectorAll('span'); 

    menuButton.addEventListener('click', () => { 
        menuContent.classList.toggle('active'); // تفعيل/تعطيل القائمة  
        spans.forEach(span => span.classList.add('hidden')); // إخفاء جميع عناصر span عند فتح القائمة
        document.body.classList.add('no-scroll'); // منع التمرير عند فتح القائمة
    }); 

    // إغلاق القائمة عند الضغط على علامة الإغلاق
    closeIcon.addEventListener('click', closeMenu); 

    // لإغلاق القائمة عند الضغط خارجها  
    document.addEventListener('click', (event) => { 
        if (!menuContent.contains(event.target) && !menuButton.contains(event.target)) { 
            closeMenu(); 
        } 
    }); 

    // دالة لإغلاق القائمة  
    function closeMenu() { 
        menuContent.classList.remove('active'); // إخفاء القائمة  
        spans.forEach(span => span.classList.remove('hidden')); // إظهار جميع عناصر span
        document.body.classList.remove('no-scroll'); // إعادة التمرير
    } 

    // تمكين التمرير عند الضغط على الروابط
    const menuLinks = document.querySelectorAll('.choice-in-menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            closeMenu(); // إغلاق القائمة عند الضغط على أي رابط
            document.body.classList.remove('no-scroll'); // التأكد من إعادة التمرير
        });
    });
});

// End Content Menu


// Start Button Scroll Up

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
// End Button Scroll Up


// Start Section Text Head

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

// End Section Text Head


//   Start counter-wrapper

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

// End counter-wrapper


//  Start  benifit

// دا الانيميشن بتاع فقرات فوائد العضوية
const benefits = document.querySelectorAll('.benefit');
let delay = 1500; // التأخير بين كل فقرة (1.5 ثانية)

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            benefits.forEach((benefit, index) => {
                setTimeout(() => {
                    benefit.classList.add('visible');
                }, delay * index);
            });
            observer.disconnect(); // إيقاف المراقبة بعد التفعيل
        }
    });
});

observer.observe(document.getElementById('benefits'));

//  End  benifit
