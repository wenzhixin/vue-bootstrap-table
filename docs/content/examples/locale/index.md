---
title: locale
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
            locale: 'zh-CN',
            url: '/json/data1.json',
            pagination: true,
            showPaginationSwitch: true,
            search: true,
            showToggle: true,
            showRefresh: true,
            showColumns: true
        }
    }
});
```
