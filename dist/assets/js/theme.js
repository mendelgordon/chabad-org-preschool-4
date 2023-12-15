// make sections scrollable by dragging on the page even on desktop
const co_photo_gallery = document.querySelectorAll('.co_photo_gallery');
co_photo_gallery?.classList.add('swiper');

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
		}
	});
}

const swiper = createSwiper('.swiper');
const swiper2 = createSwiper('.co_photo_gallery');