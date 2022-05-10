import { defineComponent, provide, reactive, ref } from "vue";
import WuHead from "./Head";
import WuBody from "./Body";
import WuFoot from "./Foot";
import { type TableProps, tableProps } from "./types";
import { useDataSource } from "../composables/useDataSource";
import { useColumns } from "../composables/useColumns";
// import { usePagetion } from "../composables/usePagetion";
import { TABLE_TOKEN } from "./types";

export default defineComponent({
  name: "WuTable",
  props: tableProps,
  setup(props: TableProps, { attrs, emit, slots }) {
    /** 处理columns */
    const { handledColumns } = useColumns(props);
    const { sortData } = useDataSource(props, handledColumns.value);

    const sortList: any[] = reactive([]);
    const pageSize = ref(1);

    const context = {
      sortData,
      handledColumns,
    };

    // 排序
    const changeSort = (params: any[]) => {
      sortList.length = 0;
      sortList.push(params[0]);
      sortList.push(params[1]);
      console.log(params, sortList, "🍉");
    };

    // 分页
    const changePage = (params) => {
      pageSize.value = params;
      console.log(params, "🍍");
    };

    provide(TABLE_TOKEN, context);

    return () => {
      return (
        <table
          width="90%"
          border="1"
          cellspacing="0"
          cellpadding="4"
          align="center"
        >
          <WuHead onChangeSort={changeSort} />
          <WuBody sortOptions={sortList} pageOptions={pageSize} />
          <WuFoot onChangePage={changePage} />
        </table>
      );
    };
  },
});
