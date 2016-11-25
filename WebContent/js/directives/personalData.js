angular.module('appSocial').directive('personalData', function () {
  var definition = {
    restrict: 'E',
    templateUrl: 'templates/directives/personalData.html',
    controler: 'dashboardController',
  };
  return definition;
});
