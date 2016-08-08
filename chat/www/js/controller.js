angular.module('chat')

.controller('LoginCtrl', function ($scope, $location) {

    $scope.user = '';
    $scope.message = '';

    $scope.onLoginClicked = function () {
        $location.url('/main/' + $scope.user);
    }
})

.controller('MainCtrl', function ($scope, $stateParams, $ionicScrollDelegate,
    socket) {
    var user = $stateParams.user;
    $scope.listMessage = [];

    $scope.onMessageSendClicked = function () {
        var obj = {
            sender: user,
            message: $scope.message
        }

        socket.emit('sendMessage', obj);
        addMessage(obj);
        clearMessage();
    }

    socket.on('receiveMessage', function (obj) {
        addMessage(obj);
    })

    function clearMessage() {
        $scope.message = '';
    }

    function addMessage(obj) {
        $scope.listMessage.push(obj);

        $ionicScrollDelegate.scrollBottom();
    }
})