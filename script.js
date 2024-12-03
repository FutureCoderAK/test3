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
    timer = setInterval(autoPlay, 4000);
}


function autoPlay() {
    nextSlide();
    updateCircleIndicator();
}

let timer = setInterval(autoPlay, 4000);

// End Slider




