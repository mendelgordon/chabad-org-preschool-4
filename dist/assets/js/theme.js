const co_photo_gallery = document.querySelector('.co_photo_gallery');
if (co_photo_gallery) {
	co_photo_gallery.parentElement.classList.add('swiper');
	co_photo_gallery.classList.add('swiper-wrapper');
	co_photo_gallery.querySelectorAll('a').forEach(el => el.classList.add('swiper-slide'));
}

function createSwiper(selector) {
	if (!document.querySelector(selector)) return console.error(`Swiper selector ${selector} not found`);
	if (!Swiper) return console.error('Swiper not found');
	return new Swiper(selector, {
		grabCursor: true,
		breakpoints: {
			0: { slidesPerView: 1.3 },
			850: { slidesPerView: 2 },
			1100: { slidesPerView: 3 }
		},
		autoHeight: true,
		effect: 'coverflow',
		coverflowEffect: {
			slideShadows: false,
			scale: 0.9,
			rotate: 0,
		},
		loop: true,
	});
}

const swiper = createSwiper('.swiper');
const swiper2 = createSwiper('.co_photo_gallery_gradient');