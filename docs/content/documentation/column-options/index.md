---
title: Column Options
weight: 10
---

#### field

Type: String

The column field name.

By default this option is set to `undefined`.

---

#### title

Type: String

The column title text.

By default this option is set to `undefined`.

---

#### titleTooltip

Type: String

The column title tooltip text. This option also support the title HTML attribute.

By default this option is set to `undefined`.

---

#### width

Type: Number/String

The width of column. If not defined, the width will auto expand to fit its contents. Though if the table is left responsive and sized too small this 'width' might be ignored (use min/max-width via class or such then). Also you can add '%' to your number and the table will use the percentage unit, otherwise, leave as number (or add 'px') to make it use pixels.

By default this option is set to `undefined`.

---

#### class

Type: String

The column class name.

By default this option is set to `undefined`.

---

#### rowspan

Type: Number

Indicate how many rows a cell should take up.

By default this option is set to `undefined`.

---

#### colspan

Type: Number

Indicate how many columns a cell should take up.

By default this option is set to `undefined`.

---

#### align

Type: String

Indicate how to align the column data. `'left'`, `'right'`, `'center'` can be used.

By default this option is set to `undefined`.

---

#### halign

Type: String

Indicate how to align the table header. `'left'`, `'right'`, `'center'` can be used.

By default this option is set to `undefined`.

---

#### falign

Type: String

Indicate how to align the table footer. `'left'`, `'right'`, `'center'` can be used.

By default this option is set to `undefined`.

---

#### valign

Type: String

Indicate how to align the cell data. `'top'`, `'middle'`, `'bottom'` can be used.

By default this option is set to `undefined`.

---

#### radio

Type: Boolean

True to show a radio. The radio column has fixed width.

By default this option is set to `false`.

---

#### checkbox

Type: Boolean

True to show a checkbox. The checkbox column has fixed width.

By default this option is set to `false`.

---

#### clickToSelect

Type: Boolean

True to select checkbox or radio when the column is clicked.

By default this option is set to `true`.

---

#### visible

Type: Boolean

False to hide the columns item.

By default this option is set to `true`.

---

#### switchable

Type: Boolean

False to disable the switchable of columns item.

By default this option is set to `true`.

---

#### searchable

Type: Boolean

True to search data for this column.

By default this option is set to `true`.

---

#### searchFormatted

Type: Boolean

True to search use formatted data.

By default this option is set to `true`.

---

#### cardVisible

Type: Boolean

False to hide the columns item in card view state.

By default this option is set to `true`.

---

#### formatter

Type: Function

The cell formatter function, take three parameters:

* value: the field value.
* row: the row record data.
* index: the row index.

The context (this) is the column Object.

By default this option is set to `undefined`.

---

#### footerFormatter

Type: Function

The footer formatter function, take one parameter:

* data: Array of all the  data rows.

The function should return a string with the text to show in the footer cell. The context (this) is the column Object.

By default this option is set to `undefined`.

---

#### events

Type: Object

The cell events listener when you use formatter function, take four parameters:

* event: the jQuery event.
* value: the field value.
* row: the row record data.
* index: the row index.

Example code:

```
<th .. data-events="operateEvent">
<script>
var operateEvents = {
    'click .like': function (e, value, row, index) {
        //
    }
};
</script>
```

By default this option is set to `undefined`.

---

#### sortable

Type: Boolean

True to allow the column can be sorted.

By default this option is set to `false`.

---

#### order

Type: String

The default sort order, can only be `'asc'` or `'desc'`.

By default this option is set to `'asc'`.

---

#### sorter

Type: Function

The custom field sort function that used to do local sorting, take two parameters:

* a: the first field value.
* b: the second field value.

By default this option is set to `undefined`.

---

#### sortName

Type: String

Provide a customizable sort-name, not the default sort-name in the header, or the field name
of the column. For example, a column might display the value of fieldName of "html" such as  
`<b><span style="color:red">abc</span</b>`, but a fieldName to sort is "content" with the value of "abc".

By default this option is set to `undefined`.

---

#### cellStyle

Type: Function

The cell style formatter function, take four parameters:

* value: the field value.
* row: the row record data.
* index: the row index.
* field: the row field.

Support classes or css. Example usage:
```
function cellStyle (value, row, index, field) {
    return {
        classes: 'text-nowrap another-class',
        css: {'color': 'blue', 'font-size': '50px'}
    };
}
```

By default this option is set to `undefined`.
