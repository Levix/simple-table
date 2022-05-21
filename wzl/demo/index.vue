<script setup lang="ts">
import WuTable from "../src";
import { getGridDataApi } from "../demo/index";
import { onMounted, reactive } from "vue";
import { TableColumns } from "../src";

const columns: TableColumns[] = [
	{
		title: "Name",
		key: "name",
	},
	{
		title: "Age",
		key: "age",
		width: 100,
		align:'center',
		sortable: {
			orderBy: "DESC",
			sorter: (curr, next) => next - curr,
		},
	},
	{
		title: "Address",
		key: "address",
	},
	{
		title: "Tags",
		key: "tags",
	},
];

const tableOption = reactive({
	data: [],
	pageSize: 1,
});

onMounted(() => {
	initTableOption();
});

const initTableOption = async () => {
	const result: any = await getGridDataApi();
	console.log(result, "接口数据");

	if (result.status === 200) {
		tableOption.data = result.data;
		tableOption.pageSize = result.pageSize;
	}
};
</script>

<template>
	<WuTable
		:dataSource="tableOption.data"
		:columns="columns"
		:pageSize="tableOption.pageSize"
	/>
</template>
