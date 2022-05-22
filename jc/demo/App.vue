<template>
    <simple-table :columns="columns"
                  :table-data="tableData" />
</template>

<script>
import SimpleTable from "../src/components/simple_table.vue";

export default {
    components: {
        SimpleTable
    },

    setup() {

        const columns = [
            {
                label: '名字',
                key: 'name',
                dataIndex: 'name',
                tip: "名字提示",
                sortAble: true
            },
            {
                label: '爱好',
                key: 'hobby',
                dataIndex: 'hobby'
            },
            {
                label: '特长',
                key: 'speciality',
                dataIndex: 'speciality'
            }
        ];

        const tableData = [
            {
                name: '隔壁老王',
                hobby: '爱好比较多, 啥都做',
                speciality: '',
                id: 'laowang'
            },
            {
                name: '老李',
                hobby: '开意大利炮',
                speciality: '开炮！！！！！',
                id: 'laoli'
            },
            {
                name: '亚索',
                hobby: '吹风',
                speciality: '哈撒给',
                id: 'yasuo'
            },
            {
                name: '伊泽瑞尔',
                hobby: '',
                speciality: '',
                id: 'ez'
            },
            {
                name: '小炮',
                id: 'xiaopao'
            },
            {
                name: '卡莎',
                id: 'kasha'
            },
            {
                name: '寒冰',
                id: 'hanbing'
            }
        ];

        return { tableData, columns };
    }
}

</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 60px;
}
</style>
