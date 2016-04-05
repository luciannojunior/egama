cgama.controller('LoginController', ['User', '$window','ModalService', function (User, $window, ModalService) {
    
    //   (function main() {
    //     if (User.isLoggedIn()){
    //         $window.location.href =   "index.html";                  
    //     }
    //   })();
    
    (function main() {
        ModalService.showModal({
        template: "<div>Fry lives in {{futurama.city}}</div>",
        controller: function() {
            this.city = "New New York";
        }
        });    
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