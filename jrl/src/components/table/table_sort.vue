<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { STATUS_TOKEN } from './const'
import { SortKeyType } from '../types'
import { useInjector } from './store'
import { tableDataList } from './store/table'
import { useSortHandle } from './hooks/sort'

let { tableData } = useInjector<any>(tableDataList)
let headProps = defineProps({
	columnProp: {
		type: String,
		required: true
	}
})

let { ascendSortHandle, descendSortHandle, normalSortHandle } = useSortHandle(headProps.columnProp)

let changeSortEmit = defineEmits(['change-sort'])

/** 排序状态 正序 倒序 正常 */
const status = ref<SortKeyType>(STATUS_TOKEN.normal)

/** 当前列的排序状态统一管理 */
const statusText = {
	[STATUS_TOKEN.normal]: '正常',
	[STATUS_TOKEN.ascend]: '升序',
	[STATUS_TOKEN.descend]: '降序'
}

/** 根据相应状态显示对应文字 */
const showStatusText = computed(() => {
	return statusText[status.value]
})
/**  重置排序状态  */
const resetSortStatus = () => {
	status.value = STATUS_TOKEN.normal
}
watch(tableData, resetSortStatus)

/**点击排序改变排序状态 */
const headSortHandle = () => {
	switch (status.value) {
		case STATUS_TOKEN.normal:
			status.value = STATUS_TOKEN.ascend
			ascendSortHandle()
			break
		case STATUS_TOKEN.ascend:
			status.value = STATUS_TOKEN.descend
			descendSortHandle()
			break
		case STATUS_TOKEN.descend:
			status.value = STATUS_TOKEN.normal
			normalSortHandle()
			break
	}
	// 点击排序发送排序事件
	changeSortEmit('change-sort', {
		status: status.value,
		columnProp: headProps.columnProp
	})
}

defineExpose({
	columnProp: headProps.columnProp,
	resetSortStatus
})
</script>

<template>
	<a href="javascript:;" @click="headSortHandle">
		{{ showStatusText }}
	</a>
</template>
