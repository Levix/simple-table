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
                          :sortData="sortData"
                          v-bind="$attrs"
                          :columns="columns"></table-header>
            <table-body :clickRow="clickRow"
                        :hoverRow="hoverRow"
                        :tableData="shownData"
                        :columns="columns">
                <div slot-scope="{column, record}">
                    <slot :name="column.dataIndex"
                          :record="record">
                        {{ record[column.dataIndex] }}
                    </slot>
                </div>
            </table-body>
        </table>
        <pagination :activeNum="activeNum"
                    :onPrevClick="onPrevClick"
                    :onNextClick="onNextClick"
                    :pages="pages"
                    :pageTotal="pageTotal"
                    :onPageClick="onPageClick"
                    v-if="showPagination"></pagination>
    </div>
</template>

<script>
/**
 * @file 表格文件
 */
import { defineComponent } from "@vue/composition-api";
import TableHeader from "./table_header.vue";
import TableBody from "./table_body.vue";
import Pagination from "./pagination.vue";
import { useSort } from "../actions/use_sort";
import { usePager } from "../actions/use_pagination";
import { useSortData } from "../actions/table_action";
import { useCallback } from "../actions/use_callback";

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
            type: Array,
            required: true,
        },

        /**
         * 表格数据
         */
        tableData: {
            type: Array,
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
        const { sort, sortIndex, sortData } = useSort();

        const {
            activeNum,
            onPrevClick,
            onNextClick,
            pages,
            onPageClick,
            pageTotal,
        } = usePager(props.tableData, props.pageDataLength);

        const { clickRow, hoverRow } = useCallback();

        const { shownData } = useSortData({
            showPagination: props.showPagination,
            pageDataLength: props.pageDataLength,
            activeNum,
            sortDirection: sort,
            sortIndex,
            tableData: props.tableData
        });

        return {
            shownData,
            activeNum,
            onPrevClick,
            onNextClick,
            pages,
            onPageClick,
            pageTotal,
            sortData,
            sort,
            clickRow,
            hoverRow,
        };
    },
});
</script>

<style scoped>
.table-column-width {
    width: 180px;
}
</style>
