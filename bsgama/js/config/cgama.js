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