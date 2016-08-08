angular.module('chat')

.factory('socket', function ($rootScope) {
    var socket = io.connect('http://192.168.1.105:1000/');

    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
})

.factory('socketService', function (socket) {

    function login(obj) {
        socket.emit('login', obj);
    }

    function sendSingleMessage(obj) {
        socket.emit('sendSingleMessage', obj);
    }

    function sendGroupMessage(obj) {
        socket.emit('sendGroupMessage', obj);
    }

    function sendBroadcastMessage(obj) {
        socket.emit('sendBroadcastMessage', obj);
    }

    function sendCreateGroup(obj) {
        socket.emit('sendCreateGroup', obj);
    }

    return {
        login: login,
        sendSingleMessage: sendSingleMessage,
        sendGroupMessage: sendGroupMessage,
        sendBroadcastMessage: sendBroadcastMessage,
        sendCreateGroup: sendCreateGroup
    }
})