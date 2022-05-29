import { defineComponent, reactive, ref, PropType, toRefs } from "vue";
import LhtHead from "./Head";
import LhtBody from "./Body";
import LhtFoot from "./Foot";
import { TableColumn, SortOptions, PageOptions, type TableProps } from "./types";
import { cloneDeep } from "lodash";

export default defineComponent({
  name: "LhtTable",

  props: {
    dataList: {
      type: Array as PropType<Record<string, any>>,
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

    // TODO 用type.ts
    const sortOptionsList = reactive({}) as SortOptions;
    const pageOptionsList = reactive({pagenumber: 1, pageSize: 5}) as PageOptions;
    // const pageSize = ref(5);

    const changeSort = (params: SortOptions) => {
      sortOptionsList.dataIndex = params.dataIndex;
      sortOptionsList.sortBy = params.sortBy
    };

    // 分页
    const changePage = (params: number) => {
      pageOptionsList.pagenumber = params;
    };

    const changeSize = (size: number) => {
      pageOptionsList.pageSize = size;
      window.console.log(pageOptionsList.pageSize);
    }

    return () => {
      return (
        <table>
          <LhtHead onChangeSort={changeSort} columns={columns.value} />
          <LhtBody sortOptions={sortOptionsList}
                   pageOptions={pageOptionsList}
                   dataList={dataList.value}
                   columns={columns.value} />
          <LhtFoot onChangePage={changePage} onChangeSize={changeSize} dataList={dataList.value} />
        </table>
      );
    };
  },
});