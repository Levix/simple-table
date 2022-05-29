import { cloneDeep, sortBy, reverse } from 'lodash'
import { SortOptions } from "../types";

function ascendSortHandle (sortOptions:SortOptions,tableData:Record<string, any>){
    return sortBy(tableData,sortOptions.dataIndex)
}

function descendSortHandle (sortOptions:SortOptions,tableData:Record<string, any>){
    let sortList = sortBy(tableData,sortOptions.dataIndex)
    return  reverse(sortList)
 }
 
 function normalSortHandle (tableData:Record<string, any>){
    let sortList = cloneDeep(tableData)
    return  sortList
 }

 export function handleSort(sortOptions:SortOptions,tableData:Record<string, any>) {
    switch (sortOptions.sortBy) {
        case "ascend":
          return (ascendSortHandle(sortOptions, tableData));
        case "descend":
          return (descendSortHandle(sortOptions, tableData));
        case "normal":
          return(normalSortHandle(tableData));
        default:
          break;
      }
 }