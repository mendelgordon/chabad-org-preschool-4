const co_photo_gallery = document.querySelector('.co_photo_gallery');
if (co_photo_gallery) {
	co_photo_gallery.parentElement.classList.add('swiper');
	co_photo_gallery.classList.add('swiper-wrapper');
	co_photo_gallery.querySelectorAll('a').forEach(el => el.classList.add('swiper-slide'));
}

function createSwiper(selector, reverse) {
	if (!document.querySelector(selector)) return console.error(`Swiper selector ${selector} not found`);
	return new Swiper(selector, {
		createElements: true,
		grabCursor: true,
		breakpoints: {
			0: {
				slidesPerView: 1.3
			},
			850: {
				slidesPerView: 2
			},
			1100: {
				slidesPerView: 3
			}
		},
		autoplay: {
			delay: 0,
			reverseDirection: reverse,
		},
		spaceBetween: 20,
		autoHeight: true,
		effect: 'coverflow',
		coverflowEffect: {
			slideShadows: false,
			depth: 100,
			rotate: 0,
		},
		speed: 4000,
		pagination: true,
		freeMode: true,
		loop: true,
	});
}

const swiper = createSwiper('.swiper', false);
const swiper2 = createSwiper('.co_photo_gallery_gradient', true);