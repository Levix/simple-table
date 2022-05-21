// 模拟接口

import { cloneDeep } from "lodash";

// 数据
const data = [
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

type DataType = typeof data

interface TableRecordType {
  code: number;
  data?: DataType;
  total?: number;
  limit?: number;
  msg?: string;
}

interface ParamsType {
  cur_page?: number;
  sort_params?: {},
  sort?: string;
}

// 模糊搜索功能
const onSearchData = (data: DataType, params?: ParamsType) => {
  let curData = cloneDeep(data)

  let sort = String(params.sort || '')
  if (sort) {
    curData = curData.filter(i => i.id.indexOf(sort) !== -1)
  }

  return curData
}

// 排序
const SORT_PARAMS_MAP = {
  normal: '',
  asc: 'ASC',
  desc: 'DESC'
}

// 模拟接口排序功能
const onSortData = (data: DataType, params?: ParamsType) => {
  let curData = cloneDeep(data)

  let sortMap = params?.sort_params || {}
  let keysOfSortMap = Object.keys(sortMap)
  if (keysOfSortMap.length) {
    window.console.log('开始远端接口排序，排序字段及顺序为：', sortMap)

    // 此处仅模拟单字段排序，多字段排序场景极少
    let key = keysOfSortMap[0]
    let value = sortMap[key]

    switch (value) {
      case SORT_PARAMS_MAP.asc:
        curData.sort((a, b) => (a[key] - b[key]))
        break;

      case SORT_PARAMS_MAP.desc:
        curData.sort((a, b) => (b[key] - a[key]))
        break;

      default:
        break;
    }
  }

  return curData
}

const formatData = (data: DataType, params?: ParamsType) => {
  let curData = cloneDeep(data)

  // 模拟搜索功能
  curData = onSearchData(curData, params)

  // 模拟排序功能
  curData = onSortData(curData, params)

  return curData
}

export const getTableApi = (params?: ParamsType) => {
  window.console.log('后端接口接收到的参数：', params)

  // 1、根据参数，模拟接口处理data数据
  let curData = formatData(data, params)

  // 模拟异步返回
  return new Promise<TableRecordType>((resolve, reject) => {
    setTimeout(() => {
      // api正常返回场景
      resolve({
        code: 200,
        data: curData,
        total: 100,
        limit: 10
      });

      // 异常场景：接口挂掉
      // resolve({
      //     code: 1000,
      //     msg: '接口异常',
      // })
    }, 500);
  })
}