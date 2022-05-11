<template>
    <thead>
        <tr class="table-header-wrap">
            <th v-for="(column, index) in columns"
                :key="index"
                class="table-header">
                <div class="table-header__cell">
                    {{ column.label }}
                    <span class="table-header__tip"
                          :title="column.tip"
                          v-if="column.tip">i</span>
                    <div v-if="column.sortAble"
                         class="table-header__sortable-wrap">
                        <span :class="['table-header__arrow', {'active': sort === 'ASC'}]"
                              @click="sortData('ASC', column.dataIndex)"
                              :utid="column.dataIndex + '-asc'">∧</span>
                        <span :class="['table-header__arrow', {'active': sort === 'DESC'}]"
                              @click="sortData('DESC', column.dataIndex)"
                              :utid="column.dataIndex + '-desc'">∨</span>
                    </div>
                </div>
            </th>
        </tr>
    </thead>
</template>

<script>
/**
 * @file 表格头部文件
 */
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
    props: {
        columns: {
            type: Array,
            required: true
        },

        sort: {
            type: String,
            default: ''
        },

        sortData: {
            type: Function
        }
    }
})
</script>

<style scoped>
    .table-header {
        background: #ccc;
        padding: 4px 0;
        box-sizing: border-box;
        text-overflow: ellipsis;
        vertical-align: middle;
        position: relative;
        text-align: left;
    }

    .table-header__cell {
        display: inline-block;
        box-sizing: border-box;
        position: relative;
        vertical-align: middle;
        padding-left: 10px;
        padding-right: 10px;
        width: 100%;
    }

    .table-header__tip {
        outline: 1px solid #999;
        font-size: 14px;
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        text-align: center;
        line-height: 16px;
        cursor: pointer;
    }

    .table-header__sortable-wrap {
        display: inline-flex;
        flex-direction: column;
    }

    .table-header__arrow {
        width: 36px;
        cursor: pointer;
        text-align: center;
        color: #999;
    }

    .active {
        color: #000;
    }
</style>
