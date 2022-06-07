import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WuTable from '../index';
import { dataSource, columns } from './__mock__/index';

describe('WuTable', () => {
    const wrapper = mount(WuTable, {
        props: {
            dataSource,
            columns,
            pageSize: 10,
        }
    })

    it('打个快照 WuTable', () => {
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.exists()).toBe(true);
    })

    it('组件是否正常渲染', () => {
        /** 表格是否存在 */
        expect(wrapper.find('table').exists()).toBe(true);

        /** 表头是否存在 */
        expect(wrapper.find('thead').exists()).toBe(true);

        /** 内容是否存在 */
        expect(wrapper.find('tbody').exists()).toBe(true);

        /** 底部是否存在 */
        expect(wrapper.find('tfoot').exists()).toBe(true);
    })
})