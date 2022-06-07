import { mount } from '@vue/test-utils'
import { expect, test, it } from 'vitest'

import JTable from '../src/components/table/index.vue'
import TablePageination from '../src/components/table/table_pageination.vue'

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

/** 分页 */
test('click pagination', async () => {
	const jTable = mount(JTable, {
		props: {
			dataList: dataList,
			tableColumn: columnProp
		}
	})
	const jTableFoot = mount(TablePageination, {
		props: {
			total: 15,
			currentPage: 1,
			limitPage: 4
		}
	})
	const eleInput = jTableFoot.find('input')
	const nextButton = jTableFoot.find('button.next')
	const preButton = jTableFoot.find('button.pre')

	it('正常测试:点击上一页下一页跳页', async () => {
		await eleInput.setValue(3)
		await preButton.trigger('click')
		expect(eleInput.text()).contains(2)
		await nextButton.trigger('click')
		expect(eleInput.text()).contains(3)
	})

	it('异常测试:点击上一页下一页跳页', async () => {
		await eleInput.setValue(1)
		await eleInput.setValue(-1)
		expect(eleInput.text()).contains(1)

		await preButton.trigger('click')
		expect(eleInput.text()).contains(1)
		await eleInput.setValue(1)
		await eleInput.setValue(6)

		await nextButton.trigger('click')
		expect(eleInput.text()).contains(1)
	})
})
