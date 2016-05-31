---
title: undefinedText
weight: 15
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
            undefinedText: 'n/a',
            url: '/json/data6.json',
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
