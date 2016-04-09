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