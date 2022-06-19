<script lang="ts" setup>
import { defineProps, PropType, watch, toRef } from 'vue'
import { TableColumn } from '../types'
import TableHead from './table_head.vue'
import TableBody from './table_body.vue'

import {
	useColumnsConfigStoreForSetup,
	useSourceStoreForSetup,
	useOriginSourceStoreForSetup
} from './store/source_data'

/**所有表格数据 */
let tableProps = defineProps({
	dataList: {
		type: Array as PropType<any[]>,
		default: () => []
	},
	tableColumn: {
		type: Array as PropType<TableColumn[]>,
		default: () => []
	}
})
const dataList = toRef(tableProps, 'dataList')
const tableColumn = toRef(tableProps, 'tableColumn')

let { updateSourceHandle } = useSourceStoreForSetup()
let { updateColumnsConfigHandle } = useColumnsConfigStoreForSetup()
let { initOriginSourceHandle } = useOriginSourceStoreForSetup()

watch([dataList, tableColumn], () => {
	initOriginSourceHandle(dataList.value)
	updateSourceHandle(dataList.value)
	updateColumnsConfigHandle(tableColumn.value)
})
</script>

<template>
	<table class="table table-bordered table-striped">
		<table-head></table-head>
		<table-body></table-body>
		<slot name="pageination"></slot>
	</table>
</template>
