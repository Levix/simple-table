<template>
  <div class="table">
    <button @click="currentPage > 0 && --currentPage">上一页</button>
    <button @click="maxLength > currentPage && ++currentPage">下一页</button>
    <input type="number"
                @change="currentPage = $event.target.value"
                :value="currentPage"
                :min="0"
                :max="maxLength"
    />
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  ProvideReactive,
  Watch
} from 'vue-property-decorator'
import { sortBy, chunk, reverse } from 'lodash'
import bus from '@/bus/index.vue'

@Component
export default class RdTable extends Vue {
  @Prop()
  private readonly tableData!: unknown[]

  /** 分页数据操作组 */
  private currentPage = 0
  private pageLimite = 5
  /** 排序标识 */
  private sort = {
    flag: 0,
    label: ''
  }

  private get maxLength () {
    return chunk(this.tableData, this.pageLimite).length - 1
  }

  @ProvideReactive()
  private tableList = chunk(this.tableData, this.pageLimite)[this.currentPage]

  mounted (): void {
    bus.$on('set-sort', (label: string, sortFlag: number) => {
      this.sort.flag = sortFlag
      this.sort.label = label
      this.onSort()
    })
  }

  /**
   * 排序
   */
  @Watch('currentPage')
  public onSort (): void {
    let cloneTableList = chunk(this.tableData, this.pageLimite)[
      this.currentPage
    ]

    if (this.sort.flag === 1) {
      cloneTableList = sortBy(cloneTableList, this.sort.label)
    }
    if (this.sort.flag === 2) {
      cloneTableList = sortBy(cloneTableList, this.sort.label)
      cloneTableList = reverse(cloneTableList)
    }
    this.tableList = cloneTableList
  }
}
</script>
