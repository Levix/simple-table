/**
 * @file wu_table 组件主入口
 */
import { defineComponent, provide, reactive, ref, toRefs } from "vue";
import WuHead from "./Head";
import WuBody from "./Body";
import WuFoot from "./Foot";
import type { TableProps } from "./types";
import { tableProps } from "./types";
import { useDataSource } from "../composables/useDataSource";
import { useColumns } from "../composables/useColumns";
// import { usePagetion } from "../composables/usePagetion";
import { TABLE_TOKEN } from "./types";

export default defineComponent({
  name: "WuTable",
  props: tableProps,
  setup(props: TableProps) {
    const { columns, dataSource } = toRefs(props);
    /** 处理columns */
    const { handledColumns } = useColumns(columns);
    /** 处理sortData */
    const { sortData } = useDataSource(dataSource, handledColumns);

    const sortList: string[] = reactive([]);
    const pageSize = ref(1);

    const context = {
      sortData,
      handledColumns,
    };

    // 排序
    const changeSort = (params: string[]): void => {
      sortList.length = 0;
      sortList.push(params[0]);
      sortList.push(params[1]);
    };

    // 分页
    const changePage = (params: number): void => {
      pageSize.value = params;
    };

    provide(TABLE_TOKEN, context);

    return () => {
      return (
        <table border="1" cellspacing="0" cellpadding="4" align="center">
          <WuHead onChangeSort={changeSort} />
          <WuBody sortOptions={sortList} pageOptions={pageSize} />
          <WuFoot onChangePage={changePage} />
        </table>
      );
    };
  },
});
