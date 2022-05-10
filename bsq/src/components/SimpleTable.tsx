import { defineComponent, reactive, watch } from "vue";
import { type TableProps, tableProps } from "./types";
import { cloneDeep } from 'lodash';
import Pagination from "./Pagination";
import useSortable from "../hooks/useSortable";
import './index.css'

export default defineComponent({
  name: 'SimpleTable',
  components: {
    Pagination
  },
  props: tableProps,
  setup(props: TableProps, { emit }) {

    let list = reactive(cloneDeep(props.option.data))

    let { SORT_PARAMS_MAP, keyClickMap, sortableData, handleSort } = useSortable()

    watch(sortableData, () => {
      list = sortableData.value
    })

    watch(keyClickMap, () => {
      let sortParams = Object.keys(keyClickMap.value).reduce((prev, key) => {
        prev[key] = SORT_PARAMS_MAP[keyClickMap.value[key]]
        return prev;
      }, {})
      emit('hanle-sort', sortParams)
    }, {
      deep: true
    })

    return () => (
      <div class='table-wrap'>
        <table>
          <thead>
            <th>
              {
                props.option.columns.map((item: { title: string; sortable?: boolean; dataKey: string }) => (
                  <td key={item.dataKey} class='table-th-td'>
                    {item.title}
                    {
                      item.sortable &&
                      <span
                        class={`table-th-td__sort-btn status--${keyClickMap.value?.[item?.dataKey]}`}
                        onClick={() => handleSort(props.option.data, item.dataKey, props.option.isMultiSort, props.option.isLocalSort)}>{'>'}</span>
                    }
                  </td>
                ))
              }
            </th>
          </thead>
          <tbody>
            {
              list.map((item: any) => (
                <tr key={item.id}>
                  {
                    props.option.columns.map((configItem: { dataKey: string }) => (
                      <td key={configItem.dataKey}>{item[configItem.dataKey]}</td>
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
        </table>

        <pagination total={100} limit={10} onUpdateCurPage={(value: number) => {
          emit('update-cur-page', value)
        }} />
      </div>
    );
  },
});
