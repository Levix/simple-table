import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WuFoot from '../Foot';
import { footOptions, newFootOptions } from './__mock__/index';

describe('WuFoot', () => {
    const wrapper = mount(WuFoot, {
        props: {
            footOptions: footOptions,
        }
    })

    it('打个快照 WuFoot', () => {
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.exists()).toBe(true);
    })

    it('组件是否正常渲染，参数是否正确', async () => {
        expect(wrapper.find('tfoot').exists()).toBe(true);

        expect(wrapper.findAll('button')).toHaveLength(Math.ceil(footOptions.sortData.length / footOptions.pageSize) + 2);

        await wrapper.setProps({
            footOptions: newFootOptions
        })

        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.findAll('button')).toHaveLength(Math.ceil(newFootOptions.sortData.length / newFootOptions.pageSize) + 2);

        // 点击事件是否触发
        const prevButton = wrapper.find('.wu_foot__prev');
        // 初始禁用状态
        expect(prevButton.classes('prev_disabled')).toBe(true);

        const nextButton = wrapper.find('.wu_foot__next');
        // 初始不禁用,因为数据不只是一页
        expect(nextButton.classes('next_disabled')).toBe(false);

        // 点击下一页,上一页将解除禁用
        await nextButton.trigger('click');
        expect(prevButton.classes('prev_disabled')).toBe(false);
        
        // 点击上一页,上一页禁用,页签按钮进入按钮1,带actived类;
        await prevButton.trigger('click');
        expect(prevButton.classes('prev_disabled')).toBe(true);
        expect(wrapper.findAll('button').at(1)?.classes('actived')).toBe(true);
    })
})