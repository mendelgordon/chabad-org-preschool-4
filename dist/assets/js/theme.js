const co_photo_gallery = document.querySelector('.co_photo_gallery');
if (co_photo_gallery) {
	co_photo_gallery.parentElement.classList.add('swiper');
	co_photo_gallery.classList.add('swiper-wrapper');
	co_photo_gallery.querySelectorAll('a').forEach(el => el.classList.add('swiper-slide'));
}

const swiperEl1 = document.querySelector('#Testimonials .swiper');
const swiperEl2 = document.querySelector('.co_photo_gallery_gradient');

if (swiperEl1 && Swiper) {
	var swiper1 = new Swiper(swiperEl1, {
		grabCursor: true,
		breakpoints: {
			0: { slidesPerView: 1.3 },
			850: { slidesPerView: 2 },
			1100: { slidesPerView: 3 }
		},
		autoHeight: true,
		effect: 'coverflow',
		coverflowEffect: {
			slideShadows: true,
			scale: 0.9,
			rotate: 0,
		},
		loop: true,
		centeredSlides: true,
		navigation: {
			nextEl: '#Testimonials .swiper-button-next',
			prevEl: '#Testimonials .swiper-button-prev',
		}
	});
}

if (swiperEl2 && Swiper) {
	var swiper2 = new Swiper(swiperEl2, {
		grabCursor: true,
		breakpoints: {
			0: { slidesPerView: 1.3 },
			850: { slidesPerView: 2 },
			1100: { slidesPerView: 3 }
		},
		autoHeight: true,
		effect: 'coverflow',
		coverflowEffect: {
			slideShadows: true,
			scale: 0.9,
			rotate: 0,
		},
		loop: true,
		centeredSlides: true,
		navigation: {
			nextEl: '.co_photo_gallery_gradient .swiper-button-next',
			prevEl: '.co_photo_gallery_gradient .swiper-button-prev',
		}
	});
}