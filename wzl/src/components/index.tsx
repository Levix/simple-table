/**
 * @file wu_table 组件主入口
 */

import { computed, defineComponent, reactive, ref, toRefs } from "vue";
import WuHead from "./Head";
import WuBody from "./Body";
import WuFoot from "./Foot";
import type { TableProps, SortOptionType } from "./types";
import { tableProps } from "./types";
import { useDataSource } from "../composables/useDataSource";
import { useColumns } from "../composables/useColumns";
import './index.css'

export default defineComponent({
	name: "WuTable",
	props: tableProps,
	setup(props: TableProps) {
		/** 解构 props 属性 */
		const { columns, dataSource, pageSize } = toRefs(props);

		/** 处理 columns */
		const { newColumns } = useColumns(columns.value);

		/** 获取了处理的表格数据 sortTableData */
		const { tableData, sortTableData } = useDataSource(dataSource, newColumns)

		/** 当前的页数，默认第一页 */
		const curPageNumber = ref(1);

		/** 默认排序的配置 sortOption */
		const _sortOptions: SortOptionType = reactive({
			ikey: -1,
			sortStatus: '',
		});

		/** 给Body组件的配置 */
		const _bodyOptions = computed(() => {
			return {
				/** 排序了的表格数据 */
				sortData: sortTableData.value,
				/** 未处理数据 */
				tableData: tableData.value,
				/** 处理了的列配置 */
				columns: newColumns.value,
				/** 排序配置 */
				sortOption: _sortOptions,
				/** 每页的大小 */
				pageSize: pageSize.value,
				/** 当前的页数 */
				curPageNumber: curPageNumber.value,
			}
		})

		/** 给Foot组件的配置 */
		const _footOptions = computed(() => {
			return {
				sortData: sortTableData.value,
				pageSize: pageSize.value,
			}
		})

		/** 排序改变 */
		const changeSort = (params: SortOptionType): void => {
			_sortOptions['ikey'] = params.ikey || 0;
			_sortOptions['sortStatus'] = params.sortStatus || '';
		};

		/** 切换分页 */
		const changePage = (params: number): void => {
			curPageNumber.value = params;
		};

		return () => {
			return (
				<table>
					<WuHead columns={newColumns.value} onChangeSort={changeSort} />
					<WuBody bodyOptions={_bodyOptions.value} />
					<WuFoot footOptions={_footOptions.value} onChangePage={changePage} />
				</table>
			);
		};
	},
});
