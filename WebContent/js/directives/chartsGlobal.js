 angular.module("appSocial").directive("chartsGlobal", function(){
	 var definition = {
			 restrict: 'E',
			 templateUrl: 'templates/directives/chartsGlobal.html',
			 controller: 'dashboardController'
	 }
	 return definition;
 });
 