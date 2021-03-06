/**
 * apiRoot = "http://localhost:3000"
 * ENDPOINTS.LOGIN = "/access/login"
 * $localStorage = provides access to $window.localStorage
 */
cgama.service('User', ['HttpService', '$localStorage', 'jwtHelper', 'ENDPOINTS', 'lodash', '$q',
                     function UserService(HttpService, $localStorage, jwtHelper, ENDPOINTS, _, $q) {
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
        return !(_.isUndefined($localStorage.user));    
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
        
        HttpService.request({
            method: 'post',
            uri: ENDPOINTS.LOGIN,
            body: loginData
        }).then(function (token) {
            //'token' expected to be a token string
            $localStorage.token = token;
            var user = JSON.stringify(jwtHelper.decodeToken(token));
            $localStorage.user = user;
            
            deferred.resolve(JSON.parse(user));
        }, function (err) {
            deferred.reject(err); 
        });

        return deferred.promise;
    };
    
    this.logout = function () {
        $localStorage.$reset();
    };

}]);