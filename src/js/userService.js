(function() {

    function UserService ( $firebaseObject, firebaseService ) {

        var ref = firebaseService.ref;
        var usersRef = ref.child('users');
        var service = {};

        // Sign In
        function signIn ( authData ) {
            console.log( 'Sign In Successful', authData );

            var uid = authData.uid;
            service.profileRef = usersRef.child(uid).child('profile');
            
            usersRef.once('value', function( snapshot ) {
                var child = snapshot.child(uid);

                if ( child.exists() ) {
                    console.log('Profile exists');
                } else {
                    console.log('Profile doesn\'t exist, creating new profile.');
                    create ( authData );
                }
                
            });
        }
        
        // Save User
        function create ( authData ) {

            var profile = {
                uid: authData.uid,
                provider: authData.provider,
                name: authData[authData.provider].displayName
            };

            var obj = $firebaseObject(usersRef.child(authData.uid));

            obj.profile = profile;
            obj.$save().then(function(ref) {
                console.log('Successfully saved to ' + ref);
                console.log('ID: ', obj.$id);
            }, function (error) {
                console.log('Error:', error);
            });
        }

        service.signIn = signIn;
        service.create = create;

        return service;
    }
    UserService.$inject = ['$firebaseObject', 'firebaseService'];

    angular
        .module('omega')
        .factory('UserService', UserService);
})();