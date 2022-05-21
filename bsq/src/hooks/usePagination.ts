/**
 * @file 分页逻辑
 */
import { ref, reactive, watchEffect, computed } from "vue"
import type { PaginationProps } from "../types/pagination"
import { cloneDeep } from 'lodash'

// 默认最小页码：1
const DEFAULT_MAX_PAGE = 1

// 默认total：0
const DEFAULT_TOTAL = 0

// 默认limit：10
const DEFAULT_LIMIT = 10

// 默认显示页码长度：5
const DEFAULT_SHOW_MAXLENGTH = 5

export default function usePagination(props: PaginationProps) {

  // 当前页面
  let currentPage = ref(DEFAULT_MAX_PAGE)

  // 页码数组
  let pageList = reactive({
    data: [DEFAULT_MAX_PAGE]
  })

  // 每页展示条数
  const currentLimit = computed(() => props.option.limit || DEFAULT_LIMIT)

  // 总数
  const currentTotal = computed(() => props.option.total || DEFAULT_TOTAL)

  // 根据显示长度计算边界值：长度5  边界为3
  const borderNumber = computed(() => Math.ceil(currentShowMaxLength.value / 2))

  // 连续显示最长分页数：1···3,4,5,6···10，其中3-6的长度
  const currentShowMaxLength = computed(() => props.option.showMaxLength || DEFAULT_SHOW_MAXLENGTH)

  // 最大页码
  const maxPage = computed(() => Math.ceil(currentTotal.value / currentLimit.value) || DEFAULT_MAX_PAGE)

  watchEffect(() => {

    // 计算出的页码 小于1 ，要么计算有误，要么接口参数返回有误
    if (maxPage.value < DEFAULT_MAX_PAGE) {
      return
    }

    // 最大页码  小于 连续显示最大长度：1,2,3,4,5
    if (maxPage.value <= currentShowMaxLength.value) {
      let curArray = []
      for (let i = 0; i < maxPage.value; i++) {
        curArray.push(i + 1)
      }
      pageList.data = cloneDeep(curArray)
      return
    }

    if (currentPage.value < borderNumber.value) {
      let curArray = [1, 2, 3, 4, 5, maxPage.value]
      pageList.data = cloneDeep(curArray)
      return
    }

    if (currentPage.value >= (maxPage.value - 2)) {
      let curArray = [1, maxPage.value - 4, maxPage.value - 3, maxPage.value - 2, maxPage.value - 1, maxPage.value]
      pageList.data = cloneDeep(curArray)
      return
    }

    if (currentPage.value > (1 + 2) && currentPage.value < (maxPage.value - 2)) {
      let curArray = [1]
      for (let i = currentPage.value - 2; i < currentPage.value + 2; i++) {
        curArray.push(i)
      }
      curArray.push(maxPage.value)
      pageList.data = cloneDeep(curArray)
    }

  })

  return {
    DEFAULT_MAX_PAGE,
    currentPage,
    pageList,
    maxPage,
    currentTotal,
    borderNumber,
  }
}