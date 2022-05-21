/**
 * @file 表格头部
 */

import { toLower } from "lodash";
import { computed, defineComponent, PropType, ref, toRefs } from "vue";
import type { OrderByType, SortOptionType, TableColumns } from "./types";

const SORT_STATUS: Record<string, OrderByType> = {
	normal: "",
	asc: "asc",
	desc: "desc",
}

export default defineComponent({
	name: "WuHead",
	/** 定义emit方法的参数类型 */
	emits: {
		changeSort: (params: SortOptionType) => true,
	},
	props: {
		columns: {
			type: Array as PropType<TableColumns[]>,
			default: () => [],
		}
	},
	setup(props, { emit }) {
		const { columns } = toRefs(props);
		/** 为了确认是否初始化icon */
		const initFlag = ref(true);

		// 排序状态，normal 为默认，ascend 为升序，descend为降序
		const sortStatus = ref<OrderByType>('');

		// 排序图标
		const sortIconObj = {
			asc: "▲",
			desc: "▼",
			normal: "■",
		}

		const sortIcon = ref(sortIconObj.normal);

		/** 排序事件，按照 normal -> asc -> desc 循环排序 */
		const changeSortStatus = (key: string | number) => {
			initFlag.value = false;

			switch (sortStatus.value) {
				case SORT_STATUS.normal:
					sortStatus.value = SORT_STATUS.asc;
					sortIcon.value = sortIconObj.asc;
					break;
				case SORT_STATUS.asc:
					sortStatus.value = SORT_STATUS.desc;
					sortIcon.value = sortIconObj.desc;
					break;
				default:
					sortStatus.value = SORT_STATUS.normal;
					sortIcon.value = sortIconObj.normal;
					break;
			}
			emit("changeSort", { ikey: key, sortStatus: sortStatus.value });
		};

		/** 初始化sortIcon */
		const initSortIcon = (item: TableColumns) => {
			switch (toLower(item.sortable?.orderBy)) {
				case SORT_STATUS.asc:
					sortStatus.value = SORT_STATUS.asc;
					return sortIconObj.asc;

				case SORT_STATUS.desc:
					sortStatus.value = SORT_STATUS.desc;
					return sortIconObj.desc;

				default:
					sortStatus.value = SORT_STATUS.normal;
					return sortIconObj.normal;
			}
		}

		/** 获取样式配置 */
		const getHeadStyle = (item: TableColumns, index: number) => {
			const styleList: string[] = [];
			if (item.align) {
				switch (item.align) {
					case 'left':
						styleList.push('align__left');
						break;
					case 'right':
						styleList.push('align__right');
						break;
					case 'center':
						styleList.push('align__center');
						break;
					default:
						break;
				}
			}
			if (item.width) {
				styleList.push(`width__${item.width}`);
			}
			return styleList;
		}

		return () => {
			return (
				<thead class="wu_head">
					<tr>
						{
							columns.value.map((item, index) => (
								<th
									key={item.key}
									title={item.title}
									class={getHeadStyle(item, index)}
								>
									{item.title ?? item.key}
									{item.sortable &&
										(<span
											class="wu_head__sort"
											onClick={() => changeSortStatus(item.key)}
										>
											{initFlag.value ? initSortIcon(item) : sortIcon.value}
										</span>)
									}
								</th>
							))
						}
					</tr>
				</thead>
			);
		};
	},
});
