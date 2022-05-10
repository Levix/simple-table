import { ComputedRef, ExtractPropTypes, InjectionKey, PropType } from "vue";

/** 列配置类型 */
export interface TableColumn {
  key: string | number;
  align?: "start" | "end";
  width?: string | number;
  title?: string;
  sortable?: TableColumnSortable;
}

export interface TableColumnSortable<T = any> {
  orderBy?: "ascend" | "descend";
  sorter?: (curr: T, next: T) => number;
}

// export interface TableData {
//     key: string | number | symbol;
//     [key: string]: any;
// }

/** 传进 WuTable 的 props 都在此定义 */
export const tableProps = {
  dataSource: {
    type: Array as PropType<any[]>,
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
  handledColumns: ComputedRef<
    {
      key: string | number;
      align: "start" | "end";
      width?: string | number | undefined;
      title?: string | undefined;
      sortable?: TableColumnSortable<any> | undefined;
    }[]
  >;
}

export const TABLE_TOKEN: InjectionKey<TableToken> = Symbol("TABLE_TOKEN");
