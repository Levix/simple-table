import { ExtractPropTypes, InjectionKey, PropType } from "vue";

/** 列配置类型 */
export interface TableColumn {
  key: string | number;
  align?: "left" | "right" | "center";
  width?: string | number;
  title?: string;
  sortable?: TableColumnSortable;
}

export interface TableColumnSortable<T = any> {
  orderBy?: OrderByType;
  sorter?: (curr: T, next: T) => number;
}

/** 传进 WuTable 的 props 都在此定义 */
export const tableProps = {
  dataSource: {
    type: Array as PropType<Record<string, any>[]>,
    default: () => [],
  },
  columns: {
    type: Array as PropType<TableColumn[]>,
    default: () => [],
  },
} as const;

export type TableProps = ExtractPropTypes<typeof tableProps>;

export interface TableToken {
  sortData: any[][];
  handledColumns: TableColumn[];
}

export const TABLE_TOKEN: InjectionKey<TableToken> = Symbol("TABLE_TOKEN");

export type OrderByType = '' | 'asc' | 'desc' | 'ASC' | 'DESC';
