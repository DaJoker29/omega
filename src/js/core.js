(function() {

    function MainController () {
        var vm = this;

        vm.user = '';
    }

    angular
        .module('omega', [])
        .controller('MainController', MainController);
})();