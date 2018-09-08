'use strict';

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