<template>
<div class="bootstrap-table">
    <div class="fixed-table-toolbar">
        <div class="bs-bars" :class="'pull-'+local.options.toolbarAlign">
            <slot></slot>
        </div>
        <div class="columns btn-group"
        :class="['columns-'+local.options.buttonsAlign, 'pull-'+local.options.buttonsAlign]">
            <button v-if="local.options.showPaginationSwitch"
                :class="['btn', 'btn-'+local.options.buttonsClass, 'btn-'+local.options.iconSize]"
                type="button" name="paginationSwitch"
                :title="local.options.formatPaginationSwitch()"
                @click="togglePagination">
                <i :class="[local.options.iconsPrefix, paginationSwitchIcon]"></i>
            </button>
            <button v-if="local.options.showRefresh"
                :class="['btn', 'btn-'+local.options.buttonsClass, 'btn-'+local.options.iconSize]"
                type="button" name="refresh"
                :title="local.options.formatRefresh()"
                @click="refresh">
                <i :class="[local.options.iconsPrefix, local.options.icons.refresh]"></i>
            </button>
            <button v-if="local.options.showToggle"
                :class="['btn', 'btn-'+local.options.buttonsClass, 'btn-'+local.options.iconSize]"
                type="button" name="toggle"
                :title="local.options.formatToggle()"
                @click="toggleView">
                <i :class="[local.options.iconsPrefix, local.options.icons.toggle]"></i>
            </button>
            <div v-if="local.options.showColumns" class="keep-open btn-group"
                :title="local.options.formatColumns()">
                <button type="button" data-toggle="dropdown"
                    class="btn dropdown-toggle"
                    :class="['btn-'+local.options.buttonsClass, 'btn-'+local.options.iconSize]">
                    <i :class="[local.options.iconsPrefix, local.options.icons.columns]"></i>
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" role="menu">
                    <li v-for="(column, i) in fieldColumns" @click.stop>
                        <label v-if="!(column.radio || column.checkbox || local.options.cardView && !column.cardVisible)">
                            <input type="checkbox" :data-field="column.filed"
                                :disabled="toggleColumnsCount <= local.options.minimumCountColumns && column.visible"
                                v-model="column.visible"> {{column.title}}
                        </label>
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="local.options.search" class="search"
        :class="'pull-'+local.options.searchAlign">
            <input class="form-control"
            :class="'input-'+local.options.iconSize"
            type="text" :placeholder="local.options.formatSearch()"
            v-model="searchText" @keyup="search($event)">
        </div>
    </div>
    <div class="fixed-table-container"
        :style="{'padding-bottom': (local.options.height ? view.headerHeight : 0) + 'px', height: local.options.height + 'px'}">
        <div class="fixed-table-header" v-if="local.options.showHeader && !local.options.cardView && local.options.height">
            <table :class="local.options.classes">
                <thead>
                    <tr v-for="_columns in local.columns">
                        <th v-if="!local.options.cardView && local.options.detailView"
                            class="detail" rowspan="columns.length">
                            <div class="fht-cell"></div>
                        </th>
                        <template v-for="column in _columns">
                            <!-- hcc v-html:title="column.titleTooltip" -->
                        <th v-if="column && !(!column.visible || local.options.cardView && !column.cardVisible)"
                            v-html:title="column.titleTooltip"
                            :class="[{'bs-checkbox': column.checkbox || column.radio}, column.class]"
                            :style="column.style"
                            :rowspan="column.rowspan"
                            :colspan="column.colspan"
                            :data-field="column.field"
                            tabindex="0">
                            <div class="th-inner"
                                :class="[{sortable: local.options.sortable && column.sortable},
                                (local.options.sortable && column.sortable) ? (local.options.sortName == column.field ? local.options.sortOrder : 'both') : '']"
                                @click="onSort(column)"
                                @keypress.enter="onSort(column)">

                                <input v-if="column.checkbox && !local.options.singleSelect && local.options.checkboxHeader"
                                    name="btSelectAll" type="checkbox" v-model="selected.all"
                                    @change="onCheckAllChange">

                                <template v-if="!column.checkbox && !column.radio">
                                {{column.title}}
                                </template>
                            </div>
                            <div class="fht-cell"></div>
                        </th>
                        </template>
                    </tr>
                </thead>
            </table>
        </div>
        <div class="fixed-table-body">
            <div v-show="loading" class="fixed-table-loading"
                :style="{top: view.headerHeight + 1 + 'px'}">
                <div class="fixed-table-loading-bg"></div>
                <div class="fixed-table-loading-text">
                    {{local.options.formatLoadingMessage()}}
                </div>
            </div>
            <table :class="local.options.classes">
                <thead v-if="local.options.showHeader && !local.options.cardView && !local.options.height">
                    <tr v-for="_columns in local.columns">
                        <th v-if="!local.options.cardView && local.options.detailView"
                            class="detail" rowspan="columns.length">
                            <div class="fht-cell"></div>
                        </th>
                        <template v-for="column in _columns">
                        <th v-if="column && !(!column.visible || local.options.cardView && !column.cardVisible)"
                            :title="column.titleTooltip"
                            :class="[{'bs-checkbox': column.checkbox || column.radio}, column.class]"
                            :style="column.style"
                            :rowspan="column.rowspan"
                            :colspan="column.colspan"
                            :data-field="column.field"
                            tabindex="0">
                            <div class="th-inner"
                                :class="[{sortable: local.options.sortable && column.sortable},
                                (local.options.sortable && column.sortable) ? (local.options.sortName == column.field ? local.options.sortOrder : 'both') : '']"
                                @click="onSort(column)"
                                @keypress.enter="onSort(column)">

                                <input v-if="column.checkbox && !local.options.singleSelect && local.options.checkboxHeader"
                                    name="btSelectAll" type="checkbox" v-model="selected.all"
                                    @change="onCheckAllChange">

                                <template v-if="!column.checkbox && !column.radio">
                                {{column.title}}
                                </template>
                            </div>
                            <div class="fht-cell"></div>
                        </th>
                        </template>
                    </tr>
                </thead>
                <tbody>
                    <!-- v-bind:class="class" -->
                    <tr v-for="(item, i) in renderData"
                        :data-index="i"
                        :data-uniqueid="item[local.options.uniqueId]">

                        <template v-if="!local.options.cardView && local.options.detailView">
                        <td>
                            <a class="detail-icon" href="javascript:">
                                <i :class="[local.options.iconsPrefix, icons.detailOpen]"></i>
                            </a>
                        </td>
                        </template>

                        <template v-if="local.options.cardView">
                        <td :colspan="header.fields.length">
                            <div class="card-views">
                                <div v-for="(field, j) in header.fields" class="card-view"
                                    :class="fieldColumns[j].class">
                                    <template v-if="!(!fieldColumns[j].visible || local.options.cardView && !fieldColumns[j].cardVisible)">
                                        <input v-if="fieldColumns[j].checkbox || fieldColumns[j].radio"
                                            :name="local.options.selectItemName"
                                            :value="item" v-model="selected.items"
                                            @change="onCheckItemChange(item)"
                                            :type="fieldColumns[j].checkbox ? 'checkbox' : 'radio'">
                                        <div v-else class="card-view">
                                            <span v-if="local.options.showHeader" class="title">
                                                {{fieldColumns[j].title}}
                                            </span>
                                            <span class="value" v-html="fieldValue(item,field, i, j)">
                                            </span>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </td>
                        </template>

                        <template v-else>
                            <template v-for="(field, j) in header.fields">
                                <template v-if="!(!fieldColumns[j].visible || local.options.cardView && !fieldColumns[j].cardVisible)">
                                    <td v-if="fieldColumns[j].checkbox || fieldColumns[j].radio"
                                        class="bs-checkbox" :class="fieldColumns[j].class">
                                        <input :name="local.options.selectItemName"
                                        :value="item" v-model="selected.items"
                                        @change="onCheckItemChange(item)"
                                        :type="fieldColumns[j].checkbox ? 'checkbox' : 'radio'">
                                    </td>
                                    <td v-else
                                        @click="onTdClick(item, fieldColumns[j].field, $event)"
                                        @dblclick="onTdClick(item, fieldColumns[j].field, $event)"
                                        v-html="fieldValue(item,field, i, j)">
                                    </td>
                                </template>
                            </template>
                        </template>
                    </tr>
                    <tr v-if="!loading && !renderData.length" class="no-records-found">
                        <td :colspan="columnsLength + 1">
                            {{local.options.formatNoMatches()}}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="local.options.pagination" class="fixed-table-pagination">
            <div class="pagination-detail"
            :class="'pull-'+local.options.paginationDetailHAlign">
                <span class="pagination-info">
                    <template v-if="local.options.onlyInfoPagination">
                    {{local.options.formatDetailPagination(local.options.totalRows)}}
                    </template>
                    <template v-else>
                    {{local.options.formatShowingRows(pageFrom, pageTo, local.options.totalRows)}}
                    </template>
                </span>
                <span v-if="!local.options.onlyInfoPagination" class="page-list">
                    {{local.options.formatRecordsPerPage('pageNumber').split('pageNumber')[0]}}
                    <span class="btn-group"
                    :class="[local.options.paginationVAlign == 'top' || local.options.paginationVAlign == 'both' ? 'dropdown' : 'dropup']">
                        <button type="button" class="btn dropdown-toggle" data-toggle="dropdown"
                        :class="['btn-'+local.options.buttonsClass, 'btn-'+local.options.iconSize]">
                            <span class="page-size">
                                {{local.options.pageSize === local.options.totalRows ? local.options.formatAllRows() : local.options.pageSize}}
                            </span> <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li :class="{active: page == local.options.formatAllRows() || page == local.options.pageSize}"
                                v-for="page in local.options.pageList"
                                @click="onPageListChange">
                                <a href="javascript:">{{page}}</a>
                            </li>
                        </ul>
                    </span> {{local.options.formatRecordsPerPage('pageNumber').split('pageNumber')[1]}}
                </span>
            </div>
            <div v-if="totalPages > 1" class="pagination"
                :class="'pull-'+local.options.paginationHAlign">
                <ul class="pagination"
                :class="'pagination-'+local.options.iconSize">
                    <li class="page-pre" @click="onPagePre">
                        <a href="javascript:" v-html="local.options.paginationPreText"></a>
                    </li>
                    <li v-if="pageInfo.first" class="page-first"
                        :class="{active: 1 == local.options.pageNumber}"
                        @click="onPageFirst">
                        <a href="javascript:">1</a>
                    </li>
                    <li v-if="pageInfo.firstSeparator" class="page-first-separator disabled">
                        <a href="javascript:">...</a>
                    </li>
                    <li class="page-number"
                        :class="{active: i == local.options.pageNumber}"
                        v-for="i in pageInfo.list"
                        @click="onPageNumber">
                        <a href="javascript:">{{i}}</a>
                    </li>
                    <li v-if="pageInfo.lastSeparator" class="page-last-separator disabled">
                        <a href="javascript:">...</a>
                    </li>
                    <li v-if="pageInfo.last" class="page-last"
                        :class="{active: totalPages == local.options.pageNumber}"
                        @click="onPageLast">
                        <a href="javascript:">{{totalPages}}</a>
                    </li>
                    <li class="page-next" @click="onPageNext">
                        <a href="javascript:" v-html="local.options.paginationNextText"></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="clearfix"></div>
</div>
</template>

<script>

// it only does '%s', and return '' when arguments are undefined
const sprintf = function (str) {
    let args = arguments,
        flag = true,
        i = 1;

    str = str.replace(/%s/g, function () {
        let arg = args[i++];

        if (typeof arg === 'undefined') {
            flag = false;
            return '';
        }
        return arg;
    });
    return flag ? str : '';
};

// http://jsfiddle.net/wenyi/47nz7ez9/3/
let setFieldIndex = function (columns) {
    let i, j, k,
        totalCol = 0,
        flag = [];

    for (i = 0; i < columns[0].length; i++) {
        totalCol += columns[0][i].colspan || 1;
    }

    for (i = 0; i < columns.length; i++) {
        flag[i] = [];
        for (j = 0; j < totalCol; j++) {
            flag[i][j] = false;
        }
    }

    for (i = 0; i < columns.length; i++) {
        for (j = 0; j < columns[i].length; j++) {
            let r = columns[i][j],
                rowspan = r.rowspan || 1,
                colspan = r.colspan || 1,
                index = $.inArray(false, flag[i]);

            if (colspan === 1) {
                r.fieldIndex = index;
                // when field is undefined, use index instead
                if (typeof r.field === 'undefined') {
                    r.field = index;
                }
            }

            for (k = 0; k < rowspan; k++) {
                flag[i + k][index] = true;
            }
            for (k = 0; k < colspan; k++) {
                flag[i][index + k] = true;
            }
        }
    }
};

const getFieldIndex = function (columns, field) {
    let index = -1;

    $.each(columns, function (i, column) {
        if (column.field === field) {
            index = i;
            return false;
        }
        return true;
    });
    return index;
};

const calculateObjectValue = function (self, name, args, defaultValue) {
    let func = name;

    if (typeof name === 'string') {
        // support obj.func1.func2
        let names = name.split('.');

        if (names.length > 1) {
            func = window;
            $.each(names, function (i, f) {
                func = func[f];
            });
        } else {
            func = window[name];
        }
    }
    if (typeof func === 'object') {
        return func;
    }
    if (typeof func === 'function') {
        return func.apply(self, args);
    }
    if (!func && typeof name === 'string' && sprintf.apply(this, [name].concat(args))) {
        return sprintf.apply(this, [name].concat(args));
    }
    return defaultValue;
};

const escapeHTML = function (text) {
    if (typeof text === 'string') {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')
            .replace(/`/g, '&#x60;');
    }
    return text;
};

const getItemField = function (item, field, escape, undefinedText) {
    let value = item;

    if (typeof field !== 'string' || item.hasOwnProperty(field)) {
        return escape ? escapeHTML(item[field]) : item[field];
    }
    let props = field.split('.');
    for (let p in props) {
        value = value && value[props[p]];
    }
    return (escape ? escapeHTML(value) : value) || undefinedText;
};

const checkAllIndexOf = function (type, items, data, from, to) {
    if (type === 'radio') {
        return false;
    }
    for (let i = from; i < to; i++) {
        if (items.indexOf(data[i]) === -1) {
            return false;
        }
    }
    return true;
};

let DEFAULTS = {
    classes: 'table table-hover',
    height: undefined,
    undefinedText: '-',
    escape: false,
    showHeader: true,
    showFooter: false,
    cardView: false,
    locale: undefined,

    method: 'get',
    url: undefined,
    contentType: 'application/json',
    dataType: 'json',
    cache: true,
    ajax: undefined,
    ajaxOptions: {},
    queryParams: function (params) {
        return params;
    },
    queryParamsType: 'limit', // undefined
    responseHandler: function (res) {
        return res;
    },
    responseTotalField: 'total',
    responseRowsField: 'rows',

    sortable: true,
    sortName: '',
    sortOrder: 'asc',
    sortStable: false,

    pagination: false,
    sidePagination: 'client', // client or server
    onlyInfoPagination: false,
    totalRows: 0, // no need to set, can be use in getOptions
    pageNumber: 1,
    pageSize: 10,
    pageList: [10, 25, 50, 100],
    paginationPreText: '&lsaquo;',
    paginationNextText: '&rsaquo;',
    paginationHAlign: 'right', // right, left
    paginationVAlign: 'bottom', // bottom, top, both
    paginationDetailHAlign: 'left', // right, left

    search: false,
    searchText: '',
    strictSearch: false,
    searchOnEnterKey: false,
    trimOnSearch: true,
    searchTimeOut: 500,
    searchAlign: 'right',

    showPaginationSwitch: false,
    showToggle: false,
    showRefresh: false,
    showColumns: false,
    minimumCountColumns: 1,
    buttonsAlign: 'right',
    toolbarAlign: 'left',

    idField: undefined,
    clickToSelect: false,
    singleSelect: false,
    selectItemName: 'btSelectItem',
    uniqueId: undefined,
    checkboxHeader: true,
    maintainSelected: false,

    detailView: false,
    detailFormatter: function (index, row) {
        return '';
    },

    iconSize: '',
    buttonsClass: 'default',
    iconsPrefix: 'glyphicon', // glyphicon of fa (font awesome)
    icons: {
        paginationSwitchDown: 'glyphicon-collapse-down icon-chevron-down',
        paginationSwitchUp: 'glyphicon-collapse-up icon-chevron-up',
        refresh: 'glyphicon-refresh icon-refresh',
        toggle: 'glyphicon-list-alt icon-list-alt',
        columns: 'glyphicon-th icon-th',
        detailOpen: 'glyphicon-plus icon-plus',
        detailClose: 'glyphicon-minus icon-minus'
    },

    rowStyle: function (row, index) {
        return {};
    },
    footerStyle: function (row, index) {
        return {};
    },

    checkbox: true,
};

let COLUMN_DEFAULTS = {
    field: undefined,
    title: undefined,
    titleTooltip: undefined,
    width: undefined,
    'class': undefined,
    align: undefined, // left, right, center
    halign: undefined, // left, right, center
    falign: undefined, // left, right, center
    valign: undefined, // top, middle, bottom
    radio: false,
    checkbox: false,
    clickToSelect: true,
    visible: true,
    switchable: true,
    searchable: true,
    searchFormatted: true,
    cardVisible: true,
    formatter: undefined,
    footerFormatter: undefined,
    events: undefined,
    sortable: false,
    order: 'asc', // asc, desc
    sorter: undefined,
    sortName: undefined,
    cellStyle: undefined
};

var LOCALES = {};
LOCALES['en-US'] = LOCALES.en = {
    formatLoadingMessage: function () {
        return 'Loading, please wait...';
    },
    formatRecordsPerPage: function (pageNumber) {
        return sprintf('%s rows per page', pageNumber);
    },
    formatShowingRows: function (pageFrom, pageTo, totalRows) {
        return sprintf('Showing %s to %s of %s rows', pageFrom, pageTo, totalRows);
    },
    formatDetailPagination: function (totalRows) {
        return sprintf('Showing %s rows', totalRows);
    },
    formatSearch: function () {
        return 'Search';
    },
    formatNoMatches: function () {
        return 'No matching records found';
    },
    formatPaginationSwitch: function () {
        return 'Hide/Show pagination';
    },
    formatRefresh: function () {
        return 'Refresh';
    },
    formatToggle: function () {
        return 'Toggle';
    },
    formatColumns: function () {
        return 'Columns';
    },
    formatAllRows: function () {
        return 'All';
    }
};

$.extend(DEFAULTS, LOCALES['en-US']);

let BootstrapTable =
{
    name: 'BootstrapTable',
    props: {
        my_columns: {
            type: Array,
            required: true,
            default: function () { return []; }
        },
        my_data: {
            type: Array,
            default: function () { return []; }
        },
        my_options: {
            type: Object,
            default: function () { return DEFAULTS; }
        }
    },
    data () {
        return {
            fieldColumns: {},
            header: {
                fields: [],
                styles: [],
                classes: [],
                formatters: [],
                events: [],
                sorters: [],
                sortNames: [],
                cellStyles: [],
                searchables: []
            },
            pageFrom: 1,
            pageTo: 1,
            totalPages: 0,
            searchText: '',
            loading: false,
            selected: {
                type: '',
                all: false,
                items: []
            },
            view: {
                headerHeight: 0
            },

            local:{
                columns:[],
                data :[],
                options:{},
            },

            _renderData:[],
        };
    },
    watch: {
        my_columns (val) {
            let vm = this;

            if(vm.my_columns){
                vm.$set(vm.local,'columns',vm.my_columns.slice());
            }

            vm.initTable();
            vm.initHeader();

            if(this._renderData){
                this.$nextTick(this.resetView);
            }
        },
    },
    created: function () {
        let vm = this;

        vm.$set(vm.local,'options',$.extend({}, DEFAULTS, vm.my_options));

        if(vm.my_columns){
            vm.$set(vm.local,'columns',vm.my_columns.slice());
        }

        if(vm.my_data){
            vm.$set(vm.local,'data',vm.my_data);
        }

        this.initLocale();
        this.initTable();
        this.initHeader();
        this.initPagination();
        this.initBody();
        this.initServer();
    },
    computed: {
        paginationSwitchIcon: function () {
            return this.local.options.icons[this.local.options.pagination
                ? 'paginationSwitchDown' : 'paginationSwitchUp'];
        },
        toggleColumnsCount: function () {
            let count = 0;
            for (let i in this.fieldColumns) {
                if (!(this.fieldColumns[i].radio || this.fieldColumns[i].checkbox ||
                        this.local.options.cardView && !this.fieldColumns[i].cardVisible) &&
                        this.fieldColumns[i].visible) {
                    count++;
                }
            }
            return count;
        },
        renderData: function () {
            let that = this,
                data = this.local.data.slice(this.pageFrom - 1, this.pageTo);

            data.forEach(function (item, i) {
                let key,
                    style = {},
                    csses = [];

                style = calculateObjectValue(that.local.options, that.local.options.rowStyle, [item, i], style);

                if (style && style.css) {
                    for (key in style.css) {
                        csses.push(key + ': ' + style.css[key]);
                    }
                }
                item.style = style;
                item.csses = csses;
            });

            if (!this.local.options.maintainSelected) {
                this.selected.all = false;
                this.selected.items = [];
            } else {
                this.selected.all = checkAllIndexOf(this.selected.type,
                    this.selected.items, this.local.data, this.pageFrom - 1, this.pageTo);
            }

            if (this.local.options.sidePagination !== 'server') {
                let s = this.searchText && (this.local.options.escape
                    ? escapeHTML(this.searchText) : this.searchText).toLowerCase();

                data = s ? $.grep(data, function (item, i) {
                    for (let key in item) {
                        key = $.isNumeric(key) ? parseInt(key, 10) : key;
                        let value = item[key],
                            column = that.fieldColumns[getFieldIndex(that.fieldColumns, key)],
                            j = $.inArray(key, that.header.fields);

                        // Fix #142: search use formatted data
                        if (column && column.searchFormatted) {
                            value = calculateObjectValue(column,
                                that.header.formatters[j], [value, item, i], value);
                        }

                        let index = $.inArray(key, that.header.fields);
                        if (index !== -1 && that.header.searchables[index] && (typeof value === 'string' || typeof value === 'number')) {
                            if (that.local.options.strictSearch) {
                                if ((value + '').toLowerCase() === s) {
                                    return true;
                                }
                            } else {
                                if ((value + '').toLowerCase().indexOf(s) !== -1) {
                                    return true;
                                }
                            }
                        }
                    }
                    return false;
                }) : data;
            }

            this._renderData = data;
            this.$nextTick(this.resetView);
            return data;
        },
        pageInfo: function () {
            let i, from, to,
                info = {};

            if (this.totalPages < 5) {
                from = 1;
                to = this.totalPages;
            } else {
                from = this.local.options.pageNumber - 2;
                to = from + 4;
                if (from < 1) {
                    from = 1;
                    to = 5;
                }
                if (to > this.totalPages) {
                    to = this.totalPages;
                    from = to - 4;
                }
            }

            if (this.totalPages >= 6) {
                if (this.local.options.pageNumber >= 3) {
                    info.first = true;
                    from++;
                }

                if (this.local.options.pageNumber >= 4) {
                    if (this.local.options.pageNumber == 4 || this.totalPages == 6 || this.totalPages == 7) {
                        from--;
                    } else {
                        info.firstSeparator = true;
                    }

                    to--;
                }
            }

            if (this.totalPages >= 7 && this.local.options.pageNumber >= (this.totalPages - 2)) {
                from--;
            }

            if (this.totalPages === 6 && this.local.options.pageNumber >= this.totalPages - 2) {
                to++;
            } else if (this.totalPages >= 7 && (this.totalPages === 7 ||
                    this.local.options.pageNumber >= this.totalPages - 3)) {
                to++;
            }

            info.list = [];
            for (i = from; i <= to; i++) {
                info.list.push(i);
            }

            if (this.totalPages >= 8 && this.local.options.pageNumber <= this.totalPages - 4) {
                info.lastSeparator = true;
            }

            if (this.totalPages >= 6 && this.local.options.pageNumber <= this.totalPages - 3) {
                info.last = true;
            }
            return info;
        },
        columnsLength: function () {
            return Object.keys(this.fieldColumns).length;
        }
    },
    methods: {
        initLocale: function () {
            if (!this.local.options.locale) {
                return;
            }
            let parts = this.local.options.locale.split(/-|_/);
            parts[0].toLowerCase();
            if (parts[1]) parts[1].toUpperCase();
            if (BootstrapTable.locales[this.local.options.locale]) {
                // locale as requested
                this.$set(this.local,'options',
                    $.extend(this.local.options, BootstrapTable.locales[this.local.options.locale]));
            } else if (BootstrapTable.locales[parts.join('-')]) {
                // locale with sep set to - (in case original was specified with _)
                this.$set(this.local,'options',
                    $.extend(this.local.options, BootstrapTable.locales[parts.join('-')]));
            } else if (BootstrapTable.locales[parts[0]]) {
                // short locale language code (i.e. 'en')
                this.$set(this.local,'options',
                    $.extend(this.local.options, BootstrapTable.locales[parts[0]]));
            }
        },
        initTable: function () {
            let that = this,
                columns = {};

            if (!Array.isArray(this.local.columns[0])) {
                this.$set(this.local,'columns',[this.local.columns]);
            }
            setFieldIndex(this.local.columns);
            this.local.columns.forEach(function (_columns, i) {
                _columns.forEach(function (column, j) {
                    column = $.extend({}, COLUMN_DEFAULTS, column);

                    if (typeof column.fieldIndex !== 'undefined') {

                        columns[column.fieldIndex] = column;
                    }
                    that.$set(that.local.columns[i],j,column);
                });
            });
            for(let k in columns){
                this.$set(this.fieldColumns,k,columns[k]);
            }
            this.searchText = this.local.options.searchText;
            this.timeoutId = 0;
        },
        initHeader: function () {
            let that = this,
                visibleColumns = {};

            this.local.columns.forEach(function (columns, i) {
                columns.forEach(function (column, j) {
                    let halign = '', // header align style
                        align = '', // body align style
                        style = '',
                        class_ = sprintf(' class="%s"', column['class']),
                        unitWidth = 'px',
                        width = column.width;

                    if (column.width !== undefined && (!that.local.options.cardView)) {
                        if (typeof column.width === 'string') {
                            if (column.width.indexOf('%') !== -1) {
                                unitWidth = '%';
                            }
                        }
                    }
                    if (column.width && typeof column.width === 'string') {
                        width = column.width.replace('%', '').replace('px', '');
                    }

                    halign = sprintf('text-align: %s; ', column.halign ? column.halign : column.align);
                    align = sprintf('text-align: %s; ', column.align);
                    style = sprintf('vertical-align: %s; ', column.valign);
                    style += sprintf('width: %s; ', (column.checkbox || column.radio) && !width
                        ? '36px' : (width ? width + unitWidth : undefined));

                    column.style = halign + style;

                    if (typeof column.fieldIndex !== 'undefined') {
                        that.header.fields[column.fieldIndex] = column.field;
                        that.header.styles[column.fieldIndex] = align + style;
                        that.header.classes[column.fieldIndex] = class_;
                        that.header.formatters[column.fieldIndex] = column.formatter;
                        that.header.events[column.fieldIndex] = column.events;
                        that.header.sorters[column.fieldIndex] = column.sorter;
                        that.header.sortNames[column.fieldIndex] = column.sortName;
                        that.header.cellStyles[column.fieldIndex] = column.cellStyle;
                        that.header.searchables[column.fieldIndex] = column.searchable;

                        if (!column.visible) {
                            return;
                        }

                        if (that.local.options.cardView && (!column.cardVisible)) {
                            return;
                        }

                        visibleColumns[column.field] = column;
                    }

                    if (column.checkbox || column.radio) {
                        that.selected.type = column.checkbox ? 'checkbox' : 'radio';
                        that.header.stateField = column.field;
                    }
                });
            });
        },
        onSort: function (column) {
            if (!this.local.options.sortable || !column.sortable) {
                return;
            }
            if (this.local.options.sortName === column.field) {
                this.local.options.sortOrder = this.local.options.sortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                this.local.options.sortName = column.field;
                this.local.options.sortOrder = column.order === 'asc' ? 'desc' : 'asc';
            }
            this.trigger('sort', this.local.options.sortName, this.local.options.sortOrder);

            if (this.local.options.sidePagination === 'server') {
                this.initServer();
                return;
            }

            this.initSort();
            this.initBody();
        },
        initSort: function () {
            let that = this,
                name = this.local.options.sortName,
                order = this.local.options.sortOrder === 'desc' ? -1 : 1,
                index = this.header.fields.indexOf(this.local.options.sortName);

            if (index !== -1) {
                if (this.local.options.sortStable) {
                    this.local.data.forEach(function (row, i) {
                        if (!row.hasOwnProperty('_position')) row._position = i;
                    });
                }

                this.local.data.sort(function (a, b) {
                    if (that.header.sortNames[index]) {
                        name = that.header.sortNames[index];
                    }
                    let aa = getItemField(a, name, that.local.options.escape),
                        bb = getItemField(b, name, that.local.options.escape),
                        value = calculateObjectValue(that.header, that.header.sorters[index], [aa, bb]);

                    if (value !== undefined) {
                        return order * value;
                    }

                    // Fix #161: undefined or null string sort bug.
                    if (aa === undefined || aa === null) {
                        aa = '';
                    }
                    if (bb === undefined || bb === null) {
                        bb = '';
                    }

                    if (that.local.options.sortStable && aa === bb) {
                        aa = a._position;
                        bb = b._position;
                    }

                    // IF both values are numeric, do a numeric comparison
                    if ($.isNumeric(aa) && $.isNumeric(bb)) {
                        // Convert numerical values form string to float.
                        aa = parseFloat(aa);
                        bb = parseFloat(bb);
                        if (aa < bb) {
                            return order * -1;
                        }
                        return order;
                    }

                    if (aa === bb) {
                        return 0;
                    }

                    // If value is not a string, convert to string
                    if (typeof aa !== 'string') {
                        aa = aa.toString();
                    }

                    if (aa.localeCompare(bb) === -1) {
                        return order * -1;
                    }

                    return order;
                });
            }
        },
        search: function (event) {
            let that = this;
            if (this.local.options.searchOnEnterKey && event.keyCode !== 13) {
                return;
            }

            if ([37, 38, 39, 40].indexOf(event.keyCode) > -1) {
                return;
            }

            clearTimeout(this.timeoutId); // doesn't matter if it's 0
            this.timeoutId = setTimeout(function () {
                that.onSearch(event);
            }, this.local.options.searchTimeOut);
        },
        onSearch: function (event) {
            if (this.local.options.trimOnSearch) {
                this.searchText = this.searchText.trim();
            }

            if (this.local.options.searchText === this.searchText) {
                return;
            }
            this.local.options.searchText = this.searchText;

            this.local.options.pageNumber = 1;
            this.updatePagination();
            this.trigger('search', this.searchText);
        },
        togglePagination: function () {
            this.local.options.pagination = !this.local.options.pagination;
            this.updatePagination();
        },
        refresh: function (params) {
            if (params && params.url) {
                this.local.options.pageNumber = 1;
            }
            this.initServer(params && params.silent,
                params && params.query, params && params.url);

            this.trigger('refresh', params);
        },
        toggleView: function () {
            this.local.options.cardView = !this.local.options.cardView;
            this.initBody();
            this.trigger('toggle', this.local.options.cardView);
        },
        initPagination: function () {
            if (this.local.options.sidePagination !== 'server') {
                this.local.options.totalRows = this.local.data.length;
            }

            this.totalPages = 0;
            if (this.local.options.totalRows) {
                if (this.local.options.pageSize === this.local.options.formatAllRows()) {
                    this.local.options.pageSize = this.local.options.totalRows;
                }

                this.totalPages = ~~((this.local.options.totalRows - 1) / this.local.options.pageSize) + 1;

                this.local.options.totalPages = this.totalPages;
            }
            if (this.totalPages > 0 && this.local.options.pageNumber > this.totalPages) {
                this.local.options.pageNumber = this.totalPages;
            }

            this.pageFrom = (this.local.options.pageNumber - 1) * this.local.options.pageSize + 1;
            this.pageTo = this.local.options.pageNumber * this.local.options.pageSize;
            if (this.pageTo > this.local.options.totalRows) {
                this.pageTo = this.local.options.totalRows;
            }
        },
        updatePagination: function () {
            this.initPagination();
            if (this.local.options.sidePagination === 'server') {
                this.initServer();
            } else {
                this.initBody();
            }
        },
        onPageListChange: function (event) {
            let $this = $(event.currentTarget);

            this.local.options.pageSize = $this.text().toUpperCase() === this.local.options.formatAllRows().toUpperCase()
                ? this.local.options.formatAllRows() : +$this.text();

            this.updatePagination();
        },
        onPagePre: function () {
            if (this.local.options.pageNumber - 1 === 0) {
                this.local.options.pageNumber = this.local.options.totalPages;
            } else {
                this.local.options.pageNumber--;
            }
            this.updatePagination();
        },
        onPageFirst: function () {
            this.local.options.pageNumber = 1;
            this.updatePagination();
        },
        onPageNumber: function (event) {
            let number = +$(event.currentTarget).text();
            if (this.local.options.pageNumber === number) {
                return;
            }
            this.local.options.pageNumber = number;
            this.updatePagination();
        },
        onPageLast: function () {
            this.local.options.pageNumber = this.totalPages;
            this.updatePagination();
        },
        onPageNext: function () {
            if ((this.local.options.pageNumber + 1) > this.local.options.totalPages) {
                this.local.options.pageNumber = 1;
            } else {
                this.local.options.pageNumber++;
            }
            this.updatePagination();
        },
        initBody: function (fixedScroll) {
            if (!this.local.options.pagination || this.local.options.sidePagination === 'server') {
                this.pageFrom = 1;
                this.pageTo = this.local.data.length;
            }
        },
        onCheckAllChange: function () {
            let items = [];
            if (this.selected.all) {
                for (let i = this.pageFrom - 1; i < this.pageTo; i++) {
                    items.push(this.local.data[i]);
                }
            }
            this.selected.items = items;
            this.trigger(this.selected.all ? 'check-all' : 'uncheck-all');
        },
        onCheckItemChange: function (item) {
            this.selected.all = checkAllIndexOf(this.selected.type,
                this.selected.items, this.local.data, this.pageFrom - 1, this.pageTo);

            if (this.selected.type === 'radio') {
                this.trigger('check', item);
            } else {
                let selected = this.selected.items.indexOf(item) > -1;
                if (this.local.options.singleSelect) {
                    this.selected.items = selected ? [item] : [];
                }
                this.trigger(selected ? 'check' : 'uncheck', item);
            }
        },
        onTdClick: function (item, field, e) {
            let column = this.fieldColumns[getFieldIndex(this.fieldColumns, field)],
                value = getItemField(item, field, this.local.options.escape);

            this.trigger(e.type === 'click' ? 'click-cell' : 'dbl-click-cell', field, value, item);
            this.trigger(e.type === 'click' ? 'click-row' : 'dbl-click-row', item, field);

            // if click to select - then trigger the checkbox/radio click
            if (e.type === 'click' && this.local.options.clickToSelect && column.clickToSelect) {
                if (this.selected.type === 'radio') {
                    this.selected.items = item;
                } else {
                    let index = this.selected.items.indexOf(item);
                    if (index > -1) {
                        this.selected.items.splice(index, 1);
                    } else {
                        this.selected.items.push(item);
                    }
                }
                this.onCheckItemChange(item);
            }
        },
        initServer: function (silent, query, url) {
            let that = this,
                data = {},
                params = {
                    searchText: this.searchText,
                    sortName: this.local.options.sortName,
                    sortOrder: this.local.options.sortOrder
                },
                request;

            if (this.local.options.pagination) {
                params.pageSize = this.local.options.pageSize === this.local.options.formatAllRows()
                    ? this.local.options.totalRows : this.local.options.pageSize;
                params.pageNumber = this.local.options.pageNumber;
            }

            if (!(url || this.local.options.url) && !this.local.options.ajax) {
                return;
            }
            if (this.local.options.queryParamsType === 'limit') {
                params = {
                    search: params.searchText,
                    sort: params.sortName,
                    order: params.sortOrder
                };

                if (this.local.options.pagination) {
                    params.offset = this.local.options.pageSize === this.local.options.formatAllRows()
                        ? 0 : this.local.options.pageSize * (this.local.options.pageNumber - 1);
                    params.limit = this.local.options.pageSize === this.local.options.formatAllRows()
                        ? this.local.options.totalRows : this.local.options.pageSize;
                }
            }

            if (!($.isEmptyObject(this.filterColumnsPartial))) {
                params.filter = JSON.stringify(this.filterColumnsPartial, null);
            }

            data = calculateObjectValue(this.local.options, this.local.options.queryParams, [params], data);

            $.extend(data, query || {});

            // false to stop request
            if (data === false) {
                return;
            }

            if (!silent) {
                this.loading = true;
            }
            request = $.extend({}, calculateObjectValue(null, this.local.options.ajaxoptions), {
                type: this.local.options.method,
                url: url || this.local.options.url,
                data: this.local.options.contentType === 'application/json' && this.local.options.method === 'post'
                    ? JSON.stringify(data) : data,
                cache: this.local.options.cache,
                contentType: this.local.options.contentType,
                dataType: this.local.options.dataType,
                success: function (res) {
                    res = calculateObjectValue(that.local.options, that.local.options.responseHandler, [res], res);

                    that.load(res);
                    if (!silent) that.loading = false;
                    that.trigger('load-success', res);
                },
                error: function (res) {
                    if (!silent) that.loading = false;
                    that.trigger('load-error', res.status, res);
                }
            });

            if (this.local.options.ajax) {
                calculateObjectValue(this, this.local.options.ajax, [request], null);
            } else {
                if (this._xhr && this._xhr.readyState !== 4) {
                    this._xhr.abort();
                }
                this._xhr = $.ajax(request);
            }
        },
        load: function (data) {
            let fixedScroll = false;

            if (this.local.options.sidePagination === 'server') {
                this.local.options.totalRows = data[this.local.options.responseTotalField];
                fixedScroll = data.fixedScroll;
                data = data[this.local.options.responseRowsField];
            } else if (!$.isArray(data)) { // support fixedScroll
                fixedScroll = data.fixedScroll;
                data = data.data;
            }
            // this.local.data = data;
            this.$set(this.local,'data',data);

            this.initSort();
            this.initPagination();
            this.initBody(fixedScroll);
        },
        getVisibleFields: function () {
            let that = this,
                visibleFields = [];

            this.header.fields.forEach(function (field) {
                let column = that.fieldColumns[getFieldIndex(that.fieldColumns, field)];

                if (!column.visible) {
                    return;
                }
                visibleFields.push(field);
            });
            return visibleFields;
        },
        resetView: function () {
            let that = this,
                $el = $(this.$el);

            this.view.headerHeight = $el.find('thead:visible').height();
        // Sometimes header not loaded
            if(that.view.headerHeight === 0 && that.local.options.showHeader
                && !that.local.options.cardView
                ) {
                that.view.headerHeight = 40;
            }

            this.header.events.forEach(function (events, i) {
                if (!events) {
                    return;
                }

                // if events is defined with namespace
                if (typeof events === 'string') {
                    events = calculateObjectValue(null, events);
                }

                let field = that.header.fields[i],
                    fieldIndex = that.getVisibleFields().indexOf(field);

                if (that.local.options.detailView && !that.local.options.cardView) {
                    fieldIndex += 1;
                }

                for (let key in events) {
                    $el.find('tbody >tr:not(.no-records-found)').each(function () {
                        let $tr = $(this),
                            $td = $tr.find(that.local.options.cardView ? '.card-view' : 'td').eq(fieldIndex),
                            index = key.indexOf(' '),
                            name = key.substring(0, index),
                            el = key.substring(index + 1),
                            func = events[key];

                        $td.find(el).off(name).on(name, function (e) {
                            let index = $tr.data('index'),
                                row = that._renderData[index],
                                value = row[field];

                            func.apply(this, [e, value, row, index]);
                        });
                    });
                }
            });
        },
        trigger: function (name,...args) {
            // let args = Array.prototype.slice.call(arguments, 1);

        // Deconstructing the remaining parameters for convenience
            this.$emit(name,...args);
            console.log(name, args);

        // Does not seem to support
            // name += '.bs.table';
        },
    // vue2 v-html does not work with filters
        fieldValue: function (item, field, i, j) {
            let value = getItemField(item, field, this.local.options.escape),
                column = this.fieldColumns[j];

            return calculateObjectValue(column,
                this.header.formatters[j], [value, item, i], value);
        },
        getSelections(){
            let vm = this;
            return vm.selected.items;
        },
        getOptions(){
            let vm = this;
            return vm.local.options;
        },
        updateRow(index,row){
            let vm = this;
            let id = vm.local.options.uniqueId;

            if(vm.local.data && row && row[id]){
                for(let index in vm.local.data){
                    if (vm.local.data[index][id] === row[id]){
                        vm.$set(vm.local.data,index,row);
                        break;
                    }
                }
            }

            // if(vm.local.data && vm.local.data.length > index && row){
            //     vm.$set(vm.local.data,index,row);
            // }
        }
    },
    // filters: {
    //     fieldValue: function (item, field, i, j) {
    //         let value = getItemField(item, field, this.local.options.escape),
    //             column = this.fieldColumns[j];

    //         return calculateObjectValue(column,
    //             this.header.formatters[j], [value, item, i], value);
    //     }
    // },
};

BootstrapTable.defaults = DEFAULTS;
BootstrapTable.column_defaults = COLUMN_DEFAULTS;
BootstrapTable.locales = LOCALES;

export default BootstrapTable;

</script>


<style>
.bootstrap-table .table {
    margin-bottom: 0 !important;
    border-bottom: 1px solid #dddddd;
    border-collapse: collapse !important;
    border-radius: 1px;
}

.bootstrap-table .table:not(.table-condensed),
.bootstrap-table .table:not(.table-condensed) > tbody > tr > th,
.bootstrap-table .table:not(.table-condensed) > tfoot > tr > th,
.bootstrap-table .table:not(.table-condensed) > thead > tr > td,
.bootstrap-table .table:not(.table-condensed) > tbody > tr > td,
.bootstrap-table .table:not(.table-condensed) > tfoot > tr > td {
    padding: 8px;
}

.bootstrap-table .table.table-no-bordered > thead > tr > th,
.bootstrap-table .table.table-no-bordered > tbody > tr > td {
    border-right: 2px solid transparent;
}

.bootstrap-table .table.table-no-bordered > tbody > tr > td:last-child {
    border-right: none;
}

.fixed-table-container {
    position: relative;
    clear: both;
    border: 1px solid #dddddd;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
}

.fixed-table-container.table-no-bordered {
    border: 1px solid transparent;
}

.fixed-table-footer,
.fixed-table-header {
    overflow: hidden;
}

.fixed-table-footer {
    border-top: 1px solid #dddddd;
}

.fixed-table-body {
    overflow-x: auto;
    overflow-y: auto;
    height: 100%;
}

.fixed-table-container table {
    width: 100%;
}

.fixed-table-container thead th {
    height: 0;
    padding: 0;
    margin: 0;
    border-left: 1px solid #dddddd;
}

.fixed-table-container thead th:focus {
    outline: 0 solid transparent;
}

.fixed-table-container thead th:first-child {
    border-left: none;
    border-top-left-radius: 4px;
    -webkit-border-top-left-radius: 4px;
    -moz-border-radius-topleft: 4px;
}

.fixed-table-container thead th .th-inner,
.fixed-table-container tbody td .th-inner {
    padding: 8px;
    line-height: 24px;
    vertical-align: top;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.fixed-table-container thead th .sortable {
    cursor: pointer;
    background-position: right;
    background-repeat: no-repeat;
    padding-right: 30px;
}

.fixed-table-container thead th .sortable.both {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAQAAADYWf5HAAAAkElEQVQoz7X QMQ5AQBCF4dWQSJxC5wwax1Cq1e7BAdxD5SL+Tq/QCM1oNiJidwox0355mXnG/DrEtIQ6azioNZQxI0ykPhTQIwhCR+BmBYtlK7kLJYwWCcJA9M4qdrZrd8pPjZWPtOqdRQy320YSV17OatFC4euts6z39GYMKRPCTKY9UnPQ6P+GtMRfGtPnBCiqhAeJPmkqAAAAAElFTkSuQmCC');
}

.fixed-table-container thead th .sortable.asc {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAZ0lEQVQ4y2NgGLKgquEuFxBPAGI2ahhWCsS/gDibUoO0gPgxEP8H4ttArEyuQYxAPBdqEAxPBImTY5gjEL9DM+wTENuQahAvEO9DMwiGdwAxOymGJQLxTyD+jgWDxCMZRsEoGAVoAADeemwtPcZI2wAAAABJRU5ErkJggg==');
}

.fixed-table-container thead th .sortable.desc {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAZUlEQVQ4y2NgGAWjYBSggaqGu5FA/BOIv2PBIPFEUgxjB+IdQPwfC94HxLykus4GiD+hGfQOiB3J8SojEE9EM2wuSJzcsFMG4ttQgx4DsRalkZENxL+AuJQaMcsGxBOAmGvopk8AVz1sLZgg0bsAAAAASUVORK5CYII= ');
}

.fixed-table-container th.detail {
    width: 30px;
}

.fixed-table-container tbody td {
    border-left: 1px solid #dddddd;
}

.fixed-table-container tbody tr:first-child td {
    border-top: none;
}

.fixed-table-container tbody td:first-child {
    border-left: none;
}

/* the same color with .active */
.fixed-table-container tbody .selected td {
    background-color: #f5f5f5;
}

.fixed-table-container .bs-checkbox {
    text-align: center;
}

.fixed-table-container .bs-checkbox .th-inner {
    padding: 8px 0;
}

.fixed-table-container input[type="radio"],
.fixed-table-container input[type="checkbox"] {
    margin: 0 auto !important;
}

.fixed-table-container .no-records-found {
    text-align: center;
}

.fixed-table-pagination div.pagination,
.fixed-table-pagination .pagination-detail {
    margin-top: 10px;
    margin-bottom: 10px;
}

.fixed-table-pagination div.pagination .pagination {
    margin: 0;
}

.fixed-table-pagination .pagination a {
    padding: 6px 12px;
    line-height: 1.428571429;
}

.fixed-table-pagination .pagination-info {
    line-height: 34px;
    margin-right: 5px;
}

.fixed-table-pagination .btn-group {
    position: relative;
    display: inline-block;
    vertical-align: middle;
}

.fixed-table-pagination .dropup .dropdown-menu {
    margin-bottom: 0;
}

.fixed-table-pagination .page-list {
    display: inline-block;
}

.fixed-table-toolbar .columns-left {
    margin-right: 5px;
}

.fixed-table-toolbar .columns-right {
    margin-left: 5px;
}

.fixed-table-toolbar .columns label {
    display: block;
    padding: 3px 20px;
    clear: both;
    font-weight: normal;
    line-height: 1.428571429;
}

.fixed-table-toolbar .bs-bars,
.fixed-table-toolbar .search,
.fixed-table-toolbar .columns {
    position: relative;
    margin-top: 10px;
    margin-bottom: 10px;
    line-height: 34px;
}

.fixed-table-pagination li.disabled a {
    pointer-events: none;
    cursor: default;
}

.fixed-table-loading {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
}

.fixed-table-loading-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.9;
    background-color: #fff;
}

.fixed-table-loading-text:before {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
}

.fixed-table-loading-text {
    position: absolute;
    width: 100%;
    height: 100%;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
}

.fixed-table-body .card-view .title {
    font-weight: bold;
    display: inline-block;
    min-width: 30%;
    text-align: left !important;
}

/* support bootstrap 2 */
.fixed-table-body thead th .th-inner {
    box-sizing: border-box;
}

.table th, .table td {
    vertical-align: middle;
    box-sizing: border-box;
}

.fixed-table-toolbar .dropdown-menu {
    text-align: left;
    max-height: 300px;
    overflow: auto;
}

.fixed-table-toolbar .btn-group > .btn-group {
    display: inline-block;
    margin-left: -1px !important;
}

.fixed-table-toolbar .btn-group > .btn-group > .btn {
    border-radius: 0;
}

.fixed-table-toolbar .btn-group > .btn-group:first-child > .btn {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}

.fixed-table-toolbar .btn-group > .btn-group:last-child > .btn {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}

.bootstrap-table .table > thead > tr > th {
    vertical-align: bottom;
    border-bottom: 1px solid #ddd;
}

/* support bootstrap 3 */
.bootstrap-table .table thead > tr > th {
    padding: 0;
    margin: 0;
}

.bootstrap-table .fixed-table-footer tbody > tr > td {
    padding: 0 !important;
}

.bootstrap-table .fixed-table-footer .table {
    border-bottom: none;
    border-radius: 0;
    padding: 0 !important;
}

.pull-right .dropdown-menu {
    right: 0;
    left: auto;
}

/* calculate scrollbar width */
p.fixed-table-scroll-inner {
    width: 100%;
    height: 200px;
}

div.fixed-table-scroll-outer {
    top: 0;
    left: 0;
    visibility: hidden;
    width: 200px;
    height: 150px;
    overflow: hidden;
}
</style>
