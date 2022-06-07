/**
 * @file mock数据
 */

// 正常分页数据
export const paginationProps = {
  // 总条数
  total: 100,

  // 每页展示条数
  limit: 10,

  // 当前页
  currentPage: 1,

  // 连续显示最大长度： 1,2,3,4,5
  showMaxLength: 5,
}

// 正常table表格数据
export const tableProps = {
  // 是否支持多个参数同时排序
  isMultiSort: false,

  // 是否是本地排序：当前界面排序，非接口排序；默认接口排序
  isLocalSort: false,

  // 列配置
  columns: [
    {
      // 标题
      title: '姓名',

      // 对应接口字段
      dataKey: 'name',

      // 是否排序
      sortable: false
    }, {
      title: '年龄',
      dataKey: 'age',
      sortable: true
    }
  ],

  // 表格数据来源
  data: [{
    name: '小同学',
    age: 18,
    des: '班长'
  }, {
    name: '大同学',
    age: 19,
    des: '副班长'
  }],

  // 分页配置
  paginationConfig: paginationProps
}