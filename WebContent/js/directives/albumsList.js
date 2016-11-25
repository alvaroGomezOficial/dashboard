 angular.module("appSocial").directive("albumsList", function(){
	 //defino el objeto asociado a la vista(como un managed bean de jsf)
	 var definition = {
			 restrict: 'E',
			 templateUrl: 'templates/directives/albumsList.html',
			 controller: 'dashboardController'
	 }
	 return definition;
 });
 