angular.module('appSocial').factory('userResourcesService', function (generalResources) {
  return {
    getUserResource: function (userId, resource) {
      var result = new Array;
      // me traigo el recurso
      generalResources.getSection(resource).then(function (res) {
          //itero para traerme solo los resultados del usuario
          $.each(res, function (index, element) {
            if (element.userId == userId) {
              result.push(element);
            }
          });
        },
        function (responseError) {
          console.log('se ha producido un error' + responseError);
        }
      ); 
      return result;
    }, 
  };  
});
   