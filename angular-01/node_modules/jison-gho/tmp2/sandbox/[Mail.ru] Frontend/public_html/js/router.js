define([
    'backbone',
    'views/main',
    'views/game',
    'views/gamelist',
    'views/login'
], function(
    Backbone,
    mainView,
    gameView,
    gamelistView,
    loginView
) {

    // $('#page').append(mainView.el.innerHTML);
    var Router = Backbone.Router.extend({

    	currentScreen: "none",

        routes: {
            'gamelist': 'gamelistAction',
            'game': 'gameAction',
            'login': 'loginAction',
            '*default': 'defaultActions' // any other anchor (including empty #)
        },

        defaultActions: function() {
        	this.hideCurrentScreen();
            mainView.show();
            this.currentScreen = 'main';
        },
        gamelistAction: function() {
        	this.hideCurrentScreen();
            gamelistView.show();
            this.currentScreen = 'gamelist';
        },
        gameAction: function() {
        	this.hideCurrentScreen();
            gameView.show();
            this.currentScreen = 'game';
        },
        loginAction: function() {
        	this.hideCurrentScreen();
            loginView.show();
            this.currentScreen = 'login';
        },

        hideCurrentScreen: function() {
        	if (this.currentScreen === 'main') {
        		mainView.hide();
        	} else if (this.currentScreen === 'gamelist') {
        	    gamelistView.hide();
        	} else if (this.currentScreen === 'game') {
        	    gameView.hide();
        	} else if (this.currentScreen === 'login') {
        	    loginView.hide();
        	} 
        }

    }); // extend

    return new Router();

});
