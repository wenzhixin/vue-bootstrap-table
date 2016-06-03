---
title: Localizations
weight: 25
---

#### formatLoadingMessage

Parameter: none

Default: `'Loading, please wait…'`

<hr>

#### formatRecordsPerPage

Parameter: pageNumber

Default: `'Showing %s to %s of %s rows'`

<hr>

#### formatShowingRows

Parameter: pageFrom, pageTo, totalRows

Default: `'Showing %s to %s of %s rows'`

<hr>

#### formatDetailPagination

Parameter: totalRows

Default: `'Showing %s rows'`

<hr>

#### formatSearch

Parameter: none

Default: `'Search'`

<hr>

#### formatNoMatches

Parameter: none

Default: `'No matching records found'`

<hr>

#### formatRefresh

Parameter: none

Default: `'Refresh'`

<hr>

#### formatToggle

Parameter: none

Default: `'Toggle'`

<hr>

#### formatColumns

Parameter: none

Default: `'Columns'`

<hr>

#### formatAllRows

Parameter: none

Default: `'All'`

---

**PS:**

We can import [all locale files](https://github.com/wenzhixin/vue-bootstrap-table/tree/master/src/locale) what you need:

```html
<script src="vue-bootstrap-table-en-US.js"></script>
<script src="vue-bootstrap-table-zh-CN.js"></script>
...
```

And then use `options.locale` to set locale: Example.
