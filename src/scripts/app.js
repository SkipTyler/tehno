'use strict';
import installSlides from './installSlides';
import clientsSlides from './clientsSlides';

// mobile menu


const _body = document.querySelector('body');

// hide scroll
const hideScroll = () => {
	const _scrollWidth = document.documentElement.scrollWidth;
	const _screenWidth = screen.width;
	const _rightPadding = _screenWidth - _scrollWidth;
	_body.style.paddingRight = `${_rightPadding}` + 'px';
	document.documentElement.classList.add('no-scroll');
};

// show scroll in
const showScroll = () => {
	_body.removeAttribute('style');
	document.documentElement.classList.remove('no-scroll');
};


(() => {

	const menu = document.querySelector('.js-mobileMenu');
	const menuBtn = document.querySelector('.js-btnMenu');

	menuBtn.addEventListener('click', ev => {
		const target = ev.target || ev.currentTarget;

		if (target.classList.contains('active')) {
			target.classList.remove('active');
			menu.classList.remove('active');
			target.classList.add('close');
			showScroll();
			setTimeout(() => {
				target.classList.remove('close');
			}, 500)
		} else {
			target.classList.add('active');
			menu.classList.add('active');
			hideScroll();
		}
	});

	const menuLinks = document.querySelectorAll('.header__nav-link');

	Array.prototype.forEach.call(menuLinks, el => {
		el.addEventListener('click', () => {
			menuBtn.classList.remove('active');
			menu.classList.remove('active');
			menuBtn.classList.add('close');
			showScroll();
		})
	})


})();

document.addEventListener('DOMContentLoaded', () => {
	const sets = document.querySelectorAll('.clients_content_set');

	for (let set of sets) {
		set.style.width = getComputedStyle(document.querySelector('.wrapper')).width;
	}
});

let installSliderCounter = 0;
let clientsSliderCounter = 0;

document.addEventListener('click', (e) => {
	const clickedElement = e.target;
    const dots = document.querySelectorAll('.clients_dots a');
    const buttonHiding = (buttons, counter, slider) => {

        for (let button of buttons) {
            button.style.visibility = 'visible';
        }

        if (counter === 0) {
            buttons[0].style.visibility = 'hidden';
        }
        else if (counter === slider.length / 3 - 1 || counter === slider.length - 1 ) {
            buttons[1].style.visibility = 'hidden';
        }
    };

	// slider of installation
	if (clickedElement.classList.contains('slider_nav_button')) {
        e.preventDefault();

		if (clickedElement.parentNode.classList.contains('installation_nav')) {
            const overlay = document.querySelector('.installation_overlay');
            const section = overlay.parentNode;
            const buttons = section.querySelectorAll('.slider_nav_button');

            const animate = () => {
                section.classList.add('hiding');
                setTimeout(
                    () => {
                        overlay.style.backgroundImage = `url("../images/slider/${installSlides[installSliderCounter].image}")`;
                        section.querySelector('.subtitle').textContent = installSlides[installSliderCounter].subtitle;
                        section.querySelector('.installation_slider').innerHTML = installSlides[installSliderCounter].content;
                        section.classList.remove('hiding');
                    }, 200);
            };

            // animation
            if (clickedElement.classList.contains('slider_nav_left')
                && installSliderCounter !== 0) {
                installSliderCounter--;
                buttonHiding(buttons, installSliderCounter, installSlides);
                animate();
            }
            else if (clickedElement.classList.contains('slider_nav_right')
                && installSliderCounter !== installSlides.length - 1) {
                installSliderCounter++;
                buttonHiding(buttons, installSliderCounter, installSlides);
                animate();
            }
		}

        // slider of clients
		else if (clickedElement.parentNode.classList.contains('clients_nav')) {
			const content = document.querySelector('.clients_content');
			const items = content.querySelectorAll('.clients_content_item');
			const buttons = document.querySelectorAll('.clients_nav .slider_nav_button');
			const animate = () => {
                content.classList.add('opacity');

                setTimeout(() => {

                    for (let i = 0; i < items.length; i++) {
                        items[i].querySelector('p').textContent = clientsSlides[(clientsSliderCounter) * 3 + i].name;
                        items[i].querySelector('svg').innerHTML = clientsSlides[(clientsSliderCounter) * 3 + i].icon;
                    }
                    content.classList.remove('opacity');
                }, 500);
			};

            // animation
            if (clickedElement.classList.contains('slider_nav_left')
                && clientsSliderCounter !== 0) {
                clientsSliderCounter--;
                buttonHiding(buttons, clientsSliderCounter, clientsSlides);
                animate();
            }
            else if (clickedElement.classList.contains('slider_nav_right')
                && clientsSliderCounter !== clientsSlides.length / 3 - 1) {
                clientsSliderCounter++;
                buttonHiding(buttons, clientsSliderCounter, clientsSlides);
                animate();
            }

            // dots
            for (let dot of dots) {

                if (dot.classList.contains('active')) {
                    dot.classList.remove('active');
                }
            }
            dots[clientsSliderCounter].classList.add('active');
        }
	}

	// dots clicking
	else if (clickedElement.parentNode.classList.contains('clients_dots')) {
        e.preventDefault();

	    if (!clickedElement.classList.contains('active')) {

            for (let i = 0; i < dots.length; i++) {

                if (dots[i].classList.contains('active')) {
                    dots[i].classList.remove('active');
                }
                else if (dots[i] === clickedElement) {
                    clientsSliderCounter = i;
                }
            }
            dots[clientsSliderCounter].classList.add('active');
            const content = document.querySelector('.clients_content');
            const items = content.querySelectorAll('.clients_content_item');
            const buttons = document.querySelectorAll('.clients_nav .slider_nav_button');
            const animate = () => {
                content.classList.add('opacity');
                setTimeout(() => {

                    for (let i = 0; i < items.length; i++) {
                        items[i].querySelector('p').textContent = clientsSlides[(clientsSliderCounter) * 3 + i].name;
                        items[i].querySelector('svg').innerHTML = clientsSlides[(clientsSliderCounter) * 3 + i].icon;
                    }
                    content.classList.remove('opacity');
                }, 250);
            };

            animate();

            for (let button of buttons) {
                button.style.visibility = 'visible';
            }

            if (clientsSliderCounter === 0) {
                buttons[0].style.visibility = 'hidden';
            }
            else if (clientsSliderCounter === dots.length - 1) {
                buttons[1].style.visibility = 'hidden';
            }
        }
    }
});


// services card

(() => {
	const cards = document.querySelectorAll('.js-card');

	Array.prototype.forEach.call(cards, el => {
		el.addEventListener('click', () => {
			el.classList.toggle('active');
		})
	})


})();

const crossDomainPost = () => {
	// Add the iframe with a unique name
	const iframe = document.createElement("iframe");
	const uniqueString = "CHANGE_THIS_TO_SOME_UNIQUE_STRING";
	document.body.appendChild(iframe);
	iframe.style.display = "none";
	iframe.contentWindow.name = uniqueString;

	// construct a form with hidden inputs, targeting the iframe
	const form = document.createElement("form");
	form.target = uniqueString;
	form.action =
		"https://api.telegram.org/bot383655115:AAFbKchTA9zDxOSfRW-8IVH2A6r3VTAjUV4/sendMessage?chat_id=380460973&text=" + document.querySelector('#company').value + "%0A" + document.querySelector('#name').value + "%0A" + document.querySelector('#email').value + "%0A" + document.querySelector('#tel').value;

	form.method = "POST";

	// repeat for each parameter
	const input = document.createElement("input");
	input.type = "hidden";
	input.name = "INSERT_YOUR_PARAMETER_NAME_HERE";
	input.value = "INSERT_YOUR_PARAMETER_VALUE_HERE";
	form.appendChild(input);

	document.body.appendChild(form);
	form.submit();
};

$(".js-scrollto").on("click", function(e) {
	e.preventDefault();
	var t = $(this).attr("href"),
		a = $(t).offset().top;
	$("body,html").animate({
		scrollTop: a
	}, 900)
});

$("input[type=tel]").inputmask({"mask": "(999) 999-9999"});



$('.js-telegramForm').click(function (e) {
	e.preventDefault();
	var parent = $(this).parent();
	var formTel = parent.find('input[type=tel]');
	var formEmail = parent.find('input[type=email]');
	var reTel = /^[\d\(\)\ \-]{4,14}\d$/;
	var validTel =  reTel.test(formTel.val());
	var reEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	var validEmail = reEmail.test(formEmail.val());

	var formCompany = parent.find('input[name=company]');
	var formName = parent.find('input[name=name]');
	var reFormCompany = formCompany.val().length;
	var reFormName = formName.val().length;

	var error = parent.find('.error');

	if (validTel && validEmail && reFormCompany > 2 && reFormName > 2) {
		crossDomainPost();
		parent.trigger("reset");
	} else {
		error.addClass('active');
		setTimeout(function () {
			error.removeClass('active')
		}, 5000)
	}
});