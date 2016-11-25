angular.module("appSocial").factory( "userResourcesService" , function(generalResources) {
	return {
		getUserResource: function(userId, resource) {
			var result = new Array;
			generalResources.getSection(resource).then(
					function(albums) {
						
						
						$(function(){
						    $.each(albums, function(index, element) {
						    	if(element.userId == userId) {
						    		result.push(element);
						    	}
						    	 
						    });
						});
					},
					function(responseError) {
//						console.log("se ha producido un error" + responseError);
					}
			);
			
			return result;
		}
	}
});
