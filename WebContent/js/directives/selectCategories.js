angular.module("appSocial").directive(
		"selectCategories",
		function() {
			var definition = {
				restrict : 'E',
				templateUrl : 'templates/directives/selectCat.html',
				controller: 'dashboardController',
				replace : true,
				scope : {
					categories : "=",
					series : "=",
					check: "="
				},
				link : function(scope, element) {
					console.log("las categorias", scope.$parent.xAxisToChart);
					

				}
			}

			return definition;
		});