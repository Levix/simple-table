<template>
    <tbody>
        <tr v-for="(item, index) in tableData"
            :utid="'table-cloumn-' + index"
            @click="clickRow(item)"
            @mouseenter="hoverRow(item)"
            :key="index">
            <td v-for="(column, index) in columns"
                :key="index"
                class="table-body__td">
                <slot :column="column" :record="item"></slot>
            </td>
        </tr>
     </tbody>
</template>

<script>
/**
 * @file 表格body文件
 */
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    props: {
        /**
         * 表格列
         */
         columns: {
          type: Array,
          required: true
        },

        /**
         * 表格数据
         */
         tableData: {
          type: Array
        },

        /**
         * hover事件
         */
        hoverRow: {
            type: Function
        },

        /**
         * click事件
         */
        clickRow: {
            type: Function
        }
    }
})
</script>

<style scoped>
    .table-body__td {
        border-bottom: 1px solid #ebeef5;
        padding: 4px 0;
        min-width: 0;
        box-sizing: border-box;
        text-overflow: ellipsis;
        vertical-align: middle;
        position: relative;
        text-align: left;
    }

    .table-body__cell {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        word-break: break-all;
        line-height: 23px;
        padding-left: 10px;
        padding-right: 10px;
        box-sizing: border-box;
    }
</style>
