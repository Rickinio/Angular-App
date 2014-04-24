var app = angular.module("Sourcing", ["ngCookies", 'ngRoute'])
    .config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "Templates/Login.html",
        controller:"LoginCtr"
    })
    .when("/Products", {
        templateUrl: "Templates/Products.html",
        controller: "LoginCtr"
    })
}])
    .run(function ($rootScope, $location) {
        // register listener to watch route changes
        $rootScope.$on( "$routeChangeStart", function(event, next, current) {
            if ( $rootScope.authenticated == false ) {
                // no logged user, we should be going to #login
                if ( next.path == "/" ) {
                    // already going to #login, no redirect needed
                } else {
                    // not going to #login, we should redirect now
                    $location.path("/");
                }
            }         
        });
    })


app.controller("LoginCtr", ["$scope", "$http", "$cookies", "$rootScope", "$location", function ($scope, $http, $cookies, $rootScope, $location) {
    $scope.loginData = {};
    $rootScope.authenticated = false;

    $scope.Submit = function () {

        var url = "http://xxx.com/SL?username=" + $scope.loginData.username + "&password=" + $scope.loginData.password + "&callback=JSON_CALLBACK";

        $http.jsonp(url)
            .success(function (data) {
                console.log(data.login);
                if (data.login == 1){
                    $rootScope.authenticated = true;
                    $location.path("/Products");
                }
                if ($rootScope.authenticated == true) {
                    $cookies.auth_name = $scope.loginData.username;
                    $cookies.auth_pass = $scope.loginData.password;
                }
            })
            .error(function () {
                console.log("error");
            });
    }

    $scope.Start = function () {
        if (($cookies.auth_name != undefined) && ($cookies.auth_pass != undefined)) {
            console.log("start");
            $rootScope.authenticated = true;
            $location.path("/Products");
        }
    }

}]);


app.controller("ProductCtr", ["$rootScope", "$scope", "$http", "$cookies", function ($rootScope,$scope,$http,$cookies) {
    $scope.Photos = [];

    $scope.Load = function (category) {
        console.log(category);
        var url = "http://xxx.com/SD?category=" + category + "&callback=JSON_CALLBACK";

        $http.jsonp(url)
           .success(function (data) {
               console.log(data);
               a = data.Photos;
               $scope.Photos = data.Photos;
           })
    }
}])