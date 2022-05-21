import { defineComponent, ExtractPropTypes } from "vue";
import { tableProps } from "../types/table"
import { noop } from "lodash";

const headerProps = {
  ...tableProps,
  handleSort: {
    type: Function,
    default: noop
  },
  keyClickMap: {
    type: Object,
    default: {}
  }
} as const

export type HeaderProps = ExtractPropTypes<typeof headerProps>;

export default defineComponent({
  name: 'TableHeader',
  props: headerProps,
  setup(props: HeaderProps) {

    return () => (
      <thead>
        <th>
          {
            props.option.columns.map((item: { title: string; sortable?: boolean; dataKey: string }) => (
              <td key={item.dataKey} class='table-th-td'>
                {item.title}
                {
                  item.sortable &&
                  <span
                    class={`table-th-td__sort-btn status--${props.keyClickMap?.[item?.dataKey]}`}
                    onClick={
                      () => props.handleSort(
                        props.option.data,
                        item.dataKey,
                        props.option.isMultiSort,
                        props.option.isLocalSort
                      )
                    }
                  >{'>'}</span>
                }
              </td>
            ))
          }
        </th>
      </thead>
    )
  }
})