---
title: sort
weight: 40
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
                field: 'id',
                sortable: true
            },
            {
                field: 'name',
                title: 'Item Name',
                sortable: true
            }, {
                field: 'price',
                title: 'Item Price',
                sortable: true
            }
        ],
        options: {
            sortName: 'id',
            sortOrder: 'desc',
            sortStable: true,
            url: '/json/data7.json'
        }
    }
});
```
