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
  
  export default defineComponent({
    name: "LhtBody",
    props: {
      sortOptions: {
        type: Array as PropType<String[]>,
        default: () => [],
      },
      pageOptions: {
        default: ref(1),
      },
    },
    setup(props) {
      const { dataList, columns } = inject(TABLE_TOKEN)!;

      window.console.log(dataList, columns);
  
      const showData = computed(() => {
        return dataList.slice(
          props.pageOptions.value * 5 - 5,
          props.pageOptions.value * 5
        );
      });

      function getValueIndex(sortablekey: String, columnsData: TableColumn[]): number {
        window.console.log(sortablekey);
        for (let i = 0; i < columnsData.length; i++) {
          if (columnsData[i]["value"] === sortablekey) {
            window.console.log(i);
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
        
        switch (sortList[1]) {
          case "ascend":
            dataList.sort((a, b) => {
              window.console.log(b);
              return (
                a[getValueIndex(sortList[0], columns)] -
                b[getValueIndex(sortList[0], columns)]
              );
            });
            break;
          case "descend":
            dataList.sort((a, b) => {
              return (
                b[getValueIndex(sortList[0], columns)] -
                a[getValueIndex(sortList[0], columns)]
              );
            });
            break;
          case "normal":
          default:
            break;
        }
      });
  
      return () => {
        return (
          <tbody>
            {dataList.map((item) => (
              <tr>
                {columns.map((i) => (
                  <td>{item[i.value]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        );
      };
    },
  });