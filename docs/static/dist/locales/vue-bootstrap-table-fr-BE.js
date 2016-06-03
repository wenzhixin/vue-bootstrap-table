/**
 * Bootstrap Table French (Belgium) translation
 * Author: Julien Bisconti (julien.bisconti@gmail.com)
 */
(function () {
    'use strict';

    BootstrapTable.locales['fr-BE'] = {
        formatLoadingMessage: function () {
            return 'Chargement en cours...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' entrées par page';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Affiche de' + pageFrom + ' à ' + pageTo + ' sur ' + totalRows + ' lignes';
        },
        formatSearch: function () {
            return 'Recherche';
        },
        formatNoMatches: function () {
            return 'Pas de fichiers trouvés';
        }
    };

    $.extend(BootstrapTable.defaults, BootstrapTable.locales['fr-BE']);

})();
