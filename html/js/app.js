var helpCatsApp = angular.module('helpCatsApp', ['ngRoute', 'ngResource']);

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

helpCatsApp.factory('Cat', ['$resource',
	function($resource) {
		return $resource('/api/cats.json/:catId');
	}
]);

helpCatsApp.controller('catsCtrl', ['$scope', 'Cat', function ($scope, Cat) {
	Cat.query({}, function (cats) {
		$scope.catChunks = splitArrayIntoChunks(cats, 3);
	});
	var splitArrayIntoChunks = function (originalArray, chunkSize) {
		var chunks = [];
		for (var i = 0; i < originalArray.length; i += chunkSize) {
		    chunks.push(originalArray.slice(i, i + chunkSize));
		};
		return chunks;
	};
}]);

helpCatsApp.controller('catDetailCtrl', ['$scope', '$routeParams', 'Cat',
	function($scope, $routeParams, Cat) {
		var catId = $routeParams.catId;
		$scope.cat = Cat.get({catId: catId});
	}
]);
