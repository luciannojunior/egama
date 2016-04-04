cgama.controller('RelatoriosController', ['$stateParams','User', function ($stateParams, User) {
    if(User.isLoggedIn()){
        this.titulo = User.getName();
    }else{
        this.titulo = "OI";
    }
}]);