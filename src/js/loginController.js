(function() {

    function LoginController ($scope, UserService, firebaseService) {
        var vm = this;
        var ref = firebaseService.ref;

        vm.authenticate = function ( provider ) {
            ref.authWithOAuthPopup( provider, function ( error, authData ) {
                if(error) {
                    if(error.code === 'TRANSPORT_UNAVAILABLE') {
                        ref.authWithOAuthRedirect( provider, function ( error, authData ) {
                            UserService.signIn( authData );
                        });
                    }
                } else if ( authData ) {
                    UserService.signIn( authData );
                }
            });
        };
        
    }
    LoginController.$inject = ['$scope', 'UserService', 'firebaseService'];

    angular
        .module('omega')
        .controller('LoginController', LoginController);
})();