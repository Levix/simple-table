/**
 * @file 表格头部
 */

 import { defineComponent, inject, ref } from "vue";
 import { TABLE_TOKEN } from "./types";
 
 export default defineComponent({
   name: "LhtHead",

   props: {
      onChangeSort: {
        type: Function
      }
   },
  
   setup(props, { emit }) {
     const { columns } = inject(TABLE_TOKEN)!;
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
             {columns.map((item) => (
               item.value ? (
                <th key={item.value}>
                  {item.title ?? item.value}
                  {item.sortable && (
                    <span onClick={() => toSort(item.value)}>{"▲"}</span>
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