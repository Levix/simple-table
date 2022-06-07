import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import TableSort from '../src/components/table/table_sort.vue'

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
