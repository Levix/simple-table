<template>
    <div class="table-header-box">
      <table-header ref="headerBody"
                    class="table-header">
          <slot></slot>
      </table-header>
      <table-body class="table-body"
                  :columns="columnComps"
                  :table-options="options"
                  :data-list="tableDataList" />
      <table-pagination :pageNo="this.pageNo"
                        :pageSize="this.pageSize"
                        :total="columnTotle"
                        :continues="5" 
                        @getPageNo="tableGetPageNo" />
        
    </div>
</template>

<script>
    import TableHeader from './table-header.vue'
    import TableBody from './table-body.vue'
    import TablePagination from './pagination.vue'

    export default {
      name: 'SimpleTable',

      data() {
        return {
          columnComps: [],
          tableDataList: [],
          pageNo: 1,
          pageSize: 5,
          columnTotle: 1
        }
      },

      props: {
        options: {
          type: Object,
          default: () => {
            return {
              data: []
            }
          }
        }
      },

      components: {
        TableHeader,
        TableBody,
        TablePagination
      },

      mounted() {
        this.initToggleColumns();
        this.initPagination();
      },
      
      watch: {
        pageNo() {
          this.tableDataList = [];
          var skipNum = (this.pageNo -1) * this.pageSize;
          this.tableDataList = (skipNum + this.pageSize >= this.options.data.length) 
            ? this.options.data.slice(skipNum, this.options.data.length)
            : this.options.data.slice(skipNum, skipNum + this.pageSize);
        }
      },

      methods: {
        initToggleColumns() {
          this.$slots.default.map(item => {
            this.columnComps.push(item.componentOptions);
          });
        },
        
        initPagination() {
          this.columnTotle = this.options.data.length;
          this.tableDataList = this.options.data.slice(0, this.pageSize)
        },

        tableGetPageNo(pageNo){
          this.pageNo = pageNo
        }
      }

    }
</script>

<style>
  .table-body {
    margin-top: 20px;
  }
</style>
