var app = angular.module("appSocial", []);

// CONSTANTES
app.constant("baseUrl", "https://jsonplaceholder.typicode.com");

app.run(['$rootScope', function($rootScope) {
	console.log("run")
	 //creo que no necesito los rootScope
	  $rootScope.usuarios=null;
	  $rootScope.userPosts=null;
	  $rootScope.userAlbums=null;
	  $rootScope.currentUser=null;
}]);
