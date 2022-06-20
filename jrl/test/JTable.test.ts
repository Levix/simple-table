import { mount } from '@vue/test-utils'
import { expect, test, it } from 'vitest'
import JTable from '../src/components/table/index.vue'

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
		key: 'name',
		title: '名字'
	},
	{
		key: 'address',
		title: '地址',
		sortable: true
	},
	{
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
	it('组件是否正常渲染，参数是否正确', () => {
		expect(jTable.find('tbody').exists()).toBe(true)

		expect(jTable.findAll('tr')).toHaveLength(columnProp.length)
	})
})
