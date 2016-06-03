---
title: showHeader
weight: 25
---

```html
<div id="table">
    <bootstrap-table :columns="columns" :options="options"></bootstrap-table>
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
        options: {
            showHeader: false,
            url: '/json/data0.json'
        }
    }
});
```
