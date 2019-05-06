(function() {
	"use strict";
	var $pickButton = $("#pickButton");
	$("#reasonDropdown li a").on("click", function() {
		var reason = $(this).text(); // pick text from menu item
		$pickButton.text(reason);  // change button text to the picked value
	});

	var $pickButtonFavorite = $("#pickButtonFavorite")
	$("#favoriteList li a").on("click", function(){
		$pickButtonFavorite.button("toggle");
	});


	var $sentDialog = $("#sentDialog");
	$("#contactForm").on("submit", function() {
		$sentDialog.modal('show');
		return false;  // do not submit the form (fake form)
	});


	var $sentAlert = $("#sentAlert");
	$sentAlert.on("close.bs.alert", function() {
		$sentAlert.hide();
		return false;  // prevent removing alert from the DOM
	});

	$sentDialog.on('hidden.bs.modal', function(){
		console.log("You closed the modal window");
		$sentAlert.show();
	});



	$("#contactForm input[type=submit]").tooltip();

	$("#theCarousel").carousel();

})();