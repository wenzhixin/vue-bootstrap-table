---
title: Table Options
weight: 5
---

#### classes

Type: String

The class name of table. Can be `table`, `table-hover`, `table-striped`, `table-condensed` or `table-no-bordered`. By default, the table is bordered, you can add `table-no-bordered` to remove table-bordered style.

By default this option is set to `'table table-hover'`.

Example: [classes](/examples/classes/)

<hr>

#### height

Type: Number

The height of table. If you set the `height` option, the table thead will be auto fixed.

By default this option is set to `undefined`.

Example: [height](/examples/height/)

<hr>

#### undefinedText

Type: String

Defines the default undefined text.

By default this option is set to `'-'`.

Example: [undefinedText](/examples/undefinedtext/)

<hr>

#### escape

Type: Boolean

Escapes a string for insertion into HTML,
replacing `&`, `<`, `>`, `"`, `'` and `` ` `` characters.

By default this option is set to `false`.

Example: [escape](/examples/escape/)

<hr>

#### showHeader

Type: Boolean

False to hide the table header.

By default this option is set to `true`.

Example: [showHeader](/examples/showheader/)

<hr>

#### showFooter

Type: Boolean

True to show the summary footer row.

By default this option is set to `false`.

<hr>

#### cardView

Type: Boolean

True to show card view table, for example mobile view.

By default this option is set to `false`.

Example: [cardView](/examples/cardview/)

<hr>

#### locale

Type: String

Sets the locale to use (i.e. `'zh-CN'`). Locale files must be pre-loaded.
Allows for fallback locales, if loaded, in the following order:

* First tries for the locale as specified
* Then tries the locale with `'_'` translated to `'-'` and the region code upper cased
* Then tries the the short locale code (i.e. `'zh'` instead of `'zh-CN'`)
* And finally will use the last locale file loaded (or the default locale if no locales loaded)

If left undefined or an empty string, uses the last locale loaded (or `'en-US'` if no locale files loaded).

By default this option is set to `undefined`.

<hr>

#### method

Type: String

The method type to request remote data.

By default this option is set to `get`.

<hr>

#### url

Type: String

A URL to request data from remote site.

Note that the required server response format is different depending on whether the `'sidePagination'` option is specified. See the following examples:

* [Without server-side pagination](https://github.com/wenzhixin/bootstrap-table-examples/blob/master/json/data1.json)
* [With server-side pagination](https://github.com/wenzhixin/bootstrap-table-examples/blob/master/json/data2.json)

By default this option is set to `undefined`.

<hr>

#### contentType

Type: String

The contentType of request remote data.

By default this option is set to `'application/json'`.

<hr>

#### dataType

Type: String

The type of data that you are expecting back from the server.

By default this option is set to `'json'`.

<hr>

#### cache

Type: Boolean

False to disable caching of AJAX requests.

By default this option is set to `true`.

<hr>

#### ajax

Type: Function

A method to replace ajax call. Should implement the same API as jQuery ajax method.

By default this option is set to `undefined`.

<hr>

#### ajaxOptions

Type: Object

Additional options for submit ajax request. List of values: http://api.jquery.com/jQuery.ajax.

By default this option is set to `{}`.

<hr>

#### queryParams

Type: Function

When requesting remote data, you can send additional parameters by modifying queryParams.

If `queryParamsType = 'limit'`, the params object contains:
```
params = {
    limit: 15,
    offset: 0,
    search: 'search text',
    sort: 'sort name',
    order: 'sort order'
};
```

Else, it contains:
```
params = {
    pageSize: 15,
    pageNumber: 1,
    searchText: 'search text',
    sortName: 'sort name',
    sortOrder: 'sort order'
};
```

Return `false` to stop request.

By default this option is set to:
```
function (params) {
    return params;
}
```

<hr>

#### queryParamsType

Type: String

Set `'limit'` to send query params width RESTFul type.

By default this option is set to `'limit'`.

<hr>

#### responseHandler

Type: Function

Before load remote data, handler the response data format, the parameters object contains:
`res`: the response data.

By default this option is set to:
```
function (res) {
    return res;
}
```

<hr>

#### responseTotalField

Type: String

The total key in response data containing total data.

By default this option is set to `'total'`.

<hr>

#### responseRowsField

Type: String

The rows key in response data containing rows data list.

By default this option is set to `'rows'`.

<hr>

#### sortable

Type: Boolean

False to disable sortable of all columns.

By default this option is set to `true`.

<hr>

#### sortName

Type: String

Defines which column will be sorted.

By default this option is set to `undefined`.

Example: [sort](/examples/sort/)

<hr>

#### sortOrder

Type: String

Defines the column sort order, can only be 'asc' or 'desc'.

By default this option is set to `'asc'`.

Example: [sort](/examples/sort/)

<hr>

#### sortStable

Type: Boolean

True to get a stable sorting. We will add `_position` property to the row.

By default this option is set to `false`.

Example: [sort](/examples/sort/)

<hr>

#### pagination

Type: Boolean

True to show a pagination toolbar on table bottom.

By default this option is set to `false`.

<hr>

#### sidePagination

Type: String

Defines the side pagination of table, can only be `'client'` or `'server'`.
Using `'server'` side requires either setting the 'url' or 'ajax' option.

Note that the required server response format is different depending on whether
the `'client'` or `'server'` option is specified. See the following examples:

* [Without server-side pagination](https://github.com/wenzhixin/bootstrap-table-examples/blob/master/json/data1.json)
* [With server-side pagination](https://github.com/wenzhixin/bootstrap-table-examples/blob/master/json/data2.json)

By default this option is set to `'client'`.

<hr>

#### onlyInfoPagination

Type: Boolean

True to show only the quantity of the data that is showing in the table. It needs the pagination table options is set to true.

By default this option is set to `false`.

<hr>

#### pageNumber

Type: Number

When set pagination property, initialize the page number.

By default this option is set to `1`.

<hr>

#### pageSize

Type: Number

When set pagination property, initialize the page size.

By default this option is set to `10`.

<hr>

#### pageList

Type: Array

When set pagination property, initialize the page size selecting list. If you include the `'All'` option, all the records will be shown in your table.

By default this option is set to `[10, 25, 50, 100]`.

<hr>

#### paginationPreText

Type: String

Indicate the icon or text to be shown in the pagination detail, the previous button.

By default this option is set to `'&lsaquo;'`.

<hr>

#### paginationNextText

Type: String

Indicate the icon or text to be shown in the pagination detail, the next button.

By default this option is set to `'&rsaquo;'`.

<hr>

#### paginationVAlign

Type: String

Indicate how to align the pagination. `'top'`, `'bottom'`, `'both'` (put the pagination on top and bottom) can be used.

By default this option is set to `'bottom'`.

<hr>

#### paginationHAlign

Type: String

Indicate how to align the pagination. `'left'`, `'right'` can be used.

By default this option is set to `'right'`.

<hr>

#### paginationDetailHAlign

Type: String

Indicate how to align the pagination detail. `'left'`, `'right'` can be used.

By default this option is set to `'left'`.

<hr>

#### search

Type: Boolean

Enable the search input.

By default this option is set to `false`.

<hr>

#### searchText

Type: String

When set search property, initialize the search text.

By default this option is set to `''`.

<hr>

#### strictSearch

Type: Boolean

Enable the strict search.

By default this option is set to `false`.

<hr>

#### searchOnEnterKey

Type: Boolean

The search method will be executed until the Enter key is pressed.

By default this option is set to `false`.

<hr>

#### trimOnSearch

Type: Boolean

True to trim spaces in search field.

By default this option is set to `true`.

<hr>

#### searchTimeOut

Type: Number

Set timeout for search fire.

By default this option is set to `500`.

<hr>

#### searchAlign

Type: String

Indicate how to align the search input. 'left', 'right' can be used.

By default this option is set to `'right'`.

<hr>

#### showPaginationSwitch

Type: Boolean

True to show the pagination switch button.

By default this option is set to `false`.

<hr>

#### showToggle

Type: Boolean

True to show the toggle button to toggle table / card view.

By default this option is set to `false`.

<hr>

#### showRefresh

Type: Boolean

True to show the refresh button.

By default this option is set to `false`.

<hr>

#### showColumns

Type: Boolean

True to show the columns drop down list.

By default this option is set to `false`.

<hr>

#### minimumCountColumns

Type: Number

The minimum number of columns to hide from the columns drop down list.

By default this option is set to `1`.

<hr>

#### buttonsAlign

Type: String

Indicate how to align the toolbar buttons. `'left'`, `'right'` can be used.

By default this option is set to `'right'`.

<hr>

#### toolbarAlign

Type: String

Indicate how to align the custom toolbar. `'left'`, `'right'` can be used.

By default this option is set to `'left'`.

<hr>

#### idField

Type: String

Indicate which field is an identity field.

By default this option is set to `undefined`.

<hr>

#### clickToSelect

Type: Boolean

True to select checkbox or radiobox when clicking rows.

By default this option is set to `false`.

<hr>

#### singleSelect

Type: Boolean

True to allow checkbox selecting only one row.

By default this option is set to `false`.

<hr>

#### selectItemName

Type: String

The name of radio or checkbox input.

By default this option is set to `'btSelectItem'`.

<hr>

#### uniqueId

Type: String

Indicate an unique identifier for each row.

By default this option is set to `undefined`.

<hr>

#### checkboxHeader

Type: Boolean

False to hide check-all checkbox in header row.

By default this option is set to `true`.

<hr>

#### maintainSelected

Type: Boolean

True to maintain selected rows on change page and search.

By default this option is set to `false`.

<hr>

#### detailView

Type: Boolean

True to show detail view table.

By default this option is set to `false`.

<hr>

#### detailFormatter

Type: Function

Format your detail view when `detailView` is set to `true`. Return a String and it will be appended into the detail view cell, optionally render the element directly using the third parameter which is a jQuery element of the target cell.

By default this option is set to:
```
function (index, row) {
    return '';
}
```

<hr>

#### iconSize

Type: String

Defines icon size:

* `''`: `'btn'`
* `'xs'`: `'btn-xs'`
* `'sm'`: `'btn-sm'`
* `'lg'`: `'btn-lg'`

By default this option is set to `''`.

<hr>

#### buttonsClass

Type: String

Defines the Bootstrap class (added after 'btn-') of table buttons. For example: `'primary'`, `'danger'`, `'warning'`...

By default this option is set to `'default'`.

<hr>

#### iconsPrefix

Type: String

Defines icon set name (`'glyphicon'` or `'fa'` for FontAwesome).

By default this option is set to `'glyphicon'`.

<hr>

#### icons

Type: Object

Defines icons used in the toolbar, pagination, and details view.

By default this option is set to:
```
{
    paginationSwitchDown: 'glyphicon-collapse-down icon-chevron-down',
    paginationSwitchUp: 'glyphicon-collapse-up icon-chevron-up',
    refresh: 'glyphicon-refresh icon-refresh',
    toggle: 'glyphicon-list-alt icon-list-alt',
    columns: 'glyphicon-th icon-th',
    detailOpen: 'glyphicon-plus icon-plus',
    detailClose: 'glyphicon-minus icon-minus'
}
```

<hr>

#### rowStyle

Type: Function

The row style formatter function, takes two parameters:

* row: the row record data.
* index: the row index.

Support classes or css. Example usage:
```
function rowStyle(value, row, index) {
    return {
        classes: 'text-nowrap another-class',
        css: {'color': 'blue', 'font-size': '50px'}
    };
}
```

By default this option is set to:
```
function (row, index) {
    return {};
}
```

<hr>

#### footerStyle

Type: Function

The footer style formatter function, takes two parameters:

* row: the row record data.
* index: the row index.

Support classes or css. Example usage:
```
function footerStyle(value, row, index) {
    return {
        css: {'font-weight': 'bold'}
    };
}
```

By default this option is set to:
```
function (row, index) {
    return {};
}
```
