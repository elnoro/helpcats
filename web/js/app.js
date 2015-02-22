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