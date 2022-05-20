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
     
     return { handledColumns };
 }
 
 /** 处理列配置columns */
 function handleColumns(columns: TableColumn[]) {
     return columns.map((column, index) => {
        if (column.value) {
            const newColumn = { ...column } as TableColumn
            if (column.sortable) {
                newColumn.sortable = { ...column.sortable };
            }
    
            return newColumn;
         }
    
         return { ...column, value: index };
     })
 }