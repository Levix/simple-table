### table

| 名称             | 说明     | 类型             | 默认值  | 备注   |
| -------------- | ------ | -------------- | ---- | ---- |
| columns        | 表格列    | Array          | []   |      |
| data           | 表格数据   | Array          | []   |      |
| needHeader     | 是否需要表头 | Boolean        | true |      |
| showPagination | 是否显示分页 | Boolean        | true |      |
| tcolumns   | 表格列配置   | table-header配置 |      |      |
| pagination     | 分页配置   | pagination配置   |      |      |
|                |        |                |      |      |

### table-columns

| 名称          | 说明                        | 类型                   | 默认值   | 备注   |
| ----------- | ------------------------- | -------------------- | ----- | ---- |
| label       | 显示的标题                     | string               | -     | ---  |
| prop        | 对应列内容的字段名                 | string               |       |      |
| columns     | 表格列                       | Array                | -     | ---  |
| sortable    | 对应列是否可以排序                 | boolean              | FALSE |      |
| sort-method | 需返回一个数字，和 Array.sort 表现一致 | (pre,next)=>  number |       |      |


### pagination

| 名称          | 说明        | 类型       | 默认值  | 备注   |
| ----------- | --------- | -------- | ---- | ---- |
| activeNum   | 当前页面      | Number   | 0    | ---  |
| onPrevClick | 点击上一页时触发  | Function | ---  | ---  |
| onNextClick | 点击下一页时触发  | Function | ---  | ---  |
| onPageClick | 点击某个页面时触发 | Function | ---  | ---  |
| pageTotal   | 分页总数      | Number   | 0    | ---  |
| pages       | 分页的数据     | Array    | []   | ---  |
