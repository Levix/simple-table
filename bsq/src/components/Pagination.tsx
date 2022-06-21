import { computed, defineComponent, ref, watch } from "vue"
import { type PaginationProps, paginationProps } from "../types/pagination"
import usePagination from '../hooks/usePagination'
import { Logger } from '../util/logger'
import '/src/styles/index.css'

export default defineComponent({
  name: "SimpleTable",
  props: paginationProps,
  setup(props: PaginationProps, { emit }) {

    const {
      currentPage,
      DEFAULT_MAX_PAGE,
      pageList,
      maxPage,
      currentTotal,
      borderNumber
    } = usePagination(props)

    // 跳转输入框显示的页码
    const jumpPage = ref('')

    const jumpToPage = (num: number) => {
      jumpPage.value = ''

      // 手动输入的跳转页码不在范围内，直接不做跳转
      if (num < DEFAULT_MAX_PAGE || num > maxPage.value) {
        Logger.error(`页码输入不正常，正常范围：[0, ${maxPage.value}]`)
        return
      }
      currentPage.value = Math.floor(num)
    }

    const handleKeydown = (e: KeyboardEvent) => {

      // 处理回车跳转
      if (e.keyCode === 13) {
        jumpToPage(Number((e.target as HTMLInputElement).value));
      }
    }

    const pageAdd = (num: number) => {
      currentPage.value += num
    }

    watch(currentPage, () => {
      Logger.info(`emit事件：跳转到第${currentPage.value}页`)
      emit('update-cur-page', Number(currentPage.value))
    })

    const originCurpage = computed(() => Number(props.option.currentPage))

    watch(originCurpage, () => {
      let curPage = originCurpage.value

      /**
       * 1、接口提供的当前页面
       * 2、模糊搜索时，需要回到第一页
       */
      if ('number' === typeof curPage && !isNaN(curPage)) {
        jumpToPage(curPage)
      }
    })

    return () => (
      <div class='pagination-wrap'>
        <span class="pagination-wrap-total">共{currentTotal.value}条</span>

        <span class="pagination-current-page">当前第{currentPage.value}页</span>

        {
          currentPage.value > DEFAULT_MAX_PAGE &&
          <span
            class='pagination-wrap-btn pagination-left-btn'
            onClick={() => pageAdd(-1)}
          >
            {'<'}
          </span>
        }

        {
          pageList.data.map(page => (
            <span
              key={page}
              class={
                `pagination-wrap-context 
                  page-${(currentPage.value - borderNumber.value > DEFAULT_MAX_PAGE && page === DEFAULT_MAX_PAGE) ? 'after' : ''} 
                  page-${(currentPage.value + borderNumber.value <= maxPage.value && page === maxPage.value) ? 'before' : ''} 
                  ${page === currentPage.value && 'current'}`
              }
              onClick={() => jumpToPage(page)}
            >
              {page}
            </span>
          ))
        }

        {
          currentPage.value < maxPage.value &&
          <span
            class='pagination-wrap-btn pagination-right-btn'
            onClick={() => pageAdd(1)}
          >
            {'>'}
          </span>
        }
        <span class='pagination-wrap-right-input-wrap'>
          <span>跳转到</span>
          <input
            type="number"
            class='input'
            value={jumpPage.value}
            onKeydown={e => handleKeydown(e)}
          />
          <span>页</span>
        </span>
      </div>
    );
  },
});
