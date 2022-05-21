import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WuHead from '../Head';
import { newColumns, a_columns, d_columns, sortIconObj } from './__mock__/index';

describe('WuHead', () => {
    const wrapper = mount(WuHead, {
        props: {
            columns: newColumns.value,
        }
    })

    it('打个快照 WuHead', () => {
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.exists()).toBe(true);
    })

    it('组件是否正常渲染，参数是否正确', async () => {
        expect(wrapper.find('thead').exists()).toBe(true);

        expect(wrapper.findAll('th')).toHaveLength(newColumns.value.length);

        // 改变columns
        await wrapper.setProps({
            columns: a_columns
        })
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.find('span').exists()).toBe(true);

        await wrapper.setProps({
            columns: d_columns
        })
        
        // 点击事件是否触发
        const iconWrapper = wrapper.find('span');

        await iconWrapper.trigger('click');
        expect(wrapper.text()).toContain(sortIconObj.normalTriangle);

        await iconWrapper.trigger('click');
        expect(wrapper.text()).toContain(sortIconObj.ascTriangle);

        await iconWrapper.trigger('click');
        expect(wrapper.text()).toContain(sortIconObj.descTriangle);
    })
})