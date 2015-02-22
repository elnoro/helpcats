var helpCatsApp = angular.module('helpCatsApp', ['ngRoute']);


helpCatsApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/cats', {
				templateUrl: 'partials/index.html',
				controller: 'catsCtrl'
			}).
			when('/cats/:catId', {
				templateUrl: 'partials/cat.html',
				controller: 'catDetailCtrl'
			}).
				otherwise({
				redirectTo: '/cats'
			});
	}
]);


helpCatsApp.controller('catsCtrl', function ($scope) {
	$scope.cats = [
		{
			"name": "Киска 1",
			"image": "https://pp.vk.me/c621316/v621316464/15ca5/jYoWFiQEKYg.jpg",
			"shortDescription": "Милейший молодой котик ищет себе новый дом. На вид коту года три. Ласковый,к рукам приучен,мурлычет,нежнейшее создание,ходит в лоток. По всем подробностям обращаться по ",
			"link": "#"
		},
		{
			"name": "Киска 2",
			"image": "https://pp.vk.me/c621830/v621830713/ebfa/hzo4z-8BxJs.jpg",
			"shortDescription": "В районе Доватора найдена/подкинута вот такая вот девочка!!! Возраст около 5-6 месяцев! Ласковая, с необычайно мягкой и шелковистой шерсткой! Временно приютили в подъезде, но кошка очень сильно стрессует, ",
			"link": "#"
		},
		{
			"name": "Киска 3",
			"image": "https://pp.vk.me/c621316/v621316464/15ca5/jYoWFiQEKYg.jpg",
			"shortDescription": "Милейший молодой котик ищет себе новый дом. На вид коту года три. Ласковый,к рукам приучен,мурлычет,нежнейшее создание,ходит в лоток. По всем подробностям обращаться по ",
			"link": "#"
		},
		{
			"name": "Киска 4",
			"image": "https://pp.vk.me/c621830/v621830713/ebfa/hzo4z-8BxJs.jpg",
			"shortDescription": "В районе Доватора найдена/подкинута вот такая вот девочка!!! Возраст около 5-6 месяцев! Ласковая, с необычайно мягкой и шелковистой шерсткой! Временно приютили в подъезде, но кошка очень сильно стрессует, ",
			"link": "#"
		},
		{
			"name": "Киска 5",
			"image": "https://pp.vk.me/c621316/v621316464/15ca5/jYoWFiQEKYg.jpg",
			"shortDescription": "Милейший молодой котик ищет себе новый дом. На вид коту года три. Ласковый,к рукам приучен,мурлычет,нежнейшее создание,ходит в лоток. По всем подробностям обращаться по ",
			"link": "#"
		},
		{
			"name": "Киска 6",
			"image": "https://pp.vk.me/c621830/v621830713/ebfa/hzo4z-8BxJs.jpg",
			"shortDescription": "В районе Доватора найдена/подкинута вот такая вот девочка!!! Возраст около 5-6 месяцев! Ласковая, с необычайно мягкой и шелковистой шерсткой! Временно приютили в подъезде, но кошка очень сильно стрессует, ",
			"link": "#"
		},
		{
			"name": "Киска 7",
			"image": "https://pp.vk.me/c621316/v621316464/15ca5/jYoWFiQEKYg.jpg",
			"shortDescription": "Милейший молодой котик ищет себе новый дом. На вид коту года три. Ласковый,к рукам приучен,мурлычет,нежнейшее создание,ходит в лоток. По всем подробностям обращаться по ",
			"link": "#"
		},
		{
			"name": "Киска 8",
			"image": "https://pp.vk.me/c621830/v621830713/ebfa/hzo4z-8BxJs.jpg",
			"shortDescription": "В районе Доватора найдена/подкинута вот такая вот девочка!!! Возраст около 5-6 месяцев! Ласковая, с необычайно мягкой и шелковистой шерсткой! Временно приютили в подъезде, но кошка очень сильно стрессует, ",
			"link": "#"
		}
	];

	var splitArrayIntoChunks = function (originalArray, chunkSize) {
		var chunks = [];
		for (var i = 0; i < originalArray.length; i += chunkSize) {
		    chunks.push(originalArray.slice(i, i + chunkSize));
		};
		return chunks;
	}

	$scope.catChunks = splitArrayIntoChunks($scope.cats, 3);
});

helpCatsApp.controller('catDetailCtrl', ['$scope', '$routeParams',
	function($scope, $routeParams) {
		$scope.catId = $routeParams.catId;
	}
]);