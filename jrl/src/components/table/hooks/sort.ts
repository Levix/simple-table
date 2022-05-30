import { cloneDeep, sortBy } from 'lodash'

import { useInjector } from '../store'
import { tableDataList } from '../store/table'

let { displayTableList, setDisplayTableList, tableData } = useInjector<any>(tableDataList, 'root')

/**
 * 排序处理方法
 * @param  columnProp 跟据那个属性排序规则
 * @returns
 */
export function useSortHandle(columnProp: string) {
	function normalSortHandle() {
		let sortList = cloneDeep(tableData.list)
		setDisplayTableList(sortList)
	}

	function descendSortHandle() {
		let sortList = sortBy(displayTableList.list, columnProp).reverse()
		setDisplayTableList(sortList)
	}

	function ascendSortHandle() {
		let sortList = sortBy(displayTableList.list, columnProp)
		setDisplayTableList(sortList)
	}

	return {
		ascendSortHandle,
		descendSortHandle,
		normalSortHandle
	}
}
