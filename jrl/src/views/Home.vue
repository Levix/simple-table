<template>
  <div class="home">
    <rd-table :table-data="tableTable">
      <rd-table-column prop="date" label="日期" :is-sort="true">
      </rd-table-column>
      <rd-table-column prop="name" label="姓名"> </rd-table-column>
      <rd-table-column prop="address" label="地址"> </rd-table-column>
    </rd-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RdTable from '@/components/table/table.vue'
import RdTableColumn from '@/components/table/table_column.vue'

@Component({
  components: {
    RdTable,
    RdTableColumn
  }
})
export default class Home extends Vue {
  private tableTable = [
    {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    },
    {
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄'
    },
    {
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄'
    },
    {
      date: '2016-05-06',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄'
    },
    {
      date: '2016-05-05',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄'
    },
    {
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄'
    },
    {
      date: '2016-05-09',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄'
    },
    {
      date: '2016-05-15',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄'
    }
  ]
}
</script>
