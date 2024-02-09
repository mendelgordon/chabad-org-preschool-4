const preschoolcss = document.getElementById('kpreschool');
if (preschoolcss) {
	preschoolcss.innerHTML = `@import url("/images/shluchim/minisites/themes/preschool2/styles.css?v=1.0.14")`;
}

if (document.querySelector('#k16031')) {
	document.querySelector('#k16031').remove()
}