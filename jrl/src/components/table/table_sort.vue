<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { STATUS_TOKEN } from './const'
import { SortKeyType } from '../types'
import { useSourceStoreForSetup, useOriginSourceStoreForSetup } from './store/source_data'
import { useSortHandle } from './hooks/use_sort'
import { storeToRefs } from 'pinia'
import { useSortStoreForSetup } from './store/sort_data'

let headProps = defineProps({
	columnProp: {
		type: String,
		required: true
	}
})

let { source, getSource } = storeToRefs(useSourceStoreForSetup())
let { getOriginSource } = storeToRefs(useOriginSourceStoreForSetup())
let { updateCurrentColumnHandle } = useSortStoreForSetup()
let { ascendSortHandle, descendSortHandle, normalSortHandle } = useSortHandle(
	source,
	headProps.columnProp
)

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

/**点击排序改变排序状态 */
const onHeadSortHandle = () => {
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
			normalSortHandle(getOriginSource)
			break
	}
	updateCurrentColumnHandle(headProps.columnProp)
}

let { getCurrentColumn } = storeToRefs(useSortStoreForSetup())
watch(getSource, () => {
	if (headProps.columnProp !== getCurrentColumn.value) {
		resetSortStatus()
	}
})
watch(getOriginSource, resetSortStatus)
</script>

<template>
	<a href="javascript:;" @click="onHeadSortHandle">
		{{ showStatusText }}
	</a>
</template>
