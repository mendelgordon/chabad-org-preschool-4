// make sections scrollable by dragging on the page even on desktop
const co_photo_gallery = document.querySelector('.co_photo_gallery');
const slider_wrapper = document.querySelector('.slider-wrapper');

const makeScrollable = (element, childSelector) => {
	if (element) {
		let position = {
			left: 0,
			x: 0
		};
		const mouseDownHandler = (e) => {
			e.preventDefault();
			element.style.cursor = 'grabbing';
			element.style.userSelect = 'none';
			position.left = element.scrollLeft;
			position.x = e.clientX;
			element.style.scrollSnapType = '';
			const children = element.querySelectorAll(childSelector);
			children.forEach(child => {
				child.style.scrollSnapAlign = '';
			});
			document.addEventListener('mousemove', mouseMoveHandler);
			document.addEventListener('mouseup', mouseUpHandler);
		};
		const mouseMoveHandler = (e) => {
			element.scrollLeft = position.left - e.clientX + position.x;
		};
		const mouseUpHandler = () => {
			element.style.cursor = 'grab';
			element.style.userSelect = '';
			element.style.scrollSnapType = 'x mandatory';
			const children = element.querySelectorAll(childSelector);
			children.forEach(child => {
				child.style.scrollSnapAlign = 'start';
			});
			document.removeEventListener('mousemove', mouseMoveHandler);
			document.removeEventListener('mouseup', mouseUpHandler);
		};
		element.addEventListener('mousedown', mouseDownHandler);
	}
};

makeScrollable(co_photo_gallery, 'img');
makeScrollable(slider_wrapper, '.slide');

const photos = document.querySelectorAll('.co_photo_gallery a');
photos.forEach((photo) => {
	// remove the link from the image so it can be dragged on desktop
	photo.removeAttribute('href');
})