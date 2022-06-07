/**
 * @file 表格主体
 */

import { computed, defineComponent, PropType, toRefs } from "vue";
import type { TableColumns, BodyOptionType } from "./types";
import { cloneDeep, chunk, toLower } from "lodash";
import { ascendSort, descendSort } from "./utils";

export default defineComponent({
	name: "WuBody",
	props: {
		bodyOptions: {
			type: Object as PropType<BodyOptionType>,
			default: () => ({}),
		}
	},
	setup(props) {
		const { bodyOptions } = toRefs(props);

		const _sortData = computed(() => { return bodyOptions.value.sortData });
		const _tableData = computed(() => { return bodyOptions.value.tableData });
		const _columns = computed(() => { return bodyOptions.value.columns });
		const _sortOption = computed(() => { return bodyOptions.value.sortOption });
		const _pageSize = computed(() => { return bodyOptions.value.pageSize });
		const _curPageNumber = computed(() => { return bodyOptions.value.curPageNumber });

		/** 排序数据 */
		const sortDataList = computed(() => {
			return cloneDeep(_sortData.value);
		});

		/** 是否展示空状态 */
		const isShowEmpty = computed(() => {
			return _sortData.value.length === 0;
		})

		/** 展示的数据，传进来的排序配置改变则变化排序 */
		const showData = computed(() => {
			switch (toLower(_sortOption.value.sortStatus)) {
				case "asc":
					sortDataList.value.sort(ascendSort(getRowIndex(_sortOption.value.ikey, _columns.value)));
					break;
				case "desc":
					sortDataList.value.sort(descendSort(getRowIndex(_sortOption.value.ikey, _columns.value)));
					break;
				case "":
				default:
					sortDataList.value.splice(0, sortDataList.value.length);
					/**
					 * 这里三元判断是为了区分点击排序时应该取哪个数据，
					 * -1表示一开始渲染，如果存在列配置排序，就按照排序来，
					 * 如果没排序就按照接口数据来
					*/
					sortDataList.value.push(...cloneDeep(_sortOption.value.ikey === -1 ? _sortData.value : _tableData.value));
					break;
			}
			const chunkList = chunk(sortDataList.value, _pageSize.value);
			const _chunkList = chunkList[_curPageNumber.value - 1];
			/** 最后一页不足就补足 */
			if (_chunkList.length < _pageSize.value) {
				const num = _pageSize.value - _chunkList.length;
				for (let i = 0; i < num; i++) {
					_chunkList.push([])
				}
			}
			return _chunkList;
		});

		/** 获取需要排序的列下标 */
		const getRowIndex = (ikey: string | number, data: TableColumns[]): number => {
			for (let i = 0; i < data.length; i++) {
				if (data[i]["key"] === ikey) {
					return i;
				}
			}
			return 0;
		};

		const getBodyStyle = (index: number) => {
			const _col = _columns.value;
			const styleList: string[] = [];
			switch (_col[index].align) {
				case 'left':
					styleList.push('body_align__left');
					break;
				case 'right':
					styleList.push('body_align__right');
					break;
				case 'center':
					styleList.push('body_align__center');
					break;
				default:
					break;
			}
			return styleList;
		}

		return () => {
			return (
				<tbody class="wu_body">
					{
						isShowEmpty.value
							? <div class="empty_wrap">{"😭数据哪去了？"}</div>
							: showData.value.map((items) => (
								<tr class="wu_body__tr">
									{items.map((i, index) => (
										<td class={getBodyStyle(index)}>{i}</td>
									))}
								</tr>
							))
					}
				</tbody>
			);
		};
	},
});
