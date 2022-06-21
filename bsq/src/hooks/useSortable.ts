/**
 * @file 此处是排序hook
 */

import { cloneDeep } from "lodash"
import { reactive } from "vue"
import { Logger } from '../util/logger'

// 排序
const SORT_MAP = {
  normal: 0,
  asc: 1,
  desc: 2
}

const SORT_PARAMS_MAP = {
  [SORT_MAP.normal]: '',
  [SORT_MAP.asc]: 'ASC',
  [SORT_MAP.desc]: 'DESC'
}

export default function useSortable() {
  let sortableData = reactive({
    value: [] as Record<string, any>
  })

  /**
   * 记录点击的key的次数：0,1,2
   * 此处的key一定是 sring 类型，是外部自定义的 sortable：true 对应的字段
   */
  let keyClickMap = reactive({
    value: {} as Record<string, number>
  })

  /**
   * 记录点击的排序的key和它点击的次数：normal-0：无序；asc-1：升序；desc-2：降序；
   * @param originData 原始数据
   * @param key 当前点击排序的字段
   * @param isMultiSort 是否支持多个字段同时排序
   * @param isLocalSort 是否是本地排序
   */
  const handleSort = (params: {
    originData: Record<string, any>[],
    key: string,
    isMultiSort: boolean,
    isLocalSort: boolean
  }) => {

    const {
      originData,
      key,
      isMultiSort = false,
      isLocalSort = false
    } = params

    Logger.info('排序参数：', params)

    Logger.info('触发了排序功能')
    let list = cloneDeep(originData)

    // 不是多个参数排序，那么这里清除非key的其他值即可
    if (!isMultiSort) {
      keyClickMap.value = cloneDeep({
        [key]: keyClickMap.value[key] || SORT_MAP.normal
      })
    }

    // 1、更新点击的key
    if (key in keyClickMap.value) {
      keyClickMap.value[key] = (keyClickMap.value[key] + 1) % Object.keys(SORT_MAP).length
    } else {
      keyClickMap.value[key] = SORT_MAP.asc
    }
    Logger.info(`当前排序字段：${key}，${keyClickMap.value[key]}`)

    // 本地排序
    if (isLocalSort) {
      Logger.info('开启本地排序')
      // 2、根据key点击的次数返回排序的结果
      switch (keyClickMap.value[key]) {
        case SORT_MAP.asc:
          list.sort((a, b) => (a[key] - b[key]))
          break;

        case SORT_MAP.desc:
          list.sort((a, b) => (b[key] - a[key]))
          break;

        default:
          break;
      }
    }

    Logger.info('排序结果：', list)
    sortableData.value = list
  }

  return {
    SORT_PARAMS_MAP,
    keyClickMap,
    sortableData,
    handleSort
  }
}