---
title: height
weight: 10
---

```html
<div id="table">
    <bootstrap-table :options="options"></bootstrap-table>
</div>
```

```javascript
new Vue({
    el: '#table',
    components: {
        'bootstrap-table': BootstrapTable
    },
    data: {
        options: {
            height: 240,
            url: '/json/data0.json',
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
            ]
        }
    }
});
```
