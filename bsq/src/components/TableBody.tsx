import { defineComponent, ExtractPropTypes } from "vue";
import { tableProps } from "../types/table"

const bodyProps = {
  ...tableProps,
  list: {
    type: Array,
    default: []
  }
} as const

export type BodyProps = ExtractPropTypes<typeof bodyProps>;

export default defineComponent({
  name: 'TableBody',
  props: bodyProps,
  setup(props: BodyProps) {

    return () => (
      <tbody>
        {
          !props.list.length ?
            <div class="table-th-td__empty">
              空状态...
            </div> :
            props.list.map((item: any) => (
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
    )
  }
})