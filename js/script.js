// "use strict";

window.addEventListener('DOMContentLoaded', function() {
    
    const header = document.querySelector('.promo_header');

    header.addEventListener('mouseover', () => {
        header.style.backgroundColor = 'black';
    });
    header.addEventListener('mouseout', () => {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    }); 

    const prev = document.querySelector('.promo_arrow_prev'),
          next = document.querySelector('.promo_arrow_next'),
          slideContent = document.querySelectorAll('.promo_content');
    
    let slideIndex = 1;

    showSlides(slideIndex);

    function showSlides(n) {
        if(n > slideContent.length) {
            slideIndex = 1;
        }
        if(n < 1) {
            slideIndex = slideContent.length;
        }

        slideContent.forEach(item => item.style.display = 'none');

        slideContent[slideIndex - 1].style.display = 'block';
    }

    function onSlide(n){
        showSlides(slideIndex += n);
    }

    prev.addEventListener('click', () => {
        onSlide(-1);
        slideContent[slideIndex - 1].classList.add('shadow')
    });

    next.addEventListener('click', () => {
        onSlide(1);
        slideContent[slideIndex - 1].classList.add('shadow')
    });

    document.addEventListener('keydown', function(e) {
        if(e.key == 'ArrowLeft') {
            onSlide(-1);
            slideContent[slideIndex - 1].classList.add('shadow');
            carouselTranslatePrev();
        }

        if(e.key == 'ArrowRight') {
            onSlide(1);
            slideContent[slideIndex - 1].classList.add('shadow');
            carouselTranslateNext();
        }
    });
    
    const tabContent = document.querySelectorAll('.hip_tabcontent'),
          tabNav = document.querySelector('.hip_tabnav'),
          tabLink = document.querySelectorAll('.hip_tablink');

    function hideTab() {
        tabContent.forEach(item => item.style.display = 'none')
    }

    hideTab();

    function showTab(i = 0) {
        tabContent[i].style.display = 'flex';
    }

    showTab();

    tabNav.addEventListener('click', function(event) {
        let target = event.target;

        if(target && target.classList.contains('hip_tablink')) {
            tabLink.forEach((item, i) => {
                if(target == item) {
                    hideTab();
                    showTab(i);
                }
            });
        }
    });

    const deadline = '2021-02-16';

    function getTime(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor((t / (1000*60*60*24))),
            hours = Math.floor((t / (1000*60*60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if(num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds');
              timerInterval = setInterval(updateClock, 1000);

            updateClock();

        function updateClock() {
            const t = getTime(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            if(t.total <= 0) {
                clearInterval(timerInterval);
            }
        }
    }

    setClock('.timer', deadline);

    const infoBtn = document.querySelectorAll('.pop_carousel_btn'),
          infoNavBtn = document.querySelector('.pop_carousel'),
          infoModal = document.querySelectorAll('.pop_carousel_info'),
          closeModal = document.querySelectorAll('.pop_carousel_closein');

    infoNavBtn.addEventListener('click', addInfo);

    function addInfo(event) {
        let pressTarget = event.target;

        if(pressTarget && pressTarget.classList.contains('pop_carousel_btn')) {
            infoBtn.forEach((item, i) => {
                if(pressTarget == item) {
                    infoModal[i].style.display = 'flex';
                    item.style.display = 'none';
                }
            });
        }
    }

    infoNavBtn.addEventListener('click', removeInfo);

    function removeInfo(event) {
        let pressTarget = event.target;

        if(pressTarget && pressTarget.classList.contains('pop_carousel_closein')) {
            closeModal.forEach((item, i) => {
                if(pressTarget == item) {
                    infoModal[i].style.display = 'none';
                }
            });
            infoBtn.forEach(item => {
                item.style.display = 'block';
            });
        }
    }

    const carouselWrapper = document.querySelector('.pop_wrapper'),
          carouselInner = document.querySelector('.pop_carousel'),
          prevSlide = document.querySelector('.pop_arrow_prev'),
          nextSlide = document.querySelector('.pop_arrow_next'),
          carouselContent= document.querySelectorAll('.pop_carousel_img'),
          width = window.getComputedStyle(carouselWrapper).width;
    
    let offset = 0;

    carouselInner.style.width = 100 * carouselContent.length + '%';
    carouselInner.style.transition = '1.5s all';

    carouselContent.forEach(item => {
        item.style.width = width;
    });

    function carouselTranslateNext() {
        if(offset == (+width.slice(0, width.length - 2) * (carouselContent.length - 1))) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        infoModal.forEach((item, i) => {
            item.style.display = 'none';
            if(infoBtn[i].style.display = 'none') {
                infoBtn[i].style.display = 'block';
            }
        });

        carouselInner.style.transform = `translateX(-${offset}px)`;
    }

    nextSlide.addEventListener('click', carouselTranslateNext);

    function carouselTranslatePrev() {
        if(offset == 0) {
            offset = +width.slice(0, width.length - 2) * (carouselContent.length - 1)
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        infoModal.forEach((item, i) => {
            item.style.display = 'none';
            if(infoBtn[i].style.display = 'none') {
                infoBtn[i].style.display = 'block';
            }
        });

        carouselInner.style.transform = `translateX(-${offset}px)`;
    }

    prevSlide.addEventListener('click', carouselTranslatePrev);

    carouselWrapper.addEventListener('touchmove', (e) => {
        if(e.targetTouches.pageX < width) {
            carouselTranslatePrev();
        } else {
            carouselTranslateNext();
        }
    });

});