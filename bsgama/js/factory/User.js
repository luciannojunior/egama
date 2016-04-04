cgama.factory('User', ['$http', '$localStorage', function UserFactory($http, $localStorage) {
    var User = function(login, password){
        this.login = login;
        this.password = password;
        this.admin = false;
        this.nome = "";
        this.avatarUrl = "";
    }
    
    User.prototype.newLogin = function () {
        
        var self = this;
        
        return $http.post('http://localhost:3000/access/login', self)
        .then(
            function(response){
                
                self = response.data;
                    
                $localStorage.token = self.token;
                
                return response;
        }, function (err) {
            console.log(err);
            return err;
        });
        
        
    };
    
    User.prototype.isAdmin = function () {
        return this.profile.nome;
    }
    
    
    return User;
}]);