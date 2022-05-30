import { Ref } from 'vue'

/**
 * 控制分页逻辑
 * @param {number}  limit 限制每页多少行
 * @param {Ref<number>}  currentPage 当前页
 * @param {Ref<number>}  maxPageCount  最大页数
 *  */
export function usePageination(limit: number, currentPage: Ref<number>, maxPageCount: Ref<number>) {
	function prePageHandle() {
		if (currentPage.value <= 1) {
			return
		}
		currentPage.value--
	}

	function nextPageHandle() {
		if (currentPage.value >= maxPageCount.value) {
			return
		}
		currentPage.value++
	}

	return {
		prePageHandle,
		nextPageHandle
	}
}
