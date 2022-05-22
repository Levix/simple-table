<script lang="ts" setup>
import { inject,  ref } from 'vue'
import { GLOBAL_TABLE_TOKEN } from './const'
import TableSort from './table_sort.vue'
import  TableSortType from './table_sort.vue'
import { SortConfig } from '../types'

const { tableColumnsConfig } = inject(GLOBAL_TABLE_TOKEN)!

/**处理点击排序事件 start */

let changeSortEmit = defineEmits(['change-sort'])
const setTableSortRefs = ref(new Map())
const tableSortRefs = (tableSortRef:InstanceType<typeof TableSortType>) => {
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
    // 点击排序发送排序事件
  changeSortEmit('change-sort', sortParams)
}
/**处理点击排序事件 end */
</script>
<template>
  <thead>
    <tr>
      <!-- 表列渲染 -->
      <th v-for="item in tableColumnsConfig" :key="item.id">
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
