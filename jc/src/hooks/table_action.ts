/**
 * @file 表格数据的部分处理方法
 */

import { computed, ref, watch } from "@vue/composition-api";
import { sortBy, cloneDeep } from 'lodash';

interface PageOptions {

    /** 是否显示分页 */
    showPagination: boolean;

    /** 每页的数量 */
    pageSize: number;

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
 * 根据分页和排序 处理表格数据
 * @param {Object} pageOptions 分页处理的相关数据
 * @returns 返回列表显示的数据
 */
export function useHandleData (pageOptions: PageOptions) {
    let { showPagination, pageSize, activeNum, sortDirection, sortIndex, tableData } = pageOptions;

    // 备份一份需要进行排序的数据
    let sortedData = ref(cloneDeep(tableData));

    // 当前页展示的数据
    let showData = computed(() => {

        // 如果不需要分页，则一次性展示所有数据
        if (!showPagination) {
            window.console.log(`不需要分页, 页面显示数据为 ${sortedData.value}`);
            return sortedData.value;
        }

        // 根据当前激活页和每页显示长度来切割显示哪部分数据
        return sortedData.value.slice(
            activeNum.value * pageSize,
            activeNum.value * pageSize + pageSize
        );
    });

    // 监听排序状态有没有发生改变，发生改变则重新触发数据排序
    watch(() => sortDirection.value, () => {
        window.console.log(`当前排序为 ${sortDirection.value}, 排序字段为 ${sortIndex.value}`);
        sortChange(sortDirection.value, sortIndex.value);
    });

    // 排序数据
    function sortChange(sortDirection: string, dataIndex: string) {
        if (!sortDirection) {

            // 如果取消排序，则给数据赋值一份原来的表格数据
            sortedData.value = JSON.parse(JSON.stringify(tableData));
            window.console.log('排序取消, 页面数据重置为原始数据');
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
    return { showData };
}

export function useSort () {
    let sort = ref('');
    let sortIndex = ref('');

    function sortData (order: string, dataIndex: string) {

        // 判断两次点击的排序方向是否一致，如果一致则取消排序
        if (order === sort.value) {
            window.console.log(`两次排序点击方向一致, 均为 ${sort.value} 取消排序`);
            sort.value = '';
        } else {

            window.console.log(`排序成功, 排序方向为 ${order} `);

            // 设置排序方向的值
            sort.value = order;
        }

        // 改变当前排序的字段
        window.console.log(`排序字段为 ${dataIndex} `);
        sortIndex.value = dataIndex;
    }

   return { sortData, sort, sortIndex };
}
