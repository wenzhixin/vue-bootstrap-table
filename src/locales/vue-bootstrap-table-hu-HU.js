/**
 * Bootstrap Table Hungarian translation
 * Author: Nagy Gergely <info@nagygergely.eu>
 */
(function () {
    'use strict';

    BootstrapTable.locales['hu-HU'] = {
        formatLoadingMessage: function () {
            return 'Betöltés, kérem várjon...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' rekord per oldal';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Megjelenítve ' + pageFrom + ' - ' + pageTo + ' / ' + totalRows + ' összesen';
        },
        formatSearch: function () {
            return 'Keresés';
        },
        formatNoMatches: function () {
            return 'Nincs találat';
        },
        formatPaginationSwitch: function () {
            return 'Lapozó elrejtése/megjelenítése';
        },
        formatRefresh: function () {
            return 'Frissítés';
        },
        formatToggle: function () {
            return 'Összecsuk/Kinyit';
        },
        formatColumns: function () {
            return 'Oszlopok';
        },
        formatAllRows: function () {
            return 'Összes';
        }
    };

    $.extend(BootstrapTable.defaults, BootstrapTable.locales['hu-HU']);

})();
