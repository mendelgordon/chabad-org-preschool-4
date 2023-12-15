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
			850: {
				slidesPerView: 2
			},
			1100: {
				slidesPerView: 3
			}
		},
		navigation: true,
		spaceBetween: 20,
		autoHeight: true,
		slidesOffsetAfter: 60,
		slidesOffsetBefore: 20,
	});
}

const swiper = createSwiper('.swiper');
const swiper2 = createSwiper('.co_photo_gallery_gradient');