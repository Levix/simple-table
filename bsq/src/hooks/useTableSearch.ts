/**
 * @file 使用table常规的配置公共提取
 */
import { reactive } from 'vue'
import type { SortParamsType, AllParamsType } from '../types/app'
import { Logger } from '../util/logger'

export default function useTableSearch() {

  // 下发参数集
  let allParams = reactive({
    value: { cur_page: 1 } as AllParamsType
  })

  // 更新allParams，并且下发请求
  const updateAllParams = (
    key: keyof AllParamsType,
    value: string | number | SortParamsType
  ) => {
    // 更新allParams
    allParams.value = {
      ...allParams.value,
      [key]: value
    }
  }

  // 处理搜索
  const onSearch = (sort: string) => {
    Logger.info('触发搜索，重新请求数据 sort: ', sort)
    updateAllParams('sort', sort)
  }

  // 排序
  const handleSort = (sortParams: SortParamsType) => {
    // 这里处理远程排序参数下发请求
    Logger.info('排序参数：', sortParams)

    /**
     * isLocalSort 没有配置，即不是本地单页面数据排序（接口排序）
     * 模拟下发参数请求：进行远程排序
     */
    updateAllParams('sort_params', sortParams)
  }

  // 更新当前页数
  const updateCurPage = (curPage: number) => {
    // 这里处理远程当前页参数下发请求
    Logger.info(`当前页码： ${curPage}`)

    // 模拟下发参数请求：进行远程跳转页面
    updateAllParams('cur_page', curPage)
  }

  return {
    allParams,
    updateAllParams,
    onSearch,
    handleSort,
    updateCurPage
  }
}