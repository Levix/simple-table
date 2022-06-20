import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { TableColumn } from '../../types'

export const useSortStoreForSetup = defineStore('useSortStoreForSetup', () => {
	const currentColumn = ref<TableColumn>({
		title: '',
		key: ''
	})
	const getCurrentColumn = computed(() => {
		return currentColumn.value.key
	})

	function updateCurrentColumnHandle(key: string) {
		currentColumn.value.key = key
	}

	return { currentColumn, getCurrentColumn, updateCurrentColumnHandle }
})
