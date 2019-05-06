require.config({
	urlArgs: '_=' + (new Date()).getTime(),  // forceful cache bust for all requirejs resources
	baseUrl: 'js/vendor',
	paths: {
		'router': '../router',
		'tmpl': '../tmpl',
		'views': '../views',
		'app': '../app',
		'bootstrap': '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min'
	},

	shim: {  // config for non-AMD libraries that are loaded into global context: creates local ref to use inside requirejs
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'underscore': {
			exports: '_'
		},
		'bootstrap': {
			deps: ['jquery']
		}
	}
});


define([
	'backbone',
	'router'
], function(
	Backbone,
	router)
{
	Backbone.history.start();
});