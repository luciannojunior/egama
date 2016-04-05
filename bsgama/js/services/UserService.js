/**
 * apiRoot = "http://localhost:3000"
 * ENDPOINTS.LOGIN = "/access/login"
 * $localStorage = provides access to $window.localStorage
 */
cgama.service('User', ['$http', '$localStorage', '$q', 'jwtHelper', 'apiRoot', 'ENDPOINTS',
                     function UserService($http, $localStorage, $q, jwtHelper, apiRoot, ENDPOINTS) {
    var self = this;
    
    self.profile = {};
    
    function getUser() {
        if (self.isLoggedIn()){
            return JSON.parse($localStorage.user);
        }else{
            return {};
        }
    }
    
    this.getName = function () {
       return (self.isLoggedIn()) ? getUser().name : "";
    };
    
    this.isLoggedIn = function () {
        return typeof $localStorage.user !== 'undefined';    
    };
    
    this.login = function (login, password) {
        
        var self = this;
        
        var deferred = $q.defer();
    
        if (this.isLoggedIn()){
            
            deferred.reject("User is already logged in");
            return deferred.promise;
        }    
        
        var loginData = {
            login: login,
            password: password
        };
        
        $http.post(apiRoot+ENDPOINTS.LOGIN, loginData)
            .then(function (data) {
                
                $localStorage.token = data.data.token;
                $localStorage.user = JSON.stringify(jwtHelper.decodeToken(data.data.token));
                
                
                deferred.resolve(data.data);
            }, function (err) {
                deferred.reject(err);
            });
            
        return deferred.promise;
    };
    
    this.logout = function () {
        $localStorage.$reset();
        console.log(self.isLoggedIn());
    };

}]);