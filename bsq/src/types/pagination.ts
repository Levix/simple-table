/**
 * @file 分页 相关类型声明文件
 */

import { ExtractPropTypes } from "vue"

export const paginationProps = {
  option: {
    type: Object,
    default: () => ({
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
    })
  }
} as const;

export type PaginationProps = ExtractPropTypes<typeof paginationProps>;
