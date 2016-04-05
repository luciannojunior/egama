cgama.controller('LoginController', ['User', '$window',  function (User, $window) {
    
      (function main() {
        if (User.isLoggedIn()){
            $window.location.href =   "index.html";                  
        }
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
                  self.loading = false;
                  self.sucesso = true;
                //   $window.location.href =   "index.html";
              },
              function (err) {
                  console.log(err);
                  self.erro = true;
                  usuario = {};
                  self.loading = false;
              }
          );
      };
      
}]);