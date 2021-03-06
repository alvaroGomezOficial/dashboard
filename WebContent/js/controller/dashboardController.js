angular
		.module('appSocial')
		.controller('dashboardController', [
						'$scope',
						'generalResources',
						'userResourcesService',
						function ($scope, generalResources, userResourcesService) {

        // llamo al servicio para traer los usuarios
        generalResources
          .getSection('/users')
          .then(
            function (users) {
              $scope.usuarios = users;
              // usuario por defecto
              $scope.currentUser = users[0];
            },

            function (responseError) {
              console.log('No se pueden obtener los usuarios. Estado HTTP:'
                + responseError);
            });

        // llamo al servicio para traerme los posts
        generalResources
          .getSection('/posts')
          .then(
            function (posts) {
              $scope.posts = posts;
              var usersInPost = new Array();
              var postsByUser = {};
              var totalsPost = new Array();
              $.each(
                  $scope.posts,
                  function (index, element) {
                    if (!postsByUser
                      .hasOwnProperty(element.userId)) {
                      postsByUser[element.userId] = 1;
                    } else {
                      postsByUser[element.userId]++;
                    }
                  });

              for (_numPost in postsByUser) {
                totalsPost.push(postsByUser[_numPost]);
              }
              //seteo los post al chart
              $scope.setPostsTotalsToChart(totalsPost);
            },

            function (responseError) {
              console.log('No se pueden obtener los posts. Estado HTTP:'
                + responseError);
            });

        // llamo al servicio para traerme los albums
        generalResources 
          .getSection('/albums')
          .then(
            function (albums) {
              $scope.albums = albums;
              var usersInalbums = new Array();
              var albumsByUser = {};
              var totalsAlbums = new Array();
              $.each(
                  $scope.albums,
                  function (index,
                    element) {
                    usersInalbums
                      .push(element.userId);
                    if (!albumsByUser
                      .hasOwnProperty(element.userId)) {
                      albumsByUser[element.userId] = 1;
                    } else {
                      albumsByUser[element.userId]++;
                    }
                  });

              for (_numAlbums in albumsByUser) {
                totalsAlbums.push(albumsByUser[_numAlbums]);
              }

              //seteo los albums al chart
              $scope.setAlbumsTotalsToChart(totalsAlbums);
            },

            function (responseError) {
              console.log('No se pueden obtener los albums. Estado HTTP:'
                + responseError);
            });

        // metodo para el menu de seleccion de usuarios
        $scope.selectUser = function (user) {
          $scope.currentUser = user;
        };

        $scope.original_ser;
        $scope.toggle_ser = null;
        $scope.toggle_cat = null;
        $scope.xAxisToChart = new Array();
        // metodo del controlador que añade o quita usuarios
        // de la gráfica
        $scope.toggleCategories = function (cat, ser, isChecked) {
          if ($scope.original_ser === undefined) {
            $scope.original_ser = ser;
          }

          if ($scope.toggle_cat == null) {
            $scope.toggle_cat = new Array();
          }

          var indexChart = $('#highchart').data(
            'highchartsChart');
          var chart = Highcharts.charts[indexChart];
          var index_o = $scope.xAxisToChart.indexOf(cat);

          var final = new Array();
          if (!isChecked) {
            for (var i = 0; i < ser.length; i++) {
              if (chart.series[i].visible != false) {
                var temp = $scope.original_ser[i].data
                  .slice();
                if ($scope.toggle_ser == null) {
                  $scope.toggle_ser = {};
                  $.each(
                      $scope.original_ser[i].data,
                      function (index,
                        element) {
                        if (!$scope.toggle_ser
                          .hasOwnProperty(index)) {
                          $scope.toggle_ser[index] = temp[index];
                        } else {
                          $scope.toggle_ser[index]++;
                        }
                      });
                }

                $scope.toggle_ser[index_o] = -1;
                var finalArray = new Array();
                $.each($scope.toggle_ser, function (
                  index, element) {
                  if (element != -1) {
                    finalArray.push(element);
                  }
                });

                chart.series[i].setData(finalArray);
              }
            }
          } else {
            for (var i = 0; i < ser.length; i++) {
              if (chart.series[i].visible != false) {
                $scope.toggle_ser[index_o] = $scope.original_ser[i].data[3];
                var finalArray = new Array();
                $.each($scope.toggle_ser, function (
                  index, element) {
                  if (element != -1) {
                    finalArray.push(element);
                  }

                });

                chart.series[i].setData(finalArray);
              }
            }
          }

          if ($scope.toggle_cat.indexOf(cat) !== -1) {
            $scope.toggle_cat.splice(cat, 1);
          } else {
            $scope.toggle_cat.push(cat);
          }

          var arrayCategoriesFinal = new Array();
          $.each($scope.xAxisToChart,
            function (index, element) {
              if ($.inArray(element,
                $scope.toggle_cat) == -1) {
                arrayCategoriesFinal
                  .push(element);
              }
            });

          chart.xAxis[0].setCategories(arrayCategoriesFinal);
        };

        // metodo para setear los posts al chart
        $scope.setPostsTotalsToChart = function (postsTotals) {
          $scope.chartData.series[0].data = postsTotals;
          $scope.chartData.series[2].data = postsTotals;
        };

        // metodo para setear los albums al chart
        $scope.setAlbumsTotalsToChart = function (albumsTotals) {
          $scope.chartData.series[1].data = albumsTotals;
          $scope.chartData.series[3].data = albumsTotals;
        };
        // si cambia el usuario refresco valores del dashboard
        $scope.$watch('currentUser', function (oldVal,
             newVal) {
              if (oldVal === newVal) {
                return;
              }

              if ($scope.xAxisToChart.length == 0) {
                $scope.setCategories();
              }

              $scope.refreshValues();
            });

        // metodo para refrescar el dashboard si cambia el usuario
        $scope.refreshValues = function () {
          $scope.userAlbums = userResourcesService
            .getUserResource($scope.currentUser.id,
              '/albums');
          $scope.userPosts = userResourcesService
            .getUserResource($scope.currentUser.id,
              '/posts');
        };

        // init chart
        $scope.chartData = {
          chart: {
            defaultSeriesType: 'column',
          },
          title: {
            text: 'Posts y albums de los Usuarios',
          },
          subtitle: {
            text: 'pulsa en cada usuario para tener gráficos detallados',
          },
          xAxis: {
            categories: [],

          },
          yAxis: {
            title: {
              text: 'Totales',
            },
          },
          series: [{
            name: 'Posts',
            data: [],
            visible: false,
          }, {
            name: 'Albums',
            data: [],
            visible: false,
          }, {
            name: 'Posts and Albums',
            data: [],
          }, {
            linkedTo: ':previous',
            name: 'Albums',
            data: [],
          }, ],
        };

        // metodo que setea las categorias al chart
        $scope.setCategories = function () {
          $.each($scope.usuarios,
            function (index, element) {
              $scope.xAxisToChart
                .push(element.name);

            });

          $scope.chartData.xAxis.categories = $scope.xAxisToChart;
        };
      },
]);
