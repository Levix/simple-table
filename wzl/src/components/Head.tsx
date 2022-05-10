/**
 * @file 表格头部
 */

import { defineComponent, inject, ref } from "vue";
import { TABLE_TOKEN } from "./types";

export default defineComponent({
  name: "WuHead",
  setup(props, { attrs, emit, slots }) {
    const { handledColumns } = inject(TABLE_TOKEN)!;
    // 排序状态，normal 为默认，ascend 为升序，descend为降序
    const status = ref("normal");

    const toSort = (key: string | number) => {
      switch (status.value) {
        case "normal":
          status.value = "ascend";
          break;
        case "ascend":
          status.value = "descend";
          break;
        default:
          status.value = "normal";
          break;
      }
      emit("changeSort", [key, status.value]);
    };

    return () => {
      return (
        <thead>
          <tr>
            {handledColumns.value.map((item) => (
              <th key={item.key}>
                {item.title ?? item.key}
                {item.sortable && (
                  <span onClick={() => toSort(item.key)}>{"▲"}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
      );
    };
  },
});
