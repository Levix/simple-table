<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import SimpleTable from "./components/SimpleTable";
import { onMounted ,ref} from "@vue/runtime-dom";
import { getList } from "./api/index";
import JTable from "./components/table/index.vue"

type TableDataType = {
    date: string,
    name: string,
    address: string,
}
let tableData =ref<TableDataType[]>([])

const column =ref([
  {
    id:1,
    key: "name",
    title:"名字",
  },
  {
    id:2,
    key: "address",
    title:"地址",
    sortable:true,
  },
  {
    id:3,
    key: "date",
    title:"日期",
    sortable:true,
  },
])

 onMounted(async () => {
        let data= await getList<TableDataType[]>()
        tableData.value=data
  })
</script>

<template>
  <!-- <SimpleTable /> -->
  <j-table :data-list="tableData" :table-column="column"/>
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
