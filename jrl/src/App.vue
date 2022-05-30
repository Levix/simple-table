<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import SimpleTable from "./components/SimpleTable";
import { onMounted, reactive, ref, watch } from '@vue/runtime-dom'
import { getList } from './api/index'
import JTable from './components/table/index.vue'
import TableFoot from './components/table/table_foot.vue'

type TableDataType = {
	date: string
	name: string
	address: string
}
let tableData = ref<TableDataType[]>([])

const column = ref([
	{
		id: 1,
		key: 'name',
		title: '名字'
	},
	{
		id: 2,
		key: 'address',
		title: '地址',
		sortable: true
	},
	{
		id: 3,
		key: 'date',
		title: '日期',
		sortable: true
	}
])
const tablePage = reactive({
	currentPage: 0,
	limit: 4
})

onMounted(async () => {
	let data = await getList<TableDataType[]>(tablePage.currentPage, 4)
	tableData.value = data
})

watch(tablePage, async () => {
	let data = await getList<TableDataType[]>(tablePage.currentPage, 4)
	tableData.value = data
})
</script>

<template>
	<j-table :data-list="tableData" :table-column="column">
		<template #pageination>
			<table-foot
				v-model:currentPage="tablePage.currentPage"
				:total="15"
				:limit-page="tablePage.limit"
			></table-foot>
		</template>
	</j-table>
</template>
