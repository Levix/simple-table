import { chunk } from 'lodash'

export function getList<T>(curPage: number, limit: number) {
	let getList = new Promise<T>(function (resolve, reject) {
		let tableData = [
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
		let data: any = chunk(tableData, limit)[curPage]

		setTimeout(() => {
			resolve(data)
		}, 1)
	})
	return getList
}
