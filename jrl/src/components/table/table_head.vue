<script lang="ts" setup>
import { ref } from 'vue'
import TableSort from './table_sort.vue'
import { SortConfig } from '../types'
import { useInjector } from './store'
import { tableDataList } from './store/table'

let { tableColumnsConfig } = useInjector<any>(tableDataList)

const setTableSortRefs = ref(new Map())
/** todo 获取vue实例的类型 */
const tableSortRefs = (tableSortRef: InstanceType<any>) => {
	setTableSortRefs.value.set(tableSortRef.columnProp, tableSortRef)
}
let prevColumnProp = ref('')
/**
 * 处理点击排序事件
 *@param sortParams 排序配置参数
 */
const changeSortHandle = (sortParams: SortConfig) => {
	// 不是第一次点击 且点击的不是同一列就将上一列恢复为正常
	if (prevColumnProp.value && prevColumnProp.value !== sortParams.columnProp) {
		setTableSortRefs.value.get(prevColumnProp.value).resetSortStatus()
	}
	prevColumnProp.value = sortParams.columnProp
}
</script>
<template>
	<thead>
		<tr>
			<!-- 表列渲染 -->
			<th v-for="item in tableColumnsConfig.list" :key="item.id">
				<!-- 表格标题 -->
				{{ item.title }}
				<!-- 是否支持排序 -->
				<table-sort
					v-if="item.sortable"
					:column-prop="item.key"
					@change-sort="changeSortHandle"
					:ref="tableSortRefs"
				></table-sort>
			</th>
		</tr>
	</thead>
</template>
