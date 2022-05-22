<script lang="ts" setup>
import {
  defineProps,
  provide,
  PropType,
  watch,
  toRef,
  ref,
  computed,
} from 'vue'
import { GLOBAL_TABLE_TOKEN, STATUS_TOKEN } from './const'
import { TableColumn, SortConfig } from '../types'
import TableHead from './table_head.vue'
import TableBody from './table_body.vue'
import TableFoot from './table_foot.vue'

import { changePageLimitHandle } from './hooks/pageination'
import { useSortHandle } from './hooks/sort'

/**所有表格数据 */
let tableProps = defineProps({
  dataList: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  tableColumn: {
    type: Array as PropType<TableColumn[]>,
    default: () => [],
  },
})
const dataList = toRef(tableProps, 'dataList')
const tableColumn = toRef(tableProps, 'tableColumn')
const currentPage = ref(0)

/** 克隆一份表格数据 */
let tableListData = ref<any[]>([])
watch([dataList, currentPage], () => {
  tableListData.value = changePageLimitHandle(dataList.value, currentPage.value)
})

/** 全局表格数据 */
provide(GLOBAL_TABLE_TOKEN, {
  tableData: computed(() => tableListData.value),
  tableColumnsConfig: tableColumn.value,
})

/** 处理表格排序事件 */
function onSortHandle(sortToken: SortConfig) {
  let data =
    sortToken.status === STATUS_TOKEN.normal
      ? changePageLimitHandle(dataList.value, currentPage.value)
      : tableListData.value
  tableListData.value = useSortHandle(sortToken, data)()
}
</script>

<template>
  <table class="table table-bordered table-striped">
    <table-head @change-sort="onSortHandle"></table-head>
    <table-body></table-body>
    <table-foot
      v-model:currentPage="currentPage"
      :total="dataList.length"
      :limit-page="4"
    ></table-foot>
  </table>
</template>

<style></style>
