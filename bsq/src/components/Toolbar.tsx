import { defineComponent, renderSlot } from "vue";

export default defineComponent({
  name: 'Toolbar',
  setup({}, { emit, slots }) {

    const handleOnKeyDown = (e: KeyboardEvent) => {

      // 处理回车搜索
      if (e.keyCode === 13) {
        emit('search', (e.target as HTMLInputElement).value);
      }
    }

    return () => {

      // 操作栏：左侧插槽
      const slotLeftopr = renderSlot(slots, 'default')

      return (
        <div class="table-wrap-toolbar">
          <div>
            {/* 左侧操作栏插槽 */}
            <slotLeftopr />
          </div>
          <div>
            <input
              type="text"
              class="table-wrap-toolbar__search-input"
              placeholder="可以模糊搜索id"
              onKeydown={e => handleOnKeyDown(e)} />
            <button
              class="table-wrap-toolbar__refresh-btn"
              onClick={() => emit('refresh')}
            >刷新</button>
          </div>
        </div>
      )
    }
  }
})