cgama.controller('MainController', ['$stateParams','User', function ($stateParams, User) {
    this.titulo = $stateParams.id;
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
}]);