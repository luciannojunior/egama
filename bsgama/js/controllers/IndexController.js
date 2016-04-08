cgama.controller('IndexController', ['User', '$window', function (User, $window) {
    
    (function main() {
        if (!User.isLoggedIn()){
            $window.location.href = "login.html";
        }
    })();
    var usuario = {};
    
    usuario.nome = User.getName();
   
    this.usuario = usuario;
    
    this.logout = function () {
        User.logout();
        $window.location.href = "login.html";
    };
    
}]);