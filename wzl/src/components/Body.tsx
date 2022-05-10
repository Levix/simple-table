/**
 * @file 表格主体
 */

import {
  computed,
  defineComponent,
  inject,
  PropType,
  reactive,
  ref,
  watch,
} from "vue";
import { TABLE_TOKEN } from "./types";
import { cloneDeep } from "lodash";

export default defineComponent({
  name: "WuBody",
  props: {
    sortOptions: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    pageOptions: {
      default: ref(1),
    },
  },
  setup(props) {
    const { sortData, handledColumns } = inject(TABLE_TOKEN)!;
    /** 加一个data包裹，后面直接赋值就不会改变引用地址了！ */
    let sortDataList = reactive({
      data: cloneDeep(sortData),
    });

    const showData = computed(() => {
      return sortDataList.data.slice(
        props.pageOptions.value * 5 - 5,
        props.pageOptions.value * 5
      );
    });

    function getIndex(key, data): number {
      for (let i = 0; i < data.length; i++) {
        if (data[i]["key"] === key) {
          return i;
        }
      }
      return 0;
    }

    watch(props.sortOptions, () => {
      const sortList = props.sortOptions;
      if (!sortList.length) {
        return;
      }
      // 入参写死第二个传入排序的规则
      switch (sortList[1]) {
        case "ascend":
          sortDataList.data.sort((a, b) => {
            return (
              a[getIndex(sortList[0], handledColumns.value)] -
              b[getIndex(sortList[0], handledColumns.value)]
            );
          });
          break;
        case "descend":
          sortDataList.data.sort((a, b) => {
            return (
              b[getIndex(sortList[0], handledColumns.value)] -
              a[getIndex(sortList[0], handledColumns.value)]
            );
          });
          break;
        case "normal":
        default:
          sortDataList.data = cloneDeep(sortData);
          break;
      }
    });

    return () => {
      return (
        <tbody>
          {showData.value.map((items) => (
            <tr>
              {items.map((i) => (
                <td>{i}</td>
              ))}
            </tr>
          ))}
        </tbody>
      );
    };
  },
});
