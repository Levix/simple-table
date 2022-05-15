<script  lang="ts" setup>
import { inject,computed, ref,  watch } from "vue";
import { 
            GLOBAL_TABLE_TOKEN,
            PAGE_SIZE } from "./const"

let {tableData} = inject(GLOBAL_TABLE_TOKEN)!;
const $footEmit=defineEmits(['change-current']);

let currentPage = ref(0)

/** 当前页有多少条数据 */
let tableLength=computed(()=>{
    return tableData.value.length
})
/**一共有多少页 */
let pageCount=computed(()=>{
    return Math.ceil(tableData.value.length / PAGE_SIZE)
})


function prePageHandle(){
    if (currentPage.value<=0) {
        return
    }
    currentPage.value--;
}
function nextPageHandle(){
    if (currentPage.value>=pageCount.value) {
        return
    }
    currentPage.value++;
}
function currentPageHandle(e:any){
    currentPage.value= e?.target.value 
}
watch(currentPage,()=>{
    $footEmit('change-current',currentPage.value)
})
</script>

<template>
    <tfoot>
          <tr>
            <span>总页数：{{pageCount+1}}</span>
            <span>当前页: {{currentPage+1}}</span>
            <button @click="prePageHandle">
              前一页
            </button>
            <input type="number" 
                        :max="pageCount"
                        :min="1"
                        :value="currentPage+1"
                        @change="currentPageHandle">
            <button  @click="nextPageHandle">
              后一页
            </button>
          </tr>
        </tfoot>
</template>
