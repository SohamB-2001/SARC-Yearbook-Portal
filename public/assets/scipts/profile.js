var x = document.getElementById('glitch');
function toggle() {
	if (x.style.visibility === 'hidden') {
		x.classList.toggle('m-fadeIn');
		console.log(2);
	} else {
		console.log(1);
		x.classList.toggle('m-fadeOut');
	}
}