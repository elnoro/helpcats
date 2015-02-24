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
			when('/search', {
				templateUrl: 'partials/search.html',
				controller: 'searchCtrl'
			}).
				otherwise({
				redirectTo: '/cats'
			});
	}
]);

helpCatsApp.factory('Cat', ['$resource',
	function($resource) {
		return $resource('/cats/:catId');
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

helpCatsApp.controller('searchCtrl',
	function($scope, $http) {
		$scope.search = function () {
			$http.post('/search', {query: $scope.query}).
				success(function (data) {
					$scope.cats = data;
				})
				.error(function (data, status) {
					$scope.errorMessage = "Error " + status;
				});
		}
		$scope.cats = [];
		$scope.errorMessage = '';
	}
);

