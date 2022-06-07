import { ExtractPropTypes, ComputedRef, Ref } from 'vue'
import { STATUS_TOKEN } from './table/const'

/** 列配置类型 */
export interface TableColumn {
	id: number

	key: string

	title: string

	sortable?: boolean
}

/** 排序的3中规则 */
export type SortKeyType = STATUS_TOKEN

export type SortConfig = {
	status: SortKeyType
	columnProp: string
}

/** 表格注入全局数据类型 */
export interface TableToken {
	tableData: Ref<any[]>

	tableColumnsConfig: Ref<TableColumn[]>

	[key: string]: any
}
