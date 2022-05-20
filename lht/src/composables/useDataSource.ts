/**
 * @file 处理表格数据
 */

 import { type TableColumn, type TableProps } from "../components/types";

 export function useDataSource(props: TableProps, columns: TableColumn[]) {
   let tableData: any[][] = [];
   const { dataList } = props;
 
   dataList.forEach((data) => {
     const record: any[] = [];
     columns.forEach((column) => {
       record.push(data[column.value]);
     });
     tableData.push(record);
   });
   let sortData: any[][] = tableData;
   for (let i = 0; i < columns.length; i++) {
     if (columns[i].sortable?.orderBy === "ascend") {
       sortData = tableData.sort(ascendSort(i));
       break;
     } else if (columns[i].sortable?.orderBy === "descend") {
       sortData = tableData.sort(descendSort(i));
       break;
     }
   }
   return { sortData };
 }
 
 function ascendSort(index: number) {
   return (a: any[], b: any[]) => {
     return a[index] - b[index];
   };
 }
 function descendSort(index: number) {
   return (a: any[], b: any[]) => {
     return b[index] - a[index];
   };
 }