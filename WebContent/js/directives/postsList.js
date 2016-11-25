 angular.module("appSocial").directive("postsList", function(){
	 //defino el objeto asociado a la vista(como un managed bean de jsf)
	 var definition = {
			 restrict: 'E',
			 templateUrl: 'templates/directives/postsList.html',
			 controller: 'dashboardController'
	 }
	 return definition;
 });