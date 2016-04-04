cgama.controller('MainController', ['$stateParams','User', function ($stateParams, User) {
    this.titulo = $stateParams.id;
    var usuario = new User("luciano", "12345");
    usuario.newLogin().then(function (data) {
        console.log(data);
    });
}]);