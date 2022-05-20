/**
 * @file 类型声明
 * @description 组件里面暂时没做类型校验。。。
 */

import ExtractPropTypes from "vue";

//  定义 Props
export const tableProps = {

    /**
     * 表格列
     */
    columns: {
        type: Array,
        default: () => [],
        required: true
    },

    /**
     * 表格数据
     */
    tableData: {
        type: Array,
        default: () => []
    },

    /**
     * 是否根据某个字段排序
     */
    defaultSort: {
        type: String,
        default: ''
    },

    /**
     * 默认是升序还是降序
     */
    sortDirection: {
        type: String,
        default: ''
    },

    /**
     * 是否需要表格头部
     */
    needHeader: {
        type: Boolean,
        default: true
    },

    /**
     * 是否显示分页
     */
     showPagination: {
        type: Boolean,
        default: true
    },

    /**
     * 一页展示多少行
     */
     pageDataLength: {
        type: Number,
        default: 5
    }
}

// table-body的props
export const tableBodyProps = {

    /**
     * 表格列
     */
    columns: {
        type: Array,
        default: () => [],
        required: true
    },

    /**
     * 表格数据
     */
    tableData: {
        type: <Object>Array,
        default: () => ([])
    },
}

// table-header的props
export const tableHeaderProps = {

    /**
     * 表格列
     */
    columns: {
        type: Array,
        default: () => [],
        required: true
    }
}

export interface TableColumn {
    label?: string;
    key: string;
    dataIndex: string;
    tip?: string;
    defaultWidth?: number;
    sortAble?: boolean;
}

export type TableProps = ExtractPropTypes<typeof tableProps>;
