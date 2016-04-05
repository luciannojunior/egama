cgama.controller('LoginController', ['User', '$window', 'ngDialog', 'ERRORS', function (User, $window, ngDialog, ERRORS) {
    
    //   (function main() {
    //     if (User.isLoggedIn()){
    //         $window.location.href =   "index.html";                  
    //     }
    //   })();
    
    (function main() {
        
        
    })();
    
      var self = this;
      
      self.usuario = {};
      self.erro = false;
      self.sucesso = false;
      self.loading = false;
      
      self.login = function (usuario) {
          
          if (typeof usuario === 'undefined'){
              self.erro = true;
              return;
          }
          
          self.loading = true;
          
          User.login(usuario.login, usuario.password).then(
              function (data) {
                  console.log(data);
                  ngDialog.open({
                        template: "<h1>Sucesso ao logar</h1><p>Bem-vindo(a) <b>"+data.name+"</b>, você será redirecionado!</p>",
                        plain: true,
                        className: 'ngdialog-theme-default'
                    }).closePromise.then(function () {
                        self.loading = false;
                    });
                //   $window.location.href =   "index.html";
              },
              function (err) {
                  ngDialog.open({
                        template: "<h1>"+ERRORS.LOGIN+"</h1><p>"+err+"</p>",
                        plain: true,
                        className: 'ngdialog-theme-erro'
                    }).closePromise.then(function () {
                        
                        self.loading = false;
                    });
                  
              }
          );
      };
      
}]);