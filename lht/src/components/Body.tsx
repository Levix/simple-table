/**
 * @file 表格主体
 */

 import {
    computed,
    defineComponent,
    PropType,
    ref,
    toRefs,
    watch,
  } from "vue";
  import { TableColumn, SortOptions, PageOptions } from "./types";
  import { handleSort } from "./util/sort";
  import { cloneDeep } from "lodash";
  
  export default defineComponent({
    name: "LhtBody",
    props: {
      sortOptions: {
        type: Object as PropType<SortOptions>,
        default: () => ({}),
      },
      pageOptions: {
        type: Object as PropType<PageOptions>,
        default: () => ({}),
      },
      dataList: {
        type: Array as PropType<Record<string, any>>,
        default: () => [],
      },
      columns: {
        type: Array as PropType<TableColumn[]>,
        default: () => [],
      }
    },
    setup(props) {
      const { dataList, columns } = toRefs(props)!;

      let sortDataList = ref(cloneDeep(dataList.value))

      window.console.log(props.pageOptions.pagenumber, props.pageOptions.pageSize);
  
      // TODO：不用写死的页数，showdata换一个名称
      const tableDataList = computed(() => {
        return sortDataList.value.slice(
          props.pageOptions.pagenumber * props.pageOptions.pageSize - props.pageOptions.pageSize,
          props.pageOptions.pagenumber * props.pageOptions.pageSize
        );
      });

      function getValueIndex(sortablekey: string, columnsData: TableColumn[]) {
        for (let i = 0; i < columnsData.length; i++) {
          if (columnsData[i]["value"] === sortablekey) {
            return columnsData[i]["value"];
          }
        }
        return 0;
      }
  
      watch(props.sortOptions, () => {
        const sortList = props.sortOptions;

        sortDataList.value = handleSort(sortList, dataList.value);
      });
  
      return () => {
        return (
          <tbody>
            {tableDataList.value.map((item) => (
              <tr>
                {columns.value.map((i) => (
                  item[i.value] ? (
                     <td>{item[i.value]}</td>
                  ) : <td>-</td>
                ))}
              </tr>
            ))}
          </tbody>
        );
      };
    },
  });