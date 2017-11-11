var angular = require('angular');

// require('./api');

var app = angular.module('app', [
    require('ng-admin'),
]);

// custom API flavor
var apiFlavor = require('./api_flavor');
app.config(['RestangularProvider', apiFlavor.requestInterceptor]);
app.config(['RestangularProvider', apiFlavor.responseInterceptor]);

// custom 'amount' type
app.config(['NgAdminConfigurationProvider', 'FieldViewConfigurationProvider', function(nga, fvp) {
    // nga.registerFieldType('amount', require('./types/AmountField'));
    // fvp.registerFieldView('amount', require('./types/AmountFieldView'));
}]);

// custom directives
app.directive('dashboardSummary', require('./dashboard/dashboardSummary'));
// app.directive('zoomInModal', require('./products/zoomInModal'));

// custom controllers
// app.controller('username', ['$scope', '$window', function($scope, $window) { // used in header.html
//     $scope.username =  $window.localStorage.getItem('email');	
// }]);

// custom states (pages)
// app.config(['$stateProvider', require('./segments/segmentsState')]);

app.config(['NgAdminConfigurationProvider', function (nga) {
    
	var env = process.env.NODE_ENV;
	var api_url = '/api/';	
	if(env === 'development') api_url = process.env.API_URL;	

	// create the admin application
    var admin = nga.application('Admin').baseApiUrl(api_url);
	
    // add entities
	admin.addEntity(nga.entity('users'));    

    // configure entities);
	require('./users/config')(nga, admin);	

    admin.dashboard(require('./dashboard/config')(nga, admin));
    admin.header(require('./header.html'));
    admin.menu(require('./menu')(nga, admin));

    // attach the admin application to the DOM and execute it
    nga.configure(admin);
}]);

/**
 *   get images or file 
**/
app.directive('apiImg', ['$http', '$compile', function ($http, $compile) {
    return {
        restrict: 'EA',
        scope: { url: '&' },
        link: function (scope, element) {                      
            var childElement = '등록된 사진이 없습니다.';
            if(scope.url() != null) childElement = '<img src="'+process.env.FILE_URL+scope.url()+'" width="360"></img>'                        
            element.append(childElement);
            $compile(element.contents())(scope);
        }
    };
}]);