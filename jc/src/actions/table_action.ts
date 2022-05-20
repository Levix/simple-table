/**
 * @file 表格数据的部分处理方法
 */

import { computed, Ref, ref, watch } from "@vue/composition-api";
import { sortBy, cloneDeep } from 'lodash';

interface PageOptions {

    /** 是否显示分页 */
    showPagination: boolean;

    /** 每页的数量 */
    pageDataLength: number;

    /** 当前页面 */
    activeNum: number;

    /** 升序还是降序 */
    sortDirection: string;

    /** 排序 */
    sortIndex: string;

    /** 表格数据 */
    tableData: any[];
}

/**
 * 处理排序的表格数据
 * @param {Object} pageOptions 分页处理的相关数据
 * @returns 显示的数据
 */
export function useSortData (pageOptions: PageOptions) {
    let { showPagination, pageDataLength, activeNum, sortDirection, sortIndex, tableData } = pageOptions;

    // 备份一份需要进行排序的数据
    let sortedData = ref(cloneDeep(tableData));

    // 当前页展示的数据
    let shownData = computed(() => {

        // 如果不需要分页，则一次性展示所有数据
        if (!showPagination) {
            return sortedData.value;
        }

        // 根据当前激活页和每页显示长度来切割显示哪部分数据
        return sortedData.value.slice(
            activeNum.value * pageDataLength,
            activeNum.value * pageDataLength + pageDataLength
        );
    });

    // 监听排序状态有没有发生改变，发生改变则重新触发数据排序
    watch(() => sortDirection.value, () => {
        sortChange(sortDirection.value, sortIndex.value);
    });

    // 排序数据
    function sortChange(sortDirection: string, dataIndex: string) {
        if (!sortDirection) {

            // 如果取消排序，则给数据赋值一份原来的表格数据
            sortedData.value = JSON.parse(JSON.stringify(tableData));
            return;
        }

        // 正常排序，传入排序方向和排序字段
        sortedData.value = compare(sortDirection, dataIndex);
    }

    // 排序对比函数
    function compare(order: string, dataIndex: string) {
        return order === "ASC"
            ? sortBy(sortedData.value, dataIndex)
            : sortBy(sortedData.value, dataIndex).reverse();
    }
    return { shownData };
}
