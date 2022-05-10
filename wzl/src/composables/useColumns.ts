/**
 * @file 处理表格配置
 */

import { computed, toRefs } from "vue";
import { type TableProps, type TableColumn } from "../components/types";

export function useColumns(props: TableProps) {
    const handledColumns = computed(() => {
        const { columns } = toRefs(props);

        return handleColumns(columns.value);
    })
    /** 只处理一行列头的情况 */
    return { handledColumns };
}

/** 处理列配置columns */
function handleColumns(columns: TableColumn[]) {
    return columns.map((column, index) => getNewColumn(column, index))
}

/** 处理列配置 */
function getNewColumn(column: TableColumn, index: number) {
    const { key, align, sortable } = column;

    /** 处理空key和空align */
    const _key = key ?? `"WU_TABLE_KEY_"${index}`;
    const _align = align ?? "start";

    const newColumn = { ...column, key: _key, align: _align };
    if (sortable) {
        newColumn.sortable = { ...sortable };
    }
    return newColumn;
}