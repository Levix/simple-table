/**
 * @file 处理表格数据
 */

import { type TableColumn, type TableProps } from "../components/types";

export function useDataSource(props: TableProps, columns: TableColumn[]) {
  let tableData: any[][] = [];
  const { dataSource } = props;

  dataSource.forEach((data) => {
    const record: any[] = [];
    columns.forEach((column) => {
      record.push(data[column.key]);
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

function ascendSort(index) {
  return (a: any[], b: any[]) => {
    return a[index] - b[index];
  };
}
function descendSort(index) {
  return (a: any[], b: any[]) => {
    return b[index] - a[index];
  };
}

// function handleData(record: any) {
//     const dataKey = record.key ?? `WU_TABLE_KEY`;
//     const result: IHandleData = { record, dataKey }
//     return result;
// }

// function handleTableDataMap(handledData: IHandleData[], columns: TableColumn[], map: Map<string | number, IHandleData>) {
//     handledData.forEach(item => {
//         const { dataKey } = item;
//         map.set(dataKey, item);
//     })
// }

// interface IHandleData {
//     record: any;
//     dataKey: string | number;
// }
