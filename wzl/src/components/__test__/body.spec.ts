import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WuBody from '../Body';
import { bodyOptions } from './__mock__/index';

describe('WuBody', () => {
    const wrapper = mount(WuBody, {
        props: {
            bodyOptions: bodyOptions,
        }
    })

    it('打个快照 WuBody', () => {
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.exists()).toBe(true);
    })

    it('组件是否正常渲染，参数是否正确', () => {
        expect(wrapper.find('tbody').exists()).toBe(true);

        expect(wrapper.findAll('tr')).toHaveLength(bodyOptions.sortData.length);
    })
})