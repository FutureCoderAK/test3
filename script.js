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


// Start Slider

const slides = document.querySelector(".slider").children;
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const indicator = document.querySelector(".indicator");
let index = 0;

prev.addEventListener("click", function () {
    prevSlide();
    updateCircleIndicator();
    resetTimer();
})

next.addEventListener("click", function () {
    nextSlide();
    updateCircleIndicator();
    resetTimer();
})

// create circle indicators
function circleIndicator() {
    for (let i = 0; i < slides.length; i++) {
        const article = document.createElement("article");
        article.innerHTML = i + 1;
        article.setAttribute("onclick", "indicateSlide(this)")
        article.id = i;
        if (i == 0) {
            article.className = "active";
        }
        indicator.appendChild(article);
    }
}
circleIndicator();

function indicateSlide(element) {
    index = element.id;
    changeSlide();
    updateCircleIndicator();
    resetTimer();
}

function updateCircleIndicator() {
    for (let i = 0; i < indicator.children.length; i++) {
        indicator.children[i].classList.remove("active");
    }
    indicator.children[index].classList.add("active");
}

function prevSlide() {
    if (index == 0) {
        index = slides.length - 1;
    }
    else {
        index--;
    }
    changeSlide();
}

function nextSlide() {
    if (index == slides.length - 1) {
        index = 0;
    }
    else {
        index++;
    }
    changeSlide();
}

function changeSlide() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }

    slides[index].classList.add("active");
}

function resetTimer() {
    // when click to indicator or controls button 
    // stop timer 
    clearInterval(timer);
    // then started again timer
    timer = setInterval(autoPlay, 10000);
}

function autoPlay() {
    nextSlide();
    updateCircleIndicator();
}
let timer = setInterval(autoPlay, 10000);

// End Slider

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
const achievements = document.querySelectorAll('.achievement');
let delay = 1500; // التأخير بين كل فقرة (1.5 ثانية)

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            achievements.forEach((achievement, index) => {
                setTimeout(() => {
                    achievement.classList.add('visible');
                }, delay * index);
            });
            observer.disconnect(); // إيقاف المراقبة بعد التفعيل
        }
    });
});
observer.observe(document.getElementById('achievements'));

//  End  benifit

// Start Hover Counter 
// اختر العنصر الذي تريد أن يكون دائمًا في حالة hover
const defaultHoverElement = document.querySelector('.default-hover');

// اختر كل العناصر المشابهة
const hoverItems = document.querySelectorAll('.hover-item');

// أضف الأحداث لكل العناصر
hoverItems.forEach(item => {
    item.addEventListener('mouseover', () => {
        // إزالة تأثير hover الافتراضي
        defaultHoverElement.classList.remove('default-hover');
    });

    item.addEventListener('mouseout', () => {
        // إعادة تأثير hover الافتراضي
        defaultHoverElement.classList.add('default-hover');
    });
});
// End Hover Counter 



// Start Create Member
// المراجع إلى الحقول
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const nationalIdInput = document.getElementById('nationalId');
const nameError = document.getElementById('nameError');
const phoneError = document.getElementById('phoneError');
const nationalIdError = document.getElementById('nationalIdError');
const form = document.getElementById('nameForm');
// التحقق أثناء الإدخال في حقل الاسم
nameInput.addEventListener('input', function () {
    const value = nameInput.value;
    // السماح فقط بالعربية أو الإنجليزية وعدم الخلط بينهما
    if (/^[\u0600-\u06FF\s]+$/.test(value)) {
        nameError.textContent = ''; // إدخال عربي صحيح
    } else if (/^[A-Za-z\s]+$/.test(value)) {
        nameError.textContent = ''; // إدخال إنجليزي صحيح
    } else {
        nameError.textContent = 'يجب إدخال الأسم باللغة العربية فقط أو باللغة الإنجلبزبة فقط بدون أرقام أو خلط.';
        nameInput.value = value.slice(0, -1); // إزالة آخر حرف خاطئ
    }
});
// التحقق من الاسم
const nameValue = nameInput.value;
if (!/^[\u0600-\u06FF\s]+$/.test(nameValue) && !/^[A-Za-z\s]+$/.test(nameValue)) {
    valid = false;
}
// عند الكتابة في الحقل
emailInput.addEventListener('input', () => {
    // تحويل النص إلى أحرف صغيرة وإزالة المسافات
    emailInput.value = emailInput.value.toLowerCase().replace(/\s+/g, '');
});
// التحقق أثناء الإدخال في حقل رقم الموبايل
phoneInput.addEventListener('input', function () {
    phoneInput.value = phoneInput.value.replace(/[^0-9]/g, ''); // السماح بالأرقام فقط
});
// التحقق أثناء الإدخال في حقل الرقم القومي
nationalIdInput.addEventListener('input', function () {
    nationalIdInput.value = nationalIdInput.value.replace(/[^0-9]/g, ''); // السماح بالأرقام فقط
});
// التحقق عند إرسال النموذج
form.addEventListener('submit', function (e) {
    let valid = true;
    // التحقق من رقم الموبايل
    if (!/^(010|011|012|015)\d{8}$/.test(phoneInput.value)) {
        phoneError.textContent = 'رقم الموبايل خطأ.';
        valid = false;
    } else {
        phoneError.textContent = '';
    }
    // التحقق من الرقم القومي
    if (nationalIdInput.value.length !== 14) {
        nationalIdError.textContent = 'الرقم القومي خطأ. يجب إدخال 14 رقمًا.';
        valid = false;
    } else {
        nationalIdError.textContent = '';
    }
    // منع الإرسال إذا كان هناك خطأ
    if (!valid) {
        e.preventDefault();
    }
});
//  End Create Member

// Start Translation
// تغيير اللغة حسب القيمة المخزنة في LocalStorage
function changeLanguage(lang) {
    document.getElementById("welcome").innerText = translations[lang].welcome;
    document.getElementById("about").innerText = translations[lang].about;
    document.getElementById("btn-signup").innerText = translations[lang]["btn-signup"];
}

// التبديل بين اللغات
function toggleLanguage() {
    const currentLang = document.documentElement.lang === "ar" ? "en" : "ar";
    document.documentElement.lang = currentLang;
    changeLanguage(currentLang);

    // تبديل العلم والنص في الزر
    const flag = document.getElementById('flag');
    const languageText = document.getElementById('language-text');
    if (currentLang === 'en') {
        flag.src = 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg';
        languageText.textContent = 'En';
    } else {
        flag.src = 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg';
        languageText.textContent = 'Ar';
    }
}

// Start Translation
