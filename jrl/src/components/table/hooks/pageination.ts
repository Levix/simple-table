import { chunk } from 'lodash'
import { Ref } from 'vue';
import { PAGE_SIZE } from "../const";

/**
 * 控制分页逻辑
 * @param {Ref<number>}  currentPage 当前页
 * @param {Ref<number>}  maxPageCount  最大页数
 *  */ 
export function usePageination(currentPage: Ref<number>, maxPageCount:  Ref<number>) {

   function prePageHandle() {
      if (currentPage.value <= 1) {
         return;
      }
      currentPage.value--;
   }

   function nextPageHandle() {
      if (currentPage.value >= maxPageCount.value) {
         return;
      }
      currentPage.value++;
   }

   function changePageHandle(val:string){
      if (currentPage.value >= maxPageCount.value && currentPage.value <= 1) {
         return
      }
      currentPage.value= Number(val);
   }

   return {
      prePageHandle,
      nextPageHandle,
      changePageHandle,
   }
}

/**
 * 
 * 分页显示
 * @param { Array } tableList  表格所有数据
 * @param { Number } curPage  当前页
 * @returns { Array }
 */
export function changePageLimitHandle(tableList: any[], curPage: number) {
   return chunk(tableList, PAGE_SIZE)[curPage]
}