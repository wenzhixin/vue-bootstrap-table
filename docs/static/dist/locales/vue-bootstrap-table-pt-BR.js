/**
 * Bootstrap Table Brazilian Portuguese Translation
 * Author: Eduardo Cerqueira<egcerqueira@gmail.com>
 * Update: João Mello<jmello@hotmail.com.br>
 */
(function () {
    'use strict';

    BootstrapTable.locales['pt-BR'] = {
        formatLoadingMessage: function () {
            return 'Carregando, aguarde...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' registros por página';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Exibindo ' + pageFrom + ' até ' + pageTo + ' de ' + totalRows + ' linhas';
        },
        formatSearch: function () { 
            return 'Pesquisar';
        },
        formatRefresh: function () { 
            return 'Recarregar';
        },
        formatToggle: function () { 
            return 'Alternar';
        },
        formatColumns: function () { 
            return 'Colunas';
        },
        formatPaginationSwitch: function () { 
            return 'Ocultar/Exibir paginação';
        },
        formatNoMatches: function () {
            return 'Nenhum registro encontrado';
        }
    };

    $.extend(BootstrapTable.defaults, BootstrapTable.locales['pt-BR']);

})();
