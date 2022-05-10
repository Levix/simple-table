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
import { TABLE_TOKEN, TableColumn } from "./types";
import { cloneDeep } from "lodash";
import { ascendSort, descendSort } from "../composables/useDataSort";

export default defineComponent({
  name: "WuBody",
  props: {
    sortOptions: {
      type: Array as PropType<string[]>,
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

    // 可使用lodash的merge优化
    const showData = computed(() => {
      return sortDataList.data.slice(
        props.pageOptions.value * 5 - 5,
        props.pageOptions.value * 5
      );
    });

    const getIndex = (key: string, data: TableColumn[]): number => {
      for (let i = 0; i < data.length; i++) {
        if (data[i]["key"] === key) {
          return i;
        }
      }
      return 0;
    };

    watch(props.sortOptions, () => {
      const sortList = props.sortOptions;
      if (!sortList.length) {
        return;
      }
      
      switch (sortList[1]) {
        case "asc" || "ASC":
          sortDataList.data.sort(
            ascendSort(getIndex(sortList[0], handledColumns))
          );
          break;
        case "desc" || "DESC":
          sortDataList.data.sort(
            descendSort(getIndex(sortList[0], handledColumns))
          );
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
