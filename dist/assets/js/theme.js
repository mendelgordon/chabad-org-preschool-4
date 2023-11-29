// make sections scrollable by dragging on the page even on desktop
const co_photo_gallery = document.querySelector('.co_photo_gallery');
const slider_wrapper = document.querySelector('.slider-wrapper');

const makeScrollable = (element) => {
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
			document.addEventListener('mousemove', mouseMoveHandler);
			document.addEventListener('mouseup', mouseUpHandler);
		};
		const mouseMoveHandler = (e) => {
			element.scrollLeft = position.left - e.clientX + position.x;
		};
		const mouseUpHandler = (e) => {
			e.preventDefault();
			element.style.cursor = 'grab';
			element.style.userSelect = '';
			document.removeEventListener('mousemove', mouseMoveHandler);
			document.removeEventListener('mouseup', mouseUpHandler);
		};
		element.addEventListener('mousedown', mouseDownHandler);
	}
};

makeScrollable(co_photo_gallery);
makeScrollable(slider_wrapper);
