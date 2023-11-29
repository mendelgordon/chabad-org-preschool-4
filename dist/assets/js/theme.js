// make .co_photo_gallery scrollable by dragging on the page on desktop
const co_photo_gallery = document.querySelector('.co_photo_gallery');
if (co_photo_gallery) {
    let position = {
        left: 0,
        x: 0
    }
    const mouseDownHandler = (e) => {
        co_photo_gallery.style.cursor = 'grabbing';
        co_photo_gallery.style.userSelect = 'none';
        position.left = co_photo_gallery.scrollLeft;
        position.x = e.clientX;
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    }
    const mouseMoveHandler = (e) => {
        co_photo_gallery.scrollLeft = position.left + e.clientX - position.x;
    }
    const mouseUpHandler = () => {
        co_photo_gallery.style.cursor = 'grab';
        co_photo_gallery.style.userSelect = '';
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    }
    co_photo_gallery.addEventListener('mousedown', mouseDownHandler);
}