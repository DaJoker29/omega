(function() {

    function MainController () {
        var vm = this;

        // vm.user = {
        //     'displayName': 'Dewitt'
        // };


        $(function() {
            if(vm.user) {
                console.log(vm.user);
            } else {
                $('#signin').modal('show');
            }
        });
    }

    angular
        .module('omega', [])
        .controller('MainController', MainController);
})();