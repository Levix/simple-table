### tableProps：
| 名称 | 说明 | 类型 | 默认值 | 备注 |
| :------: | :------: | :------: | :------: | :------: |
| options | 表格配置 | Object{data: array} | {data: []} | - |
| pagination | 设置分页器 | boolean Object | false | false不启用分页器 |
| pageSize | 每页行数 | number | - | - |
| empty | 空数据时内容 | string | - | - |

### TableColumn：
| 名称 | 说明 | 类型 | 默认值 | 备注 |
| :------: | :------: | :------: | :------: | :------: |
| width | 列宽度 | number | - | - |
| title | 表头文本 | string | - | - |
| dataIndex | 数据在数据项中对应的路径 | string | - | - |
| sortable | 是否支持排序 | boolean | - | - |
| sortFunction | 自定义排序规则 | Function | - | - |