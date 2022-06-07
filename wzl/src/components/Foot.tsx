/**
 * @file 表格底部
 */

import { defineComponent, ref, computed, PropType, toRefs } from "vue";
import type { FootOptionType } from "./types";
import { cloneDeep } from "lodash";

export default defineComponent({
	name: "WuFoot",
	/** 定义emit方法的参数类型 */
	emits: {
		changePage: (params: number) => true,
	},
	props: {
		footOptions: {
			type: Object as PropType<FootOptionType>,
			default: () => ({}),
		}
	},
	setup(props, { emit }) {
		const { footOptions } = toRefs(props);

		const _sortData = computed(() => { return footOptions.value.sortData });
		const _pageSize = computed(() => { return footOptions.value.pageSize });

		const gridData = computed(() => {
			return cloneDeep(_sortData.value);
		});

		/** 当前是第几页 */
		const curPageNumber = ref(1);
		/** 页数按钮的个数 */
		const pageCount = computed(() => {
			return Math.ceil(gridData.value.length / _pageSize.value);
		})

		/** 获取每页按钮，返回一个按钮集合 */
		const getPageButtons = () => {
			const buttonList = [];
			for (let i = 0; i < pageCount.value; i++) {
				buttonList.push(
					<button
						class={curPageNumber.value - 1 === i ? 'actived' : ""}
						onClick={() => toChangePage(i + 1)}
					>
						{i + 1}
					</button>
				);
			}
			return buttonList;
		};

		const prevDisabled = ref(true);
		const nextDisabled = ref(getPageButtons().length === 1);

		/** 切换页 */
		const toChangePage = (page: number) => {
			if (page === 1 && pageCount.value > 1) {
				prevDisabled.value = true;
				nextDisabled.value = false;
			} else if (page === pageCount.value && page > 1) {
				prevDisabled.value = false;
				nextDisabled.value = true;
			} else {
				prevDisabled.value = false;
				nextDisabled.value = false;
			}

			curPageNumber.value = page;
			emit("changePage", curPageNumber.value);
		};

		return () => {
			return (
				<tfoot class="wu_foot">
					<td colspan={4}>
						<button
							class={["wu_foot__prev", prevDisabled.value ? 'prev_disabled' : '']}
							disabled={prevDisabled.value}
							onClick={() => toChangePage(curPageNumber.value - 1)}
						>
							{"前一页"}
						</button>
						{getPageButtons()}
						<button
							class={["wu_foot__next", nextDisabled.value ? 'next_disabled' : '']}
							disabled={nextDisabled.value}
							onClick={() => toChangePage(curPageNumber.value + 1)}
						>
							{"后一页"}
						</button>
						<div class="wu_foot__box">
							<span>{`当前：第${curPageNumber.value}页`}</span><br />
							<span>{`${_pageSize.value}条 / 页`}</span><br />
							<span>{`总共：${gridData.value.length}条`}</span>
						</div>
					</td>
				</tfoot >
			);
		};
	},
});
