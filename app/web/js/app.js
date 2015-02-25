var helpCatsApp = angular.module('helpCatsApp', ['ngRoute', 'ngResource']);

helpCatsApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/cats', {
				templateUrl: 'partials/index.html',
				controller: 'catsCtrl'
			}).
			when('/cats/page/:pageId', {
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

helpCatsApp.controller('catsCtrl', ['$scope', '$routeParams', 'Cat', function ($scope, $routeParams, Cat) {
	$scope.pagination = {};
	var pageId = ('pageId' in $routeParams) ? $routeParams.pageId : 1;
	Cat.query({page: pageId}, function (cats, headers) {
		var count = headers('X-Pagination-Page-Count');
		$scope.pages = getPages(parseInt(count, 10));
		$scope.catChunks = splitArrayIntoChunks(cats, 3);
	});
	var splitArrayIntoChunks = function (originalArray, chunkSize) {
		var chunks = [];
		for (var i = 0; i < originalArray.length; i += chunkSize) {
		    chunks.push(originalArray.slice(i, i + chunkSize));
		};
		return chunks;
	};
	var getPages = function (count) {
		return Array.apply(
			null, Array(count)).map(function (_, i) {return i+1;}
		);
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
					$scope.errorMessage = '';
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

