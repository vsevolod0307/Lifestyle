// "use strict";
/*jshint esversion: 6 */

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
        slideContent[slideIndex - 1].classList.add('shadow');
    }

    prev.addEventListener('click', () => {
        onSlide(-1);
    });

    next.addEventListener('click', () => {
        onSlide(1);
    });

    document.addEventListener('keydown', function(e) {
        if(e.key == 'ArrowLeft') {
            onSlide(-1);
            carouselTranslatePrev();
        }

        if(e.key == 'ArrowRight') {
            onSlide(1);
            carouselTranslateNext();
        }
    });
    class Slide {
        constructor(src, alt, title, info, btnClose, btnInfo, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.info = info;
            this.btnClose = btnClose;
            this.btnInfo = btnInfo;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
        }

        render() {
            const elem = document.createElement('div');
            if(this.classes.length === 0) {
                this.elem = 'pop_carousel_block';
                elem.classList.add(this.elem);
            } else {
                this.classes.forEach(className => elem.classList.add(className));
            }

            elem.innerHTML = `
                <div class="pop_carousel_img">
                    <img src=${this.src} alt=${this.alt}>
                    <div class="pop_carousel_title">${this.title}</div>
                    <div class="pop_carousel_info">${this.info}</div>
                    <div class="pop_carousel_wrap">
                        <div class="pop_carousel_closein">${this.btnClose}</div>
                        <button class="pop_carousel_btn">${this.btnInfo}</button>
                    </div>
                </div>
            `;
            this.parent.append(elem);
        }
    }

    new Slide(
        '"images/bg/bg_carousel_1.jpg"',
        '"bg_carousel_1"',
        'Work',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis est assumenda enim exercitationem nihil molestiae consequatur quaerat? Quod nemo quibusdam aliquid impedit voluptatibus',
        'close',
        'info',
        '.pop_carousel'
    ).render();

    new Slide(
        '"images/bg/bg_carousel_2.jpg"',
        '"bg_carousel_2"',
        'Family',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis est assumenda enim exercitationem nihil molestiae consequatur quaerat? Quod nemo quibusdam aliquid impedit voluptatibus',
        'close',
        'info',
        '.pop_carousel'
    ).render();

    new Slide(
        '"images/bg/bg_carousel_3.jpg"',
        '"bg_carousel_3"',
        'Animals',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis est assumenda enim exercitationem nihil molestiae consequatur quaerat? Quod nemo quibusdam aliquid impedit voluptatibus',
        'close',
        'info',
        '.pop_carousel'
    ).render();

    new Slide(
        '"images/bg/bg_carousel_4.jpg"',
        '"bg_carousel_4"',
        'Adventures',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis est assumenda enim exercitationem nihil molestiae consequatur quaerat? Quod nemo quibusdam aliquid impedit voluptatibus',
        'close',
        'info',
        '.pop_carousel'
    ).render();

    const forms = document.querySelectorAll('form');

    console.log(forms);

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('modal_contact_status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);

            const r = new XMLHttpRequest();
            r.open('POST', 'server.php');

            r.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form);

            const obj = {};
            formData.forEach(function(value, key) {
                obj[key] = value;
            });

            const json = JSON.stringify(obj);

            r.send(json);

            r.addEventListener('load', () => {
                if(r.status === 200) {
                    console.log(r.response);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
                } else {
                    showThanksModal(message.failure);
                }
            });
        });
    }

    function showThanksModal(message) {
        const prevModalContact = document.querySelector('.modal_contact_form');

        prevModalContact.style.visibility = 'hidden';
        openModalContact();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal_contact_form');
        thanksModal.style.zIndex = '100';
        contactModal.style.height = '100px';
        thanksModal.innerHTML = `
            <div class="modal_contact_undertitle">${message}</div>
            <div class="modal_contact_close" data-close>&times;</div>
        `;
        document.querySelector('.modal_contact').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            contactModal.style.height = '';
            prevModalContact.style.visibility = '';
            closeModalContact();
        } ,2000);
    }
    class Tab {
        constructor(title, descr, src, alt, parentSelector, ...classes) {
            this.title = title;
            this.descr = descr;
            this.src = src;
            this.alt = alt;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
        }

        render() {
            const elementTab = document.createElement('div');
            if(this.classes.length === 0) {
                this.elementTab = 'hip_tabcontent';
                elementTab.classList.add(this.elementTab);
            } else {
                this.classes.forEach(className => elementTab.classList.add(className));
            }
            elementTab.innerHTML = `
            <div class="hip_item">
                <div class="hip_text">
                    <div class="hip_text_title">${this.title}</div>
                    <div class="hip_text_descr">${this.descr}</div>
                </div>
            </div>
            <div class="hip_item">
                <div class="hip_img"><img src="${this.src}" alt="${this.alt}"></div>
            </div>
            `;
            this.parent.append(elementTab);
        }
    }

    new Tab(
        'work',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, fugiat? Consequuntur ab ex eaque? Consequuntur explicabo laborum odit vero, numquam commodi eum quasi sint delectus, culpa repudiandae, pariatur non sequi!',
        'images/bg/bg_carousel_1.jpg',
        'bg_carousel',
        '.hip_tabs'
    ).render();

    new Tab(
        'family',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, fugiat? Consequuntur ab ex eaque? Consequuntur explicabo laborum odit vero, numquam commodi eum quasi sint delectus, culpa repudiandae, pariatur non sequi!',
        'images/bg/bg_carousel_2.jpg',
        'bg_carousel',
        '.hip_tabs'
    ).render();

    new Tab(
        'animals',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, fugiat? Consequuntur ab ex eaque? Consequuntur explicabo laborum odit vero, numquam commodi eum quasi sint delectus, culpa repudiandae, pariatur non sequi!',
        'images/bg/bg_carousel_3.jpg',
        'bg_carousel',
        '.hip_tabs'
    ).render();

    new Tab(
        'adventures',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, fugiat? Consequuntur ab ex eaque? Consequuntur explicabo laborum odit vero, numquam commodi eum quasi sint delectus, culpa repudiandae, pariatur non sequi!',
        'images/bg/bg_carousel_4.jpg',
        'bg_carousel',
        '.hip_tabs'
    ).render();

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

    const btnForm = document.querySelector('.pop_form_btn');

    btnForm.addEventListener('click', function(e) {
        e.preventDefault();
    });

    const gamburger = document.querySelector('#menu_close'),
          menu = document.querySelector('.promo_header_menu');

    gamburger.addEventListener('click', function(e) {
        if (e.target.id == 'menu_close') {
            menu.style.display = (menu.style.display != 'flex') ? 'flex' : 'none';
        }
        // menu.style.display = 'flex';
        // header.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    });

    document.addEventListener('touchstart', (e) => {
        console.log(e.target);
    });

    const idWork = document.querySelector('#work'),
          idFamily = document.querySelector('#family'),
          idAdventures = document.querySelector('#adventures');
        //   idAddition = document.querySelector('#addition');

    idWork.addEventListener('click', () => {
        document.documentElement.scrollTop = 276;
    });

    idFamily.addEventListener('click', () => {
        document.documentElement.scrollTop = 1475;
    });

    idAdventures.addEventListener('click', () => {
        document.documentElement.scrollTop = 2875;
    });

    // idAddition.addEventListener('click', () => {
    //     document.documentElement.scrollTop = 276;
    // });

    const contactModalBtn = document.querySelectorAll('[data-modal]'),
          contactModal = document.querySelector('.modal_contact');

    function openModalContact() {
            contactModal.style.display = 'flex';
            document.body.style.overflowY = 'hidden';
            clearInterval(modalContactTimer);
    }

    contactModalBtn.forEach(btn => {
        btn.addEventListener('click', openModalContact);
    });

    function closeModalContact() {
        contactModal.style.display = 'none';
        document.body.style.overflowY = '';
    }

    contactModal.addEventListener('click', (e) => {
        if(e.target === contactModal || e.target.getAttribute('data-close') == '') {
            closeModalContact();
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && contactModal.style.display === 'flex') {
            closeModalContact();
        }
    });

    const modalContactTimer = setTimeout(openModalContact, 6000);

    function showModalScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModalContact();
            window.removeEventListener('scroll', showModalScroll);
        }
    }

    window.addEventListener('scroll', showModalScroll);

});