<script  lang="ts" setup>
import { ref ,defineEmits,inject,computed} from "vue";
import {GLOBAL_TABLE_TOKEN,
             STATUS_TOKEN} from "./const"
import { SortKeyType } from "../types"

    const { tableColumnsConfig } = inject(GLOBAL_TABLE_TOKEN)!;

    const $headEmit=defineEmits(['change-sort']);
    const status = ref<SortKeyType>(STATUS_TOKEN.normal);
    /**点击排序改变排序状态 */
    const headSortHandle = (columnProp:string ) => {
      switch (status.value) {
        case STATUS_TOKEN.normal:
          status.value = STATUS_TOKEN.ascend;
          break;
        case STATUS_TOKEN.ascend:
          status.value = STATUS_TOKEN.descend;
          break;
        case STATUS_TOKEN.descend:
          status.value = STATUS_TOKEN.normal;
          break;
      }
     $headEmit("change-sort", {
       status:status.value,
       columnProp
     });
    }

    const statusText = {
        [STATUS_TOKEN.normal]:"正常",
        [STATUS_TOKEN.ascend]:"升序",
        [STATUS_TOKEN.descend]:"降序"
    }
    /** 根据相应状态显示对应文字 */
    const showStatusText = computed(() => {
      return statusText[status.value]
    });
</script>

<template>
   <thead>
          <tr>
              <!-- 表列渲染 -->
             <th v-for=" item  in tableColumnsConfig" 
                    :key="item.id">
                <!-- 表格标题 -->
                {{item.title}}
                <!-- 是否支持排序 -->
                <a href="javascript:;" v-if="item.sortable"
                                                  @click="headSortHandle(item.key)" >
                    {{showStatusText}}
                </a>
             </th>
          </tr>
        </thead>
</template>
