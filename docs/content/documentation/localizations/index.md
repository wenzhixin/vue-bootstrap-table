---
title: Localizations
weight: 25
---

#### formatLoadingMessage

Parameter: none

Default: `'Loading, please wait…'`

---

#### formatRecordsPerPage

Parameter: pageNumber

Default: `'Showing %s to %s of %s rows'`

---

#### formatShowingRows

Parameter: pageFrom, pageTo, totalRows

Default: `'Showing %s to %s of %s rows'`

---

#### formatDetailPagination

Parameter: totalRows

Default: `'Showing %s rows'`

---

#### formatSearch

Parameter: none

Default: `'Search'`

---

#### formatNoMatches

Parameter: none

Default: `'No matching records found'`

---

#### formatRefresh

Parameter: none

Default: `'Refresh'`

---

#### formatToggle

Parameter: none

Default: `'Toggle'`

---

#### formatColumns

Parameter: none

Default: `'Columns'`

---

#### formatAllRows

Parameter: none

Default: `'All'`

---

**PS:**

We can import [all locale files](https://github.com/wenzhixin/vue-bootstrap-table/tree/develop/src/locales) what you need:

```html
<script src="vue-bootstrap-table-en-US.js"></script>
<script src="vue-bootstrap-table-zh-CN.js"></script>
...
```

And then use `options.locale` to set locale: [Example](/examples/locale/).
