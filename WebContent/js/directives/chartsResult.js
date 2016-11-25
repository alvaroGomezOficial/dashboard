angular.module('appSocial').directive('chartsResult', function () {
  var definition = {
    restrict: 'E',
    templateUrl: 'templates/directives/chartsResult.html',
    replace: true,
    scope: {
      data: '=',
      series: '=',
    },
    link: function (scope, element) {
      scope.chart = new Highcharts.Chart(element[0], scope.data);
      scope.$watch('data', function (newValue) {
        scope.chart.series[0].setData(newValue.series[0].data, true);
        scope.chart.series[1].setData(newValue.series[1].data, true);
        scope.chart.series[2].setData(newValue.series[2].data, true);
        scope.chart.series[3].setData(newValue.series[3].data, true);
      }, true);
    },
  };
  return definition;
});
