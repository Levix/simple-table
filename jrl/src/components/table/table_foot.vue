<script  lang="ts" setup>
import { computed, ref,  watch, PropType } from "vue";
import {   PAGE_SIZE } from "./const"

let tableProps =defineProps({
    total:{
        type: Number as PropType<number>,
        default: 0
    }
})
const $footEmit=defineEmits(['change-current']);

let currentPage = ref(1)


/**一共有多少页 */
let pageCount=computed(()=>{
    return Math.ceil(tableProps.total /  PAGE_SIZE)
})


function prePageHandle(){
    if (currentPage.value<=1) {
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
    $footEmit('change-current',currentPage.value - 1)
})
</script>

<template>
    <tfoot>
          <tr>
            <span>总页数：{{pageCount}}</span>
            <span>当前页: {{currentPage}}</span>
            <button @click="prePageHandle">
              前一页
            </button>
            <input type="number" 
                        :max="pageCount"
                        :min="1"
                        :value="currentPage"
                        @change="currentPageHandle">
            <button  @click="nextPageHandle">
              后一页
            </button>
          </tr>
        </tfoot>
</template>
