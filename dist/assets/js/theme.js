const co_photo_gallery = document.querySelector('.co_photo_gallery');
if (co_photo_gallery) {
	co_photo_gallery.classList.add('swiper-wrapper');
	// wrap co_photo_gallery in div with swiper class to make it work with swiper js
	co_photo_gallery.parentElement.classList.add('swiper');
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