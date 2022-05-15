<script  lang="ts" setup>
import {  
    defineProps,
    provide,
    PropType,  
    watch,
    toRef,
    ref,
    computed} from "vue";
import { GLOBAL_TABLE_TOKEN, 
              STATUS_TOKEN} from "./const";
import { TableColumn,
              SortConfig } from "../types";
import TableHead from "./table_head.vue";
import TableBody from "./table_body.vue"
import TableFoot from "./table_foot.vue"

import {  sortHandle  } from  "./util/sort"
import {  changePageHandle } from  "./util/pagination"
import { chunk } from "lodash-es";
    
/**所有表格数据 */
let tableProps =defineProps({
    dataList:{
        type: Array as PropType<any[]>,
        default:()=>([])
    },
    tableColumn:{
        type: Array as PropType<TableColumn[]>,
        default:()=>([])
    }
})
const dataList = toRef(tableProps,'dataList');
const tableColumn = toRef(tableProps,'tableColumn');
const currentPage = ref(0)

/** 克隆一份表格数据 */
let tableListData =ref<any[]>([])
watch([dataList,currentPage],()=>{
    tableListData.value =  changePageHandle( dataList.value,currentPage.value)
})

/** 全局表格数据 */
provide(GLOBAL_TABLE_TOKEN,{
    tableData:computed(()=>tableListData.value),
    tableColumnsConfig:tableColumn.value
});

/** 处理表格排序事件 */
function onSortHandle(sortToken:SortConfig,){
    let data =sortToken.status ===STATUS_TOKEN.normal?changePageHandle( dataList.value,currentPage.value):tableListData.value
   tableListData.value= sortHandle(sortToken,data)
}

</script>

<template>
  <table  width="90%"
               border="1"
               cellspacing="0"
               cellpadding="4"
               align="center">
      <table-head @change-sort="onSortHandle"></table-head>
      <table-body></table-body>
      <table-foot @change-current="currentPage=$event"></table-foot>
  </table>
</template>

<style>

</style>