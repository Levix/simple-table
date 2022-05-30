<script lang="ts" setup>
import { extend } from 'lodash'
import { inject, ref, toRef, watch, InjectionKey } from 'vue'
import { TableToken } from '../types'
import { GLOBAL_TABLE_TOKEN } from './const'
import { useInjector } from './store'
import { tableDataList } from './store/table'

let { displayTableList, tableColumnsConfig } = useInjector<any>(tableDataList)
</script>

<template>
	<tbody>
		<!-- 渲染所有表格行 -->
		<tr v-for="bodyItem in displayTableList.list">
			<!-- 渲染表某一行中所有列 -->
			<td v-for="colItem in tableColumnsConfig.list">
				{{ bodyItem[colItem.key] }}
			</td>
		</tr>
	</tbody>
</template>
