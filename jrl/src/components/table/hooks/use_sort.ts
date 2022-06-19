import { cloneDeep, sortBy } from 'lodash'
import { Ref } from 'vue'

/**
 * 排序处理方法
 * @param  columnProp 跟据那个属性排序规则
 * @returns
 */
export function useSortHandle<T extends Ref>(sourceList: T, columnProp: string) {
	function normalSortHandle<T>(originList: Ref<T>) {
		sourceList.value = cloneDeep(originList.value)
	}

	function descendSortHandle() {
		sourceList.value = sortBy(sourceList.value, columnProp).reverse()
	}

	function ascendSortHandle() {
		sourceList.value = sortBy(sourceList.value, columnProp)
	}

	return {
		ascendSortHandle,
		descendSortHandle,
		normalSortHandle
	}
}
