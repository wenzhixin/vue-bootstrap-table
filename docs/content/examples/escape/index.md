---
title: escape
weight: 20
---

```html
<div id="table">
    <bootstrap-table :columns="columns" :data="data" :options="options"></bootstrap-table>
</div>
```

```javascript
new Vue({
    el: '#table',
    components: {
        'bootstrap-table': BootstrapTable
    },
    data: {
        columns: [
            {
                title: 'Item ID',
                field: 'id'
            },
            {
                field: 'name',
                title: 'Item Name'
            }, {
                field: 'price',
                title: 'Item Price'
            }
        ],
        data: [
            {
                "id": 0,
                "name": "Item 0",
                "price": "<a href=\"#\">$0</a>"
            }
        ],
        options: {
            escape: true
        }
    }
});
```
