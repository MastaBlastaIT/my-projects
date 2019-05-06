var $page = $('#page'),
	currentScreen = 'none';

showMainScreen();

function hideCurrentScreen() {
	// Call prev screen's destructor
	if (currentScreen === 'main') {
		hideMainScreen();
	} else if (currentScreen === 'gamelist') {
	    hideGameListScreen();
	} else if (currentScreen === 'game') {
	    hideGameScreen();
	} else if (currentScreen === 'login') {
	    hideLoginScreen();
	}	
}

function showGameListScreen() {
	hideCurrentScreen();
	$page.html(gamelistTmpl()); // Render template
	currentScreen = 'gamelist';

}
function hideGameListScreen() {
}

function showGameScreen() {
	hideCurrentScreen();
	$page.html(gameTmpl()); // Render template
	currentScreen = 'game';
}
function hideGameScreen() {
}

function showLoginScreen() {
	hideCurrentScreen();
	$page.html(loginTmpl()); // Render template	
	currentScreen = 'login';
}
function hideLoginScreen() {
}

function showMainScreen() {
	hideCurrentScreen();

	$page.html(mainTmpl()); // Render template

	// Initialize event handlers
	if(currentScreen === 'none') {
		$('.js-game-list').on('click', showGameListScreen);
		$('.js-game').on('click', showGameScreen);
		$('.js-login').on('click', showLoginScreen);
		$('.js-main').on('click', showMainScreen);
	}

	currentScreen = 'main';
}

function hideMainScreen() {
	// Remove event handlers from current screen from memory
	// $('.js-game-list').off('click', showGameListScreen);
	// $('.js-game').off('click', showGameScreen);
	// $('.js-login').off('click', showLoginScreen);
}