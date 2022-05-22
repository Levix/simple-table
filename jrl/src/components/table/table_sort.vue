<script lang="ts" setup>
import { computed, inject, ref } from 'vue'
import {  STATUS_TOKEN } from './const'
import { SortKeyType } from '../types'

let headProps = defineProps({
  columnProp: {
    type: String,
    required: true,
  },
})
let changeSortEmit = defineEmits(['change-sort'])

/** 排序状态 正序 倒序 正常 */
const status = ref<SortKeyType>(STATUS_TOKEN.normal)
/** 当前列的排序状态统一管理 */

const statusText = {
  [STATUS_TOKEN.normal]: '正常',
  [STATUS_TOKEN.ascend]: '升序',
  [STATUS_TOKEN.descend]: '降序',
}

/** 根据相应状态显示对应文字 */
const showStatusText = computed(() => {
  return statusText[status.value]
})
 /**
   * 重置排序状态
   */
  const resetSortStatus = () => {
    status.value = STATUS_TOKEN.normal
  }
/** 发送排序事件 */


/**点击排序改变排序状态 */
const headSortHandle = () => {
  switch (status.value) {
    case STATUS_TOKEN.normal:
      status.value = STATUS_TOKEN.ascend
      break
    case STATUS_TOKEN.ascend:
      status.value = STATUS_TOKEN.descend
      break
    case STATUS_TOKEN.descend:
      status.value = STATUS_TOKEN.normal
      break
  }
  // 点击排序发送排序事件
  changeSortEmit('change-sort', {
    status: status.value,
    columnProp: headProps.columnProp,
  })
}
  defineExpose({ 
    columnProp: headProps.columnProp ,
    resetSortStatus
  })
</script>

<template>
  <!-- 是否支持排序 -->
  <a href="javascript:;" @click="headSortHandle">
    {{ showStatusText }}
  </a>
</template>
