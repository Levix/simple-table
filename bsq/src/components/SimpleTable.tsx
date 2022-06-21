import { computed, defineComponent, reactive, renderSlot, watch } from "vue"
import { type TableProps, tableProps } from "../types/table"
import type { SortParamsType } from "../types/app"
import { cloneDeep } from 'lodash'
import Toolbar from './Toolbar'
import useSortable from "../hooks/useSortable"
import TableHeader from "./TableHeader"
import TableBody from "./TableBody"
import { Logger } from '../util/logger'
import '/src/styles/index.css'

export default defineComponent({
  name: 'SimpleTable',
  components: {
    Toolbar,
    TableHeader,
    TableBody
  },
  props: tableProps,
  setup(props: TableProps, { emit, slots }) {

    // 同步
    let list = reactive({
      data: cloneDeep(props.option.data)
    });

    let { SORT_PARAMS_MAP, keyClickMap, sortableData, handleSort } = useSortable()

    watch(sortableData, () => {
      list.data = sortableData.value
    })

    const curOptionData = computed(() => props.option.data)

    // 异步
    watch(curOptionData, () => {
      list.data = cloneDeep(curOptionData.value)
    })

    watch(keyClickMap, () => {
      let sortParams = Object.keys(keyClickMap.value).reduce((prev, key) => {
        prev[key] = SORT_PARAMS_MAP[keyClickMap.value[key]]
        return prev;
      }, {} as SortParamsType)
      Logger.info('当前搜索过滤参数：', sortParams)
      emit('handle-sort', sortParams)
    }, {
      deep: true
    })

    return () => {

      // 操作栏：左侧插槽
      const slotLeftopr = renderSlot(slots, 'default')

      return (
        <div class='table-wrap'>
          <toolbar
            onSearch={(val: string) => emit('on-search', val)}
            onRefresh={() => emit('on-refresh')}
          >
            <slotLeftopr />
          </toolbar>

          <table>
            <table-Header
              option={props.option}
              keyClickMap={keyClickMap.value}
              handleSort={handleSort} />

            <table-body
              option={props.option}
              list={list.data} />
          </table>
        </div>
      )
    }
  },
});
