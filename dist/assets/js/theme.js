const co_photo_gallery = document.querySelector('.co_photo_gallery');
if (co_photo_gallery) {
	co_photo_gallery.parentElement.classList.add('swiper');
	co_photo_gallery.classList.add('swiper-wrapper');
	co_photo_gallery.querySelectorAll('a').forEach(el => el.classList.add('swiper-slide'));
}

function createSwiper(selector) {
	return new Swiper(selector, {
		centerInsufficientSlides: true,
		createElements: true,
		grabCursor: true,
		pagination: true,
		breakpoints: {
			600: {
				slidesPerView: 2
			},
			800: {
				slidesPerView: 3
			}
		},
		navigation: true,
	});
}

const swiper = createSwiper('.swiper');
const swiper2 = createSwiper('.co_photo_gallery_gradient');