import type { TableColumns, TableDataSourceType } from '../../types';
import { useDataSource } from "../../../composables/useDataSource";
import { useColumns } from "../../../composables/useColumns";
import { ref } from 'vue';

const dataSource: TableDataSourceType[] = []
for (let index = 0; index < 10; index++) {
    dataSource.push({
        key: index,
        name: `Edrward ${index}`,
        age: 18 + index,
        address: `London Park no. ${index}`,
        tags: ['nice', 'developer'],
    })
}
// 表格源数据
export { dataSource };
// 表格列配置
export const columns: TableColumns[] = [
    {
		title: "Name",
		key: "name",
	},
	{
		title: "Age",
		key: "age",
		width: 100,
		align:'center',
		sortable: {
			orderBy: "DESC",
			sorter: (curr, next) => next - curr,
		},
	},
	{
		title: "Address",
		key: "address",
	},
	{
		title: "Tags",
		key: "tags",
	},
];

export const sortIconObj = {
    ascTriangle: "▲",
    descTriangle: "▼",
    normalTriangle: "■",
}

export const a_columns: TableColumns[] = [
    {
        title: "Col_1",
        key: "Col__1",
    },
    {
        title: "Col_2",
        key: "Col__2",
        sortable: {
            orderBy: "asc"
        }
    },
    {
        title: "Col_3",
        key: "Col__3",
    },
    {
        title: "Col_4",
        key: "Col__4",
    },
]
export const d_columns: TableColumns[] = [
    {
        title: "Col_1",
        key: "Col__1",
    },
    {
        title: "Col_2",
        key: "Col__2",
        sortable: {
            orderBy: "desc"
        }
    },
    {
        title: "Col_3",
        key: "Col__3",
    },
    {
        title: "Col_4",
        key: "Col__4",
    },
]

// 处理后的配置
export const { newColumns } = useColumns(columns);
// 处理后的数据
export const { sortTableData } = useDataSource(ref(dataSource), newColumns);
// body配置
export const bodyOptions = {
    sortData: sortTableData.value,
    columns: newColumns.value,
    sortOption: {
        key: 1,
        sortStatus: 'asc',
    },
    pageSize: 10,
    curPageNumber: 1,
}

// foot配置
export const footOptions = {
    sortData: sortTableData.value,
    pageSize: 4,
}

export const newFootOptions = {
    sortData: sortTableData.value,
    pageSize: 8,
}