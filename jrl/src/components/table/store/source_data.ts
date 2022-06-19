import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { TableColumn } from '../../types'

/** 表格展示数据 */
export const useSourceStoreForSetup = defineStore('useSourceStoreForSetup', () => {
	const source = ref()
	const getSource = computed(() => {
		return source.value
	})

	function updateSourceHandle<T>(sourceValue: T) {
		source.value = sourceValue
	}

	return { source, getSource, updateSourceHandle }
})

/** 保留一份初始表格数据 */
export const useOriginSourceStoreForSetup = defineStore('useOriginSourceStoreForSetup', () => {
	const originSource = ref()
	const getOriginSource = computed(() => {
		return originSource.value
	})

	function initOriginSourceHandle<T>(sourceValue: T) {
		originSource.value = sourceValue
	}

	return { originSource, getOriginSource, initOriginSourceHandle }
})

/** 表格头配置数据 */
export const useColumnsConfigStoreForSetup = defineStore('useColumnsConfigStoreForSetup', () => {
	const columnsConfig = ref<TableColumn[]>([])
	const getColumnData = computed(() => {
		return columnsConfig.value
	})

	function updateColumnsConfigHandle(sourceValue: TableColumn[]) {
		columnsConfig.value = sourceValue
	}

	return { columnsConfig, getColumnData, updateColumnsConfigHandle }
})
