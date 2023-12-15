// make sections scrollable by dragging on the page even on desktop
const co_photo_gallery = document.querySelectorAll('.co_photo_gallery');
co_photo_gallery.forEach((gallery) => {
	gallery.classList.add('swiper');
})

const swiper = new Swiper('.swiper');
const swiper2 = new Swiper('.swiper.co_photo_gallery');