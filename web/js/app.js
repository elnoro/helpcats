var helpCatsApp = angular.module('helpCatsApp', []);

helpCatsApp.controller('catsCtrl', function ($scope) {
	$scope.cats = [
		{
			"name": "Киска 1",
			"image": "https://pp.vk.me/c621316/v621316464/15ca5/jYoWFiQEKYg.jpg",
			"shortDescription": "Donec leo, vivamus fermentum nibh in augue praesent a lacus at urna congue rutrum  wisi maecenas ligula.",
			"link": "#"
		},
		{
			"name": "Киска 3",
			"image": "images/pic03.jpg",
			"shortDescription": "Donec leo, vivamus fermentum nibh in augue praesent a lacus at urna congue rutrum  wisi maecenas ligula.",
			"link": "#"
		},
		{
			"name": "Киска 1",
			"image": "images/pic02.jpg",
			"shortDescription": "Donec leo, vivamus fermentum nibh in augue praesent a lacus at urna congue rutrum  wisi maecenas ligula.",
			"link": "#"
		},
	];
});