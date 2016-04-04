cgama.controller('MainController', ['$stateParams','User', function ($stateParams, User) {
    this.titulo = $stateParams.id;
    
    User.login("luciano", "12345").then(function (data) {
        console.log("logged");
    }, function (err) {
        console.log("erro");
        console.log(err);
    });
    
    
}]);