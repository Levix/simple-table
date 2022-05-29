/**
 * @file 表格头部
 */

 import { defineComponent, toRefs, ref, PropType } from "vue";
 import { SortOptions, TableColumn } from "./types";
 
 export default defineComponent({
   name: "LhtHead",

   props: {
      onChangeSort: {
        type: Function as PropType<(params: SortOptions) => void>
      },
      columns: {
        type: Array as PropType<TableColumn[]>,
        default: () => [],
      }
   },
  
   setup(props, { emit }) {
     // TODO: 考虑当属性传入
     const { columns } = toRefs(props)!;
     // 排序状态，normal 为默认，ascend 为升序，descend为降序
     const status = ref("normal");
 
     const handleSort = (key: string | number) => {
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

       emit("changeSort", {dataIndex: key, sortBy: status.value} as SortOptions);
     };
 
     return () => {
       return (
         <thead>
           <tr>
             {columns.value.map((item) => (
               item.value ? (
                <th key={item.value}
                    id={`${item.value}`}>
                  {item.title ?? item.value}
                  {item.sortable && (
                    <span onClick={() => handleSort(item.value)}>{"▲"}</span>
                  )}
                </th>
               ) : null
             ))}
           </tr>
         </thead>
       );
     };
   },
 });