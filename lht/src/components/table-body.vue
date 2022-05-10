<template>
    <div class="table-body-box">
        <tr v-for="(item, index) in dataList"
            :key="index">
            <td v-for="(cell, i) in columns"
                width="100px"
                :key="i">
                {{ item[cell.propsData.dataIndex] }}
            </td>
        </tr>
    </div>
</template>

<script>
    export default {
        name: 'tableBody',

        data() {
            return {
                columnsList: []
            }
        },

        props: {
            columns: {
                type: Array,
            },
            tableOptions: {
                type: Object,
            },
            dataList: {
                type: Array,
            }
        },
    }
</script>

<style scoped>
</style>