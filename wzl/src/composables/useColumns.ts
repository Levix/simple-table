/**
 * @file 处理表格配置
 */

import { Ref } from "vue";
import type { TableColumn } from "../components/types";

export const useColumns = (columns: Ref<TableColumn[]>) => {
    const handledColumns = handleColumns(columns.value);
    /** 只处理一行列头的情况 */
    return { handledColumns };
}

/** 处理列配置columns */
const handleColumns = (columns: TableColumn[]) => {
    return columns.map((column, index) => getNewColumn(column, index));
}

/** 处理列配置 */
const getNewColumn = (column: TableColumn, index: number) => {
    const { key, align, sortable } = column;

    /** 处理空key和空align */
    const _key = key || `"WU_TABLE_KEY_"${index}`;
    const _align = align || "left";

    const newColumn = { ...column, key: _key, align: _align };
    if (sortable) {
        newColumn.sortable = { ...sortable };
    }
    return newColumn;
}
