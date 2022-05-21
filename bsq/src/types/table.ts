/**
 * @file table 相关类型声明文件
 */

import { ExtractPropTypes } from "vue"
import { paginationProps } from './pagination'

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
      data: [],

      // 分页配置
      paginationConfig: {
        type: Object,
        default: paginationProps.option
      }
    })
  },
} as const;

export type TableProps = ExtractPropTypes<typeof tableProps>;
