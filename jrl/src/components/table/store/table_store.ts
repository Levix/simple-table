import { reactive, ref } from 'vue'
import { GLOBAL_TABLE_TOKEN } from '../const'
import { TableColumn } from '../../types'

/** 传入的数据 */
const tableData = reactive({
	list: []
})
/** 显示的数据 */
const displayTableList = reactive<{ list: [] }>({
	list: []
})
/**列配置信息 */
const tableColumnsConfig = reactive<{ list: TableColumn[] }>({ list: [] })

export const tableDataList = () => {
	const setTableData = (TList: any) => {
		tableData.list = TList
		setDisplayTableList(TList)
	}
	const setColumnsConfig = (TList: any) => {
		tableColumnsConfig.list = TList
	}
	const setDisplayTableList = (TList: any) => {
		displayTableList.list = TList
	}

	const getColumnsConfig = () => {
		return tableColumnsConfig.list
	}

	return {
		tableData,
		tableColumnsConfig,
		displayTableList,
		setTableData,
		setDisplayTableList,
		setColumnsConfig,
		getColumnsConfig
	}
}
tableDataList.token = GLOBAL_TABLE_TOKEN
