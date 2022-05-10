import { ExtractPropTypes } from "vue";

export const tableProps = {
  option: {
    type: Object,
    default: () => ({
      // 是否支持多个参数同时排序
      isMultiSort: {
        type: Boolean,
        default: false
      },

      // 是否是本地排序：当前界面排序，非接口排序；默认接口排序
      isLocalSort: {
        type: Boolean,
        default: false
      },

      // 列配置
      columns: [
        {
          // 标题
          title: {
            type: String,
            default: ''
          },

          // 对应接口字段
          dataKey: {
            type: String,
            required: true,
          },

          // 是否排序
          sortable: {
            type: Boolean,
            default: false
          }
        }
      ],

      // 表格数据来源
      data: []
    })
  },
} as const;

export type TableProps = ExtractPropTypes<typeof tableProps>;

export const paginationProps = {
  // 总条数
  total: {
    type: Number,
    default: 1
  },

  // 每页展示条数
  limit: {
    type: Number,
    default: 10
  },

  // 当前页
  currentPage: {
    type: Number,
    default: 1
  },

  // 连续显示最大长度： 1,2,3,4,5
  showMaxLength: {
    type: Number,
    default: 5
  },
} as const;

export type PaginationProps = ExtractPropTypes<typeof paginationProps>;
