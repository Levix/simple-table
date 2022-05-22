import { SortConfig, SortKeyType } from "../../types"
import {  STATUS_TOKEN } from '../const'
import {
    cloneDeep,
    sortBy,
    reverse
} from 'lodash'

/**
 * 排序处理方法
 * @param { "normal" | "ascend" | "descend" } sortConfig 排序规则
 * @param { Array } tableData  表格数据
 * @returns 
 */
export function useSortHandle(sortConfig: SortConfig, tableData: any[]) {

    function normalSortHandle() {
        let sortList = cloneDeep(tableData)
        return sortList
    }

    function descendSortHandle() {
        let sortList = sortBy(tableData, sortConfig.columnProp)
        return reverse(sortList)
    }

    function ascendSortHandle() {
        return sortBy(tableData, sortConfig.columnProp)
    }
    let sortMethodMap =  {
        [STATUS_TOKEN.ascend]:ascendSortHandle,
        [STATUS_TOKEN.descend]:descendSortHandle,
        [STATUS_TOKEN.normal]:normalSortHandle
    }
    
    return sortMethodMap[sortConfig.status]
}



