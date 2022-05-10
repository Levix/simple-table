<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { reactive } from '@vue/reactivity'
import SimpleTable from './components/SimpleTable'

const tableOption = reactive({

  // 排序是否是支持多个
  // isMultiSort: true,

  // 是否是本地排序：当前界面排序，非接口排序
  isLocalSort: true,

  // 列配置
  columns: [
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
  ],

  // 数据源
  data: [
    {
      id: '1111',
      name: '张三',
      age: '18',
      hobby: '打篮球'
    },
    {
      id: '3333',
      name: '王五',
      age: '26',
      hobby: '打羽毛球'
    },
    {
      id: '2222',
      name: '李四',
      age: '20',
      hobby: '踢足球'
    }
  ]
})

const hanleSort = sortParams => {

  // 这里处理远程排序参数下发请求
  window.console.log('sortParams: ', sortParams)
}

const updateCurPage = curPage => {

  // 这里处理远程当前页参数下发请求
  window.console.log('curPage: ', curPage)
}
</script>

<template>
  <simple-table :option="tableOption" 
                @hanle-sort="hanleSort"
                @update-cur-page="updateCurPage" />
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
