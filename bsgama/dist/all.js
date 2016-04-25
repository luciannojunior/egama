  
//Initialize the angular app
var cgama = angular.module('cgama', ['ui.router',
                                     'ngStorage',
                                     'angular-jwt',
                                     'ngLodash',
                                     'ngDialog']);

cgama.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {
  
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('main', {
      url: "/",
      templateUrl: "view/main.html",
      controller: 'MainController as mainCtrl'
    })
    .state('aluno',{
        url: "/aluno",
        templateUrl: "view/aluno.html"
    })
    .state('relatorios',{
        url: "/relatorios",
        templateUrl: "view/relatorios.html",
        controller: 'RelatoriosController as reportCtrl'        
    });
    
    
}]);


cgama.value('apiRoot', 'http://localhost:3000');

cgama.constant('ENDPOINTS', {
    "LOGIN": "/access/login",
    "STUDENT": "/students"
});

cgama.constant('ERRORS', {
    "LOGIN": "Erro ao logar",
    "STUDENT": "/students"
});
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
cgama.service('Modal', ['ngDialog', function ModalService(ngDialog) {
    
    function _sucesso(msg) {
        return ngDialog.open({
                        template: msg,
                        plain: true,
                        className: 'ngdialog-theme-default'
        });
    }
    
    function _erro(msg) {
        return ngDialog.open({
                        template: msg,
                        plain: true,
                        className: 'ngdialog-theme-erro'
        });
    }
    
    return {
        sucesso: _sucesso,
        erro: _erro
    };
}]);
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
cgama.controller('LoginController', ['User', '$window', 'Modal', 'ERRORS', function (User, $window, Modal, ERRORS) {
    
      var self = this;
      
      (function main() {
        if (User.isLoggedIn()){
            $window.location.href =   "index.html";                  
        }
      })();
  
      self.loading = false;
      
      self.login = function (usuario) {
          
          usuario = usuario || {};
          self.loading = true;
          
          User.login(usuario.login, usuario.password).then(
              function (data) {
                  self.loading = false;
                                  
                  Modal.sucesso("<h1>Sucesso ao logar</h1><p>Bem-vindo(a) <b>"+data.name+"</b>, você será redirecionado!</p>");
                                    
                  setTimeout(function () {
                      $window.location.href =   "index.html";
                  }, 2000);
                    
              },
              function (err) {
                  self.loading = false;
                  
                  Modal.erro("<h1>"+ERRORS.LOGIN+"</h1><p>"+err+"</p>");
              }
          );
      };
      
}]);
cgama.controller('MainController', ['$stateParams','User', 'MainService', function ($stateParams, User, MainService) {
    
    var self = this;
    
    // TODO: Encapsular manipulação de datas em um Factory
    function dataBR() {
        var d = new Date();
        var meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro' ];
        var dias = ['Segunda-Feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-Feira', 'Sábado', 'Domingo'];
        var output = "Hoje é "+dias[d.getDay()-1]+", ";
        output+= d.getDate().toString() + " de " + meses[d.getMonth()] + " de " + d.getFullYear().toString();
        return output;
    }
    
    this.date = dataBR();
    
    this.info = {};
    
    (function main(){
        MainService.getInfo().then(
            function (info) {
                self.info = info;           
            },
            function (err) {
                console.log(err);
            }
        );
    })();
    
    
}]);
cgama.controller('RelatoriosController', ['$stateParams','User', function ($stateParams, User) {
    
}]);