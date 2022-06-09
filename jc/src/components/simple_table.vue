<template>
    <div>
        <table cellpadding="0"
               cellspacing="0">
            <colgroup v-for="item in columns"
                      :key="item.key"
                      class="table-column-width"
                      :style="{ width: item.defaultWidth }"></colgroup>
            <table-header :sort="sort"
                          v-if="needHeader"
                          :sort-data="sortData"
                          v-bind="$attrs"
                          :columns="columns"></table-header>
            <table-body :table-data="showData"
                        :columns="columns">
                <div slot-scope="{column, record}">
                    <slot :name="column.dataIndex"
                          :record="record">
                        {{ record[column.dataIndex] | empty }}
                    </slot>
                </div>
            </table-body>
        </table>
        <pagination v-if="showPagination"
                    :active-num="activeNum"
                    :on-prev-click="onPrevClick"
                    :on-next-click="onNextClick"
                    :pages="pages"
                    :page-total="pageTotal"
                    :on-page-click="onPageClick"
                    :link-to-target="linkToTarget" />
    </div>
</template>

<script lang="ts">
/**
 * @file 表格文件
 */
import { defineComponent, PropType } from '@vue/composition-api';
import TableHeader from './table_header.vue';
import TableBody from './table_body.vue';
import Pagination from './pagination.vue';
import { usePager } from '../hooks/use_pagination';
import { useSort, useSortData } from '../hooks/table_action';
import { TableColumn } from '../types/index';

export default defineComponent({
    name: "Table",

    components: {
        TableHeader,
        TableBody,
        Pagination,
    },

    props: {
        /**
         * 表格列
         */
        columns: {
            type: Array as PropType<TableColumn[]>,
            required: true,
        },

        /**
         * 表格数据
         */
        tableData: {
            type: Array as PropType<Object[]>,
            default: () => [],
        },

        /**
         * 是否需要表格头部
         */
        needHeader: {
            type: Boolean,
            default: true,
        },

        /**
         * 是否显示分页
         */
        showPagination: {
            type: Boolean,
            default: true,
        },

        /**
         * 一页展示多少条数据
         */
        pageDataLength: {
            type: Number,
            default: 5,
        },
    },

    setup(props) {
        let { sort, sortIndex, sortData } = useSort();

        let {
            activeNum,
            onPrevClick,
            onNextClick,
            pages,
            onPageClick,
            pageTotal,
            linkToTarget
        } = usePager(props.tableData, props.pageDataLength);

        let { showData } = useSortData({
            showPagination: props.showPagination,
            pageDataLength: props.pageDataLength,
            activeNum,
            sortDirection: sort,
            sortIndex,
            tableData: props.tableData
        });

        return {
            showData,
            activeNum,
            onPrevClick,
            onNextClick,
            pages,
            onPageClick,
            pageTotal,
            sortData,
            sort,
            linkToTarget,
            totalData: props.tableData
        };
    },
});
</script>

<style scoped>
.table-column-width {
    width: 180px;
}
</style>
