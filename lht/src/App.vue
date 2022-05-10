<template>
  <simple-table :options="tableOptions">
    <table-column dataIndex="name">{{ '姓名' }}</table-column>
    <table-column dataIndex="age">{{ '年龄' }}</table-column>
    <table-column dataIndex="number">{{ '电话号码' }}</table-column>
  </simple-table>
</template>

<script>
import SimpleTable from './components/table.vue'
import TableColumn from './components/table-column.vue'

export default {
  name: 'App',

  components: {
    SimpleTable,
    TableColumn
  },
  
  data() {
    return {
      tableOptions:{
        data: [{
          name: '小明',
          age: '18',
          number: 21312312321
        },
        {
          name: '小智',
          age: '20',
          number: 123123
        },
        {
          name: '晓华',
          age: '19',
          number: 4324234
        },
        {
          age: '24',
          name: '小白',
          number: 12342121
        },
        {
          age: '25',
          name: '张强',
          number: 12342121
        },
        {
          age: '29',
          name: '小黑',
          number: 12342121
        },
        ]
      }
    }
  },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
