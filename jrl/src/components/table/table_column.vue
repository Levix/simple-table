<template>
  <div class="table-column">
    <span> {{ label }}</span>
    <a href="javascript:;" @click="onSortItem">{{ sortText }}</a>
    <br />
    <div
      class="table-column__item"
      v-for="(item, index) in dataColumnClones"
      :key="index"
    >
      {{ item }}
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Watch,
  InjectReactive,
  Vue
} from 'vue-property-decorator'
import { cloneDeep } from 'lodash'
import bus from '@/bus/index.vue'

@Component
export default class RdTableColumn extends Vue {
  @Prop() private readonly prop!: string
  @Prop() private readonly label!: string
  @Prop() private readonly isSort!: boolean

  private dataColumnClones: unknown[] = []
  private sortIndex = 0

  private sortTextAll = ['无序', '升序', '降序']

  private get sortText () {
    if (this.isSort) {
      const text = this.sortTextAll[this.sortIndex]
      return text
    }
    return ''
  }

  @InjectReactive('tableList')
  tableDataClone!: unknown[]

  /** 匹配当前列 */
  @Watch('tableDataClone', { deep: true, immediate: true })
  testTableListHandle (): void {
    const cloneTableList = cloneDeep(this.tableDataClone)
    this.dataColumnClones = cloneTableList.map((item: any) => item[this.prop])
  }

  /** 排序 */
  onSortItem (): void {
    this.sortIndex >= 2 ? (this.sortIndex = 0) : this.sortIndex++
    bus.$emit('set-sort', this.prop, this.sortIndex)
  }
}
</script>
<style lang="less" scoped>
.table-column {
  display: inline-block;
  border: 1px solid #ccc;
  &__item {
    height: 32px;
  }
}
</style>
