import { ExtractPropTypes, InjectionKey, PropType } from "vue";

export type TableDataSourceType = Record<string, any>

/** 传进 WuTable 的 props 都在此定义 */
export const tableProps = {
	dataSource: {
		type: Array as PropType<TableDataSourceType[]>,
		default: () => [],
	},
	columns: {
		type: Array as PropType<TableColumns[]>,
		default: () => [],
	},
	pageSize: {
		type: Number,
		default: 5
	}
} as const;

/** 列配置类型 */
export interface TableColumns {
	key: string | number;
	align?: "left" | "right" | "center";
	width?: string | number;
	title?: string;
	sortable?: TableColumnSortable;
}

/** 排序配置的类型 */
export interface TableColumnSortable<T = any> {
	orderBy?: OrderByType;
	sorter?: (curr: T, next: T) => number;
}

/** 排序方式 */
export type OrderByType = '' | 'asc' | 'desc' | 'ASC' | 'DESC';

/** table_token的类型 */
export interface TableToken {
	sortData: any[][];
	columns: TableColumns[];
	pageSize: number;
}

export interface BodyOptionType {
	sortData: TableDataSourceType[][],
	tableData: TableDataSourceType[][],
	columns: TableColumns[],
	sortOption: SortOptionType,
	pageSize: number,
	curPageNumber: number,
}

export type FootOptionType = Pick<BodyOptionType, 'sortData' | 'pageSize'>

export interface SortOptionType {
	ikey: string | number,
	sortStatus: OrderByType,
}

export const TABLE_TOKEN: InjectionKey<TableToken> = Symbol("TABLE_TOKEN");

export type TableProps = ExtractPropTypes<typeof tableProps>;
