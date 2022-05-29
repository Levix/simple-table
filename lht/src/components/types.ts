import { ComputedRef, InjectionKey, ExtractPropTypes, PropType, Ref } from "vue";

/** 列配置类型 */
export interface TableColumn {
  // TODO 参考一下业界的名称定义
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

export interface SortOptions {
  dataIndex: string,
  sortBy: string
}

export interface PageOptions {
  pagenumber: number,
  pageSize: number
}

export type TableProps = {
  dataList: Record<string, any>;
  columns: TableColumn[];
}