/**
 * @file 处理表格数据
 */

import { computed, ComputedRef, Ref } from "vue";
import type { TableColumns, TableDataSourceType } from "../components/types";
import { ascendSort, descendSort } from '../components/utils';
import { cloneDeep, toLower } from "lodash";

export const useDataSource = (
	dataSource: Ref<TableDataSourceType[]>,
	columns: Ref<TableColumns[]>
) => {
	console.info(">>>>> coming useDataSource");
	console.info(">>>>> 原始表格数据", dataSource.value);

	/** 表格原始数据 */
	const tableData: ComputedRef<TableDataSourceType[][]> = computed(() => {
		if (dataSource.value.length === 0) {
			return [];
		}
		return dataSource.value.map(data => {
			const record: TableDataSourceType[] = [];
			for (const column of columns.value) {
				record.push(data[column.key])
			}
			return record;
		})
	})

	// 默认排序的展示数据
	const sortTableData = computed(() => {
		const cloneData = cloneDeep(tableData.value);
		const tempData = cloneDeep(tableData.value);
		if (cloneData.length === 0) {
			return [];
		}
		let flagIndex = 0;
		/** 根据列配置中的配置处理排序的数据 */
		const sortItem = columns.value.find((column, index) => {
			flagIndex = index
			return column.sortable?.orderBy;
		})

		if (sortItem) {
			switch (toLower(sortItem.sortable?.orderBy)) {
				case 'asc':
					cloneData.splice(0, cloneData.length);
					cloneData.push(...tempData.sort(ascendSort(flagIndex)));
					break;
				case 'desc':
					cloneData.splice(0, cloneData.length);
					cloneData.push(...tempData.sort(descendSort(flagIndex)));
					break;
				default:
					break;
			}
		}

		return cloneData;
	})

	return { tableData, sortTableData };
};
