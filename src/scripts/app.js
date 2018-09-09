'use strict';

import installSlides from './installSlides';
import clientsSlides from './clientsSlides';

// mobile menu

(() => {

	const menu = document.querySelector('.js-mobileMenu');
	const menuBtn = document.querySelector('.js-btnMenu');

	menuBtn.addEventListener('click', ev => {
		const target = ev.target || ev.currentTarget;

		if (target.classList.contains('active')) {
			target.classList.remove('active');
			menu.classList.remove('active');
			target.classList.add('close');
			setTimeout(() => {
				target.classList.remove('close');
			}, 500)
		} else {
			target.classList.add('active');
			menu.classList.add('active');
		}
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

	// slider of installation
	if (clickedElement.classList.contains('slider_nav_button')) {
        e.preventDefault();
        const buttonHiding = (buttons, counter, slider) => {

            for (let button of buttons) {
                button.style.visibility = 'visible';
            }

            if (counter === 0) {
                buttons[0].style.visibility = 'hidden';
            }
            else if (counter === slider.length / 3 - 1) {
                buttons[1].style.visibility = 'hidden';
            }
        };

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
                        items[i].querySelector('p').textContent = clientsSlides[(clientsSliderCounter) * 3 + i].name
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
		}
	}
});