import { ComputedRef, InjectionKey, ExtractPropTypes, PropType, Ref } from "vue";

/** 列配置类型 */
export interface TableColumn {
  value: string | number;
  align?: "start" | "end";
  width?: string | number;
  title?: string;
  sortable?: TableColumnSortable;
}

export interface TableColumnSortable<T = any> {
  orderBy?: String;
  sorter?: (curr: T, next: T) => number;
}


export type TableProps = {
  dataList: Array<any>;
  columns: Array<TableColumn>;
}

export interface TableToken {
  dataList: any[];
  columns: TableColumn[];
}

export const TABLE_TOKEN: InjectionKey<TableToken> = Symbol("TABLE_TOKEN");