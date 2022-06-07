/**
 * @file 处理表格配置
 */

import { computed } from "vue";
import { isNumber, isObject } from "lodash";
import type { TableColumns } from "../components/types";

export const useColumns = (columns: TableColumns[]) => {
	console.info(">>>>> coming useColumns");
	console.info(">>>>> 列配置", columns);
	const newColumns = computed(() => {
		return columns.map((column, index) => {
			return { ...handleColumns(column, index) };
		})
	})
	return { newColumns };
}


/** 处理列配置 */
const handleColumns = (column: TableColumns, index: number) => {
	const { key, align, width, title, sortable } = column;

	/** 处理空的字段 */
	const _key = key || `WU_TABLE_KEY_${index}`;
	const _align = align || "left";
	const _width = width ? (isNumber(width) ? `${width}px` : width) : "200px";
	const _title = title || `UnknownColumn_${index + 1}`;

	const newColumn = { ...column, key: _key, align: _align, width: _width, title: _title };
	if (isObject(sortable)) {
		newColumn.sortable = { ...sortable };
	}
	return newColumn;
}
