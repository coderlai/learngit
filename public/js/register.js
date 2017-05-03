var app = angular.module('myApp',[]);
app.controller('register',['$scope','$http','$window',function ($scope,$http,$window) {
    $scope.doRegister = function () {
        $http({
            method:'POST',
            url:'/users/register',
            data:{username:$scope.username,email:$scope.email,password:$scope.password}
        }).then(function successCallback(response){
            console.log(response);
            alert(response.data.message);
            if(response.data.isSuccess){
                $window.location.href = '/login';
            }
        },function errorCallback(error){
            console.log(error);
        });
    }
}]);