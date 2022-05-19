import { defineComponent, provide, reactive, ref, PropType, onMounted, toRefs, Ref } from "vue";
import LhtHead from "./Head";
import LhtBody from "./Body";
// import LhtFoot from "./Foot";
import { TABLE_TOKEN, TableColumn, type TableProps } from "./types";
import { useDataSource } from "../composables/useDataSource";
import { cloneDeep } from "lodash";

export default defineComponent({
  name: "LhtTable",

  props: {
    dataList: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    columns: {
      type: Array as PropType<TableColumn[]>,
      default: () => [],
    },
  },

  setup(props: TableProps) {
    /** 处理columns */
    const { columns, dataList } = toRefs(props);

    const sortOptionsList: any[] = reactive([]);
    const pageNumber = ref(1);

    const context = {
      dataList: dataList.value,
      columns: columns.value,
    };

    // 排序
    const changeSort = (params: String[]) => {
      sortOptionsList.length = 0;
      sortOptionsList.push(params[0]);
      sortOptionsList.push(params[1]);
    };

    // 分页
    const changePage = (params: any) => {
      pageNumber.value = params;
    };

    provide(TABLE_TOKEN, context);

    return () => {
      return (
        <table>
          <LhtHead onChangeSort={changeSort} />
          <LhtBody sortOptions={sortOptionsList} pageOptions={pageNumber} />
          {/* <LhtFoot onChangePage={changePage} /> */}
        </table>
      );
    };
  },
});