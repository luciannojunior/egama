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