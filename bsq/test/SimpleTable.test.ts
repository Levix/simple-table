import { shallowMount, mount } from '@vue/test-utils';
import { expect, describe, it } from 'vitest';
import SimpleTable from '../src/components/SimpleTable';
import Toolbar from '../src/components/Toolbar';
import TableHeader from '../src/components/TableHeader';
import { tableProps } from './mock';

describe('mount SimpleTable', () => {
  it('renders SimpleTable', () => {
    const wrapper = shallowMount(SimpleTable, {
      props: {
        option: tableProps
      },
    })

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.exists()).toBe(true)
  })

  it('模拟异步渲染：renders SimpleTable', async () => {
    const wrapper = shallowMount(SimpleTable)

    await new Promise((res, rej) => {
      setTimeout(() => {
        res(tableProps)
      }, 1000)
    }).then(res => {
      wrapper.setProps({
        option: res
      })
    });

    expect(wrapper.exists()).toBe(true)
  })

  it('SimpleTable renders default slot', () => {
    const defaultSlot = 'default slot message'
    const wrapper = mount(SimpleTable, {
      slots: {
        default: defaultSlot
      }
    })

    expect(wrapper.html()).toContain(defaultSlot)
  })

  it('Toolbar button refresh click', async () => {
    const wrapper = mount(SimpleTable).findComponent(Toolbar)
    await wrapper.find('.table-wrap-toolbar__refresh-btn').trigger('click')
  })

  it('Toolbar renders default slot', () => {
    const defaultSlot = 'default slot message'
    const wrapper = mount(Toolbar, {
      slots: {
        default: defaultSlot
      }
    })

    expect(wrapper.html()).toContain(defaultSlot)
  })

  it('Toolbar input search', async () => {
    const wrapper = mount(SimpleTable)
      .findComponent(Toolbar)
      .find('.table-wrap-toolbar__search-input')

    await wrapper.setValue('')
    await wrapper.trigger('onKeydown', {
      keyCode: 13
    })
  })

  it('TableHeader title label sort：升序，降序，无序', async () => {
    const wrapper = mount(SimpleTable).findComponent(TableHeader)
    await wrapper.find('.table-th-td__sort-btn').trigger('click')
    await wrapper.find('.table-th-td__sort-btn').trigger('click')
    await wrapper.find('.table-th-td__sort-btn').trigger('click')
  })
})

describe('mount empty SimpleTable', () => {
  const wrapper = mount(SimpleTable)

  it('renders SimpleTable', () => {
    expect(wrapper.exists()).toBe(true)
  })
  
  it('空状态是否存在', () => {
    expect(wrapper.find('.table-th-td__empty').exists()).toBe(true)
  })
})
