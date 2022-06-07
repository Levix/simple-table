/**
 * @file 使用table常规的配置公共提取
 */
import { ref } from '@vue/reactivity'
import type { SortParamsType, AllParamsType } from '../types/app'

export default function useTableSearch() {

  // 下发参数集
  let allParams = ref({ cur_page: 1 } as AllParamsType)

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
    window.console.log('搜索，重新请求数据 sort: ', sort)
    updateAllParams('sort', sort)
  }

  // 排序
  const handleSort = (sortParams: SortParamsType) => {
    // 这里处理远程排序参数下发请求
    window.console.log('sort_params: ', sortParams)

    /**
     * isLocalSort 没有配置，即不是本地单页面数据排序（接口排序）
     * 模拟下发参数请求：进行远程排序
     */
    updateAllParams('sort_params', sortParams)
  }

  // 更新当前页数
  const updateCurPage = (curPage: number) => {
    // 这里处理远程当前页参数下发请求
    window.console.log('cur_page: ', curPage)

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