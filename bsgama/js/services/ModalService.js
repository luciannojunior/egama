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