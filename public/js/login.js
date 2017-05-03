var app = angular.module("myApp",[]);
app.controller('myCtrl',["$scope","$window","$http",function ($scope,$window,$http) {
    $scope.isRemember = '1';
    $scope.$watch('isRemember',function (p1, p2, p3) {
        console.log(p1);
    });
    $scope.login = function () {
        $http({
            method:'POST',
            url:'/users/login',
            data:{email:$scope.email,password:$scope.password,isRemember:$scope.isRemember}
        }).then(function successCallback(response) {
            alert(response.data.message);
            if(response.data.isSuccess){
                $window.location.href = '/';
            }
        },function errorCallback(error) {
            console.log(error);
            alert('系统繁忙，登录失败！');
        });
    }
}]);