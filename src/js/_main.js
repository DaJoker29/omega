(function() {

    angular.module('omega', ['firebase']);

    function MainController ($scope, $firebaseObject, $firebaseAuth, firebaseService, UserService) {
        var vm = this;
        var ref = firebaseService.ref;
        var auth = $firebaseAuth(ref);

        angular.element('#login').modal('show');

        auth.$onAuth(function ( authData ) {
            if( authData && UserService.profileRef ) {
                console.log('Authenticating & signing in');
                bindProfile( authData );                
            } else if ( authData ) {
                console.log('Authenticated, now signing in');
                UserService.signIn( authData );
                bindProfile ( authData );
            } else {
                console.log('Not Logged in');
            }
        });

        function bindProfile ( authData ) {
            angular.element('#login').modal('hide');
            var Profile = $firebaseObject(UserService.profileRef);
            Profile.$bindTo($scope, 'profile');
        }

    }
    MainController.$inject = ['$scope', '$firebaseObject', '$firebaseAuth', 'firebaseService', 'UserService'];

    angular
        .module('omega')
        .controller('MainController', MainController);
})();