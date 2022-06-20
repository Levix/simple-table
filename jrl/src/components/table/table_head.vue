<script lang="ts" setup>
import TableSort from './table_sort.vue'
import { SortConfig } from '../types'
import { useColumnsConfigStoreForSetup } from './store/source_data'
import { storeToRefs } from 'pinia'

let { getColumnData } = storeToRefs(useColumnsConfigStoreForSetup())
</script>
<template>
	<thead>
		<tr>
			<!-- 表列渲染 -->
			<th v-for="(item, index) in getColumnData" :key="'th-' + index">
				<!-- 表格标题 -->
				{{ item.title }}
				<!-- 是否支持排序 -->
				<table-sort v-if="item.sortable" :column-prop="item.key"></table-sort>
			</th>
		</tr>
	</thead>
</template>
