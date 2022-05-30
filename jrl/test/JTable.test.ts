import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import JTable from '../src/components/table/index.vue'
import TableSort from '../src/components/table/table_sort.vue'
import TableHead from '../src/components/table/table_head.vue'
import TableBody from '../src/components/table/table_body.vue'
import TableFoot from '../src/components/table/table_foot.vue'
import { useSortHandle } from '../src/components/table/hooks/sort'
import { onUpdated } from 'vue'
const { normalSortHandle, descendSortHandle, ascendSortHandle } = useSortHandle('date')

const dataList = [
	{
		date: '2016-05-03',
		name: 'fdfsdf',
		address: 'No. 189, Grove St, Los Angeles'
	},
	{
		date: '2016-05-02',
		name: 'a',
		address: 'No. 189, Grove St, Los Angeles'
	},
	{
		date: '2016-05-04',
		name: 'f',
		address: 'No. 189, Grove St, Los Angeles'
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles'
	},
	{
		date: '2016-05-04',
		name: 'f',
		address: 'No. 189, Grove St, Los Angeles'
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles'
	},
	{
		date: '2016-05-04',
		name: 'f',
		address: 'No. 189, Grove St, Los Angeles'
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles'
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles'
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles'
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles'
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles'
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles'
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles'
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles'
	}
]
const columnProp = [
	{
		id: 1,
		key: 'name',
		title: '名字'
	},
	{
		id: 2,
		key: 'address',
		title: '地址',
		sortable: true
	},
	{
		id: 3,
		key: 'date',
		title: '日期',
		sortable: true
	}
]
test('mount component', () => {
	const jTable = mount(JTable, {
		props: {
			columnProp: dataList,
			tableColumn: columnProp
		}
	})
})

/** 点击排序 */
test('click sort', async () => {
	const jTableSort = mount(TableSort, {
		props: {
			columnProp: 'date'
		}
	})

	const eleBtn = jTableSort.find('a')
	eleBtn.trigger('click')
	expect(jTableSort.emitted()).toHaveProperty('click')
	expect(jTableSort.vm.status).toBe('ascend')
	eleBtn.trigger('click')
	expect(jTableSort.emitted()).toHaveProperty('click')
	expect(jTableSort.vm.status).toBe('descend')
	eleBtn.trigger('click')
	expect(jTableSort.emitted()).toHaveProperty('click')
	expect(jTableSort.vm.status).toBe('normal')
})

/** 分页 */
test('click pagination', async () => {
	const jTable = mount(JTable, {
		props: {
			dataList: dataList,
			tableColumn: columnProp
		}
	})
	const jTableFoot = mount(TableFoot, {
		props: {
			total: 15,
			currentPage: 1,
			limitPage: 4
		}
	})
	const eleInput = jTableFoot.find('input')
	const nextButton = jTableFoot.find('button.next')
	const preButton = jTableFoot.find('button.pre')
	await eleInput.trigger('keydown.up')
	expect(jTableFoot.emitted()).toHaveProperty('keydown')
	expect(jTableFoot.vm.currentPage).toBe(2)
	await nextButton.trigger('click')
	await preButton.trigger('click')
})
