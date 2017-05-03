var app = angular.module('myApp',[]);
app.controller('myCtrl',["$scope","$http",function ($scope,$http) {
    $scope.imgSrc = '/captcha?rand='+Math.random()*1000;
    $scope.getPass = function () {
        $http({
            method:"post",
            url:'/users/getPass',
            data:{email:$scope.email,captcha:$scope.captcha}
        }).then(function (response) {
            alert(response.data.message);
        },function (error) {
            alert("系统错误");
        });
    };
    $scope.changeCaptcha = function () {
        $scope.imgSrc = '/captcha?rand='+Math.random()*1000;
    }
}]);