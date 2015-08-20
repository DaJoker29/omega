(function() {

    function firebaseService () {
        var ref = new Firebase('https://zdae-omega.firebaseio.com/');

        return {
            ref: ref
        };
    }
    
    angular
        .module('omega')
        .factory('firebaseService', firebaseService);
})();