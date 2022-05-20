import { SortConfig } from "../../types"
import { cloneDeep,
              sortBy,
              reverse } from 'lodash'
import { STATUS_TOKEN } from "../const"

function ascendSortHandle (sortConfig:SortConfig,tableData:any[]){
    return sortBy(tableData,sortConfig.columnProp)
}

function descendSortHandle (sortConfig:SortConfig,tableData:any[]){
    let sortList = sortBy(tableData,sortConfig.columnProp)
    return  reverse(sortList)
 }
 
 function normalSortHandle (sortConfig:SortConfig,tableData:any[]){
    let sortList = cloneDeep(tableData)
    return  sortList
 }


export function sortHandle(sortConfig:SortConfig,tableData:any[]){
    let sortRule = {
        [STATUS_TOKEN.ascend]: ascendSortHandle,
        [STATUS_TOKEN.descend]: descendSortHandle,
        [STATUS_TOKEN.normal]: normalSortHandle
    }
    return sortRule[sortConfig.status](sortConfig,tableData)
}

