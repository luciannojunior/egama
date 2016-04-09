cgama.service('HttpService', ['$http', '$q', 'apiRoot', 'lodash', '$localStorage',function HttpService($http, $q, root, _, $localStorage) {
    var METHODS_ALLOWED = ['post', 'get', 'put', 'patch', 'delete'];
    
    // var config = {
    //     method: "post",
    //     uri: "/access/login",
    //     body: {login: "luciano", password: "12345"}
    // };
    function getToken(){
        return ($localStorage.token) ? $localStorage.token : "";
    }
    
    this.request = function (config) {
        var deferred = $q.defer();
        
        _.forEach(config, function (value, key) {
            if (_.isUndefined(value) || _.isEmpty(value)){
                deferred.reject("Invalid configuration for HTTP Request");
                return deferred.promise;
            }
        });
        
        if (!(_.includes(METHODS_ALLOWED, _.toLower(config.method)))){
            deferred.reject("Invalid HTTP method");
            return deferred.promise;
        }
        
        var accessToken = getToken();
        
        $http({
            method: config.method,
            url: (root+config.uri),
            data: config.body || {},
            headers: {
                'Authorization': 'JWT '+accessToken
            }
        }).then(
            function (output) {
                                
                var data = output.data;
                //TODO: Usar essa verificação para passar um evento ao $rootScope
                //      e redirecionar em outro local
                if (output.status == 403){
                    $window.location.href =   "login.html";
                    deferred.reject("Unauthorized");
                }else if (_.isUndefined(data.err)){
                    deferred.reject("Internal error 17");
                }else if (data.err[0]){
                    deferred.reject(data.err[1]);
                }else{
                    deferred.resolve(data.output);
                }
            },
            function (err) {
                deferred.reject(err);
            }
        );
        
        return deferred.promise;   
    };
    
}]);