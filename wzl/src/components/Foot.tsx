/**
 * @file 表格底部
 */

import { defineComponent, inject, ref, reactive } from "vue";
import { TABLE_TOKEN } from "./types";
import { cloneDeep } from "lodash";

export default defineComponent({
  name: "WuFoot",
  setup(props, { emit }) {
    const { sortData } = inject(TABLE_TOKEN)!;
    console.log(sortData);

    const gridData = reactive({
      data: cloneDeep(sortData),
    });

    const curPage = ref(1);
    const pageSize = ref(Math.ceil(gridData.data.length / 5));

    console.log(pageSize);

    const getPages = () => {
      const elList = [];
      for (let i = 0; i < pageSize.value; i++) {
        elList.push(<button onClick={() => changePage(i + 1)}>{i + 1}</button>);
      }
      return elList;
    };

    const changePage = (page) => {
      if (page < 1 || page > pageSize.value) {
        alert("别点了，到头了！");
        return;
      }
      curPage.value = page;

      emit("changePage", curPage.value);
    };

    return () => {
      return (
        <tfoot>
          <tr>
            <span>{"5/page"}</span>
            <button onClick={() => changePage(curPage.value - 1)}>
              前一页
            </button>
            {getPages()}
            <button onClick={() => changePage(curPage.value + 1)}>
              后一页
            </button>
          </tr>
        </tfoot>
      );
    };
  },
});
