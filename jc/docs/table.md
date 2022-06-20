### table

| 名称 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| columns | 表格列 | Array | - | |
| tableData | 表格数据 | Array | - | |
| needHeader | 是否需要表头 | Boolean | true | |
| showPagination | 是否显示分页 | Boolean | true | |
| pageSize | 每页展示多少条数据 | Number | 5 | |

### table-header

| 名称 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| sortData | 排序方法 | Function | - | --- |
| sort | 排序类型：升序/降序 | - | --- | ASC | DESC |
| columns | 表格列 | Array | - | --- |


### pagination

| 名称 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| activeNum | 当前页面 | Number | 0 | --- |
| onPrevClick | 点击上一页时触发 | Function | --- | --- |
| onNextClick | 点击下一页时触发 | Function | --- | --- |
| onPageClick | 点击某个页面时触发 | Function | --- | --- |
| pageTotal | 分页总数 | Number | 0 | --- |
| pages | 分页的数据 | Array | [] | --- |
