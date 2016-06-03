/**
 * Bootstrap Table Greek translation
 * Author: giannisdallas
 */
(function () {
    'use strict';

    BootstrapTable.locales['el-GR'] = {
        formatLoadingMessage: function () {
            return 'Φορτώνει, παρακαλώ περιμένετε...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' αποτελέσματα ανά σελίδα';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Εμφανίζονται από την ' + pageFrom + ' ως την ' + pageTo + ' από σύνολο ' + totalRows + ' σειρών';
        },
        formatSearch: function () {
            return 'Αναζητήστε';
        },
        formatNoMatches: function () {
            return 'Δεν βρέθηκαν αποτελέσματα';
        }
    };

    $.extend(BootstrapTable.defaults, BootstrapTable.locales['el-GR']);

})();
