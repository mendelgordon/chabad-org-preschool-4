const preschoolcss = document.getElementById('kpreschool');
if (preschoolcss) {
	preschoolcss.innerHTML = `@import url("/images/shluchim/minisites/themes/preschool2/styles.css?v=1.0.13")`;
}

const co_photo_gallery = document.querySelector('.co_photo_gallery');
function addSwiperClass(el) {
	return el.classList.add('swiper-slide');
}

// run once the page dom is loaded so we can start the sliders even though the scripts are being called at the top of the page
document.addEventListener('DOMContentLoaded', function () {
	if (co_photo_gallery) {
		const parentElement = co_photo_gallery.parentElement;
		const navigationButtonNext = document.createElement('div');
		navigationButtonNext.classList.add('swiper-button-next');
		const navigationButtonPrev = document.createElement('div');
		navigationButtonPrev.classList.add('swiper-button-prev');
		parentElement.insertAdjacentElement('afterend', navigationButtonPrev);
		parentElement.insertAdjacentElement('afterend', navigationButtonNext);
		parentElement.classList.add('swiper');
		co_photo_gallery.classList.add('swiper-wrapper');
		co_photo_gallery.querySelectorAll('a').forEach(addSwiperClass);
	}

	const swiperEl1 = document.querySelector('#Testimonials .swiper');
	const swiperEl2 = document.querySelector('.co_photo_gallery_gradient');

	if (Swiper) {
		if (swiperEl1) {
			var swiper1 = new Swiper(swiperEl1, {
				grabCursor: true,
				breakpoints: {
					0: { slidesPerView: 1.3 },
					850: { slidesPerView: 2 },
					1100: { slidesPerView: 3 }
				},
				autoHeight: true,
				spaceBetween: 10,
				loop: true,
				navigation: {
					nextEl: '#Testimonials .swiper-button-next',
					prevEl: '#Testimonials .swiper-button-prev',
				}
			});
		}

		if (swiperEl2) {
			var swiper2 = new Swiper(swiperEl2, {
				grabCursor: true,
				breakpoints: {
					0: { slidesPerView: 1.3 },
					850: { slidesPerView: 2 },
					1100: { slidesPerView: 3 }
				},
				autoHeight: true,
				spaceBetween: 10,
				loop: true,
				navigation: {
					nextEl: '#PreschoolLatestPhotos .swiper-button-next',
					prevEl: '#PreschoolLatestPhotos .swiper-button-prev',
				}
			});
		}
	}

	if (document.querySelector('#k16031')) {
		document.querySelector('#k16031').remove()
	}
});