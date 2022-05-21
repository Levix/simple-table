import { defineComponent, ref, watch } from "vue"
import { type PaginationProps, paginationProps } from "../types/pagination"
import usePagination from '../hooks/usePagination';
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
        window.console.log(`页码输入不正常，正常范围：[0, ${maxPage.value}]`)
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
      emit('update-cur-page', Number(currentPage.value))
    })

    return () => (
      <div class='pagination-wrap'>
        <span class="pagination-wrap-total">共{currentTotal.value}条</span>

        <span class="pagination-current-page">当前第{currentPage.value}页</span>

        {
          currentPage.value > DEFAULT_MAX_PAGE &&
          <span
            class='pagination-wrap-btn'
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
            class='pagination-wrap-btn'
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
            onBlur={e => jumpToPage(Number((e.target as HTMLInputElement).value))}
            onKeydown={e => handleKeydown(e)}
          />
          <span>页</span>
        </span>
      </div>
    );
  },
});
