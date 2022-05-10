/**
 * @file 处理表格数据
 */

import { Ref } from "vue";
import type { TableColumn } from "../components/types";
import { ascendSort, descendSort } from './useDataSort';
import { cloneDeep } from "lodash";

export const useDataSource = (
    dataSource: Ref<any[]>,
    columns: TableColumn[]
) => {
    const tableData: any[][] = [];

    dataSource.value.forEach((data) => {
        const record: any[] = [];
        columns.forEach((column) => {
            record.push(data[column.key]);
        });
        tableData.push(record);
    });
    let sortData: any[][] = cloneDeep(tableData);

    for (let i = 0; i < columns.length; i++) {
        if (columns[i].sortable?.orderBy === "asc" || "ASC") {
            sortData = tableData.sort(ascendSort(i));
            break;
        } else if (columns[i].sortable?.orderBy === "desc" || "DESC") {
            sortData = tableData.sort(descendSort(i));
            break;
        }
    }
    return { sortData };
};
