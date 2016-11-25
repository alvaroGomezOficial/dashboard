function GeneralResources($http, $q, $rootScope, baseUrl) {
  this.getSection = function (section) {
   var defered = $q.defer();
   var promise = defered.promise;

   $http({
    method: 'GET',
    url: baseUrl + section,
   }).success(function (data, status, headers, config) {
    defered.resolve(data);
   }).error(function (data, status, headers, config) {
    defered.reject(status);
   });

   return promise;

  };
}

function generalResourcesProvider() {
  var base;
  this.setBaseUrl = function (baseUrl) {
   base = baseUrl;
  };

	this.$get = ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
		return new GeneralResources($http, $q, $rootScope, base);
	} ];
}

angular.module("appSocial").provider("generalResources", generalResourcesProvider);

angular.module("appSocial").config(['generalResourcesProvider','baseUrl',
		function(generalResourcesProvider, baseUrl ) {
			generalResourcesProvider.setBaseUrl(baseUrl);
} ]);
