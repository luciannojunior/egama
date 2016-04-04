cgama.controller('RelatoriosController', ['$stateParams','User', function ($stateParams, User) {
    console.log(User.isAdmin());
}]);