<template>
    <tbody>
        <tr v-for="(item, index) in tableData"
            :utid="'table-cloumn-' + index"
            :key="index">
            <td v-for="(column, index) in columns"
                :key="index"
                class="table-body__td">
                <slot :column="column" :record="item"></slot>
            </td>
        </tr>
     </tbody>
</template>

<script lang="ts">
/**
 * @file 表格body文件
 */
import { defineComponent, PropType } from '@vue/composition-api'
import { TableColumn } from '../types/index';

export default defineComponent({
    props: {
        /**
         * 表格列
         */
        columns: {
            type: Array as PropType<TableColumn[]>,
            required: true
        },

        /**
         * 表格数据
         */
        tableData: {
            type: Array as PropType<Object[]>
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
