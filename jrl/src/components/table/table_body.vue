<script lang="ts" setup>
import { useInjector } from './store'
import { tableDataList } from './store/table_store'

let { displayTableList, tableColumnsConfig } = useInjector<any>(tableDataList)
</script>

<template>
	<tbody>
		<!-- 渲染所有表格行 -->
		<tr v-for="(bodyItem, index) in displayTableList.list" :key="index">
			<!-- 渲染表某一行中所有列 -->
			<td v-for="colItem in tableColumnsConfig.list" :key="colItem.id">
				{{ bodyItem[colItem.key] }}
			</td>
		</tr>
	</tbody>
</template>
