import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { TableColumn } from '../../types'

export const useSortStoreForSetup = defineStore('useSortStoreForSetup', () => {
	const columnToken = ref<TableColumn>({
		title: '',
		key: ''
	})
	const getColumnKey = computed(() => {
		return columnToken.value.key
	})

	function updateColumnHandle(key: string) {
		columnToken.value.key = key
	}

	return { columnToken, getColumnKey, updateColumnHandle }
})
