$(document).ready(function() {
	var navOut = false;
	$('.nav-btn').click(function() {
		if(!navOut) {
			$('.sidebar').animate({
				left: '0px'
			}, 200);
			$('body').animate({
				left: '250px'
			}, 200);
			navOut = true;
		}
		else {
			$('.sidebar').animate({
				left: "-250px"
			}, 200);
			$('body').animate({
				left: "0px"
			}, 200);
			navOut = false;
		}
	});
});
