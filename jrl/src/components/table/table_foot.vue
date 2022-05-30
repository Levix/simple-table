<script lang="ts" setup>
import { computed } from 'vue'
import { usePageination } from './hooks/pageination'
import { defineEmits } from 'vue'

let changeCurrentPageEmit = defineEmits(['update:currentPage'])
let tableProps = defineProps({
	total: {
		type: Number,
		default: 0
	},
	currentPage: {
		type: Number,
		required: true
	},
	limitPage: {
		type: Number,
		required: true
	}
})

/**一共有多少页 */
let pageCount = computed(() => {
	return Math.ceil(tableProps.total / tableProps.limitPage)
})

/** 当前页 */
let currentPage = computed({
	get() {
		return tableProps.currentPage + 1
	},
	set(val: number) {
		if (val < 1) {
			changeCurrentPageEmit('update:currentPage', 0)
			return
		}
		if (val > pageCount.value) {
			changeCurrentPageEmit('update:currentPage', pageCount.value - 1)
			return
		}
		changeCurrentPageEmit('update:currentPage', val - 1)
	}
})

let { prePageHandle, nextPageHandle } = usePageination(tableProps.limitPage, currentPage, pageCount)
</script>

<template>
	<tfoot>
		<tr>
			<span>总页数：{{ pageCount }}</span>
			<span>当前页: {{ currentPage }}</span>
			<button @click="prePageHandle()" class="pre">前一页</button>
			<input type="number" :max="pageCount" :min="1" v-model.number="currentPage" />
			<button @click="nextPageHandle()" class="next">后一页</button>
		</tr>
	</tfoot>
</template>
