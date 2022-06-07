<script setup lang="ts">
import { reactive } from '@vue/reactivity'
import { getTableApi } from './api/table'
import { onBeforeMount, watch } from '@vue/runtime-core'
import type { AllParamsType, TableOptionType } from './types/app'
import useTableSearch from './hooks/useTableSearch'
import SimpleTable from './components/SimpleTable'

// 下发参数集
const { allParams, onSearch, handleSort, updateCurPage } = useTableSearch()

// table 展示列配置
const COLUMNS = [
  {
    title: 'ID',
    dataKey: 'id',
    sortable: true
  },
  {
    title: '姓名',
    dataKey: 'name'
  },
  {
    title: '年龄',
    dataKey: 'age',
    sortable: true
  },
  {
    title: '爱好',
    dataKey: 'hobby'
  }
]

// table option配置
let tableOption = reactive({
  /**
   * 排序是否是支持多个: 默认值 false
   * 1 false: 单个字段进行排序
   * 2 true: 多个字段进行排序（这种场景很特殊）
   */
  // isMultiSort: true,

  /**
   * 是否是本地排序: 默认值 false
   *  1 true: 当前界面排序，非接口排序
   *  2 fasle: 接口排序，数据库排序
   */
  // isLocalSort: true,

  // 列配置
  columns: COLUMNS,

  // 数据源
  data: [],

  // 分页的配置
  paginationConfig: {}
} as TableOptionType)

// 数据请求
const initData = async (params: AllParamsType) => {
  let res = await getTableApi(params)
  if (res.code !== 200) {
    // 控制台抛出接口异常msg
    window.console.error(res.msg)
    return
  }
  let { data, total, limit } = res
  tableOption.data = data
  tableOption.paginationConfig = {
    total,
    limit
  }
}

watch(allParams, () => {
  initData(allParams.value)
})

// 处理刷新
const onRefresh = () => {
  window.console.log('点击刷新按钮，重新请求数据')
  initData(allParams.value)
}

// 模拟异步请求
onBeforeMount(() => {
  initData(allParams.value)
})
</script>

<template>
  <simple-table
    :option="tableOption"
    @handle-sort="handleSort"
    @update-cur-page="updateCurPage"
    @on-refresh="onRefresh"
    @on-search="onSearch"
  >
    <div>我是操作栏左侧自定插槽内容</div>
  </simple-table>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px;
}
</style>
