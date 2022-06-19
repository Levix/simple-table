<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useColumnsConfigStoreForSetup, useSourceStoreForSetup } from './store/source_data'

let { getSource } = storeToRefs(useSourceStoreForSetup())
let { getColumnData } = storeToRefs(useColumnsConfigStoreForSetup())
</script>

<template>
	<tbody>
		<!-- 渲染所有表格行 -->
		<tr v-for="(bodyItem, trIndex) in getSource" :key="'tr-index' + trIndex">
			<!-- 渲染表某一行中所有列 -->
			<td v-for="(colItem, tdIndex) in getColumnData" :key="'td-index' + tdIndex">
				{{ bodyItem[colItem.key] || '-' }}
			</td>
		</tr>
	</tbody>
</template>
