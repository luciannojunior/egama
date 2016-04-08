/**
 * apiRoot = "http://localhost:3000"
 * ENDPOINTS.LOGIN = "/access/login"
 * $localStorage = provides access to $window.localStorage
 */
cgama.service('MainService', ['HttpService', 'lodash', '$q',
                     function MainService(HttpService, _, $q) {
    var self = this;
    
    this.appInfo = {};
    
    self.getInfo = function () {
        var deferred = $q.defer();
        
        HttpService.request({
            method: 'get',
            uri: '/api/info'
        }).then(function (info) {
            deferred.resolve(info);
        }, function (err) {
            deferred.reject(err);
        });
          
        return deferred.promise;
    };

}]);