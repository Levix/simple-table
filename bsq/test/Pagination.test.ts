import { mount } from '@vue/test-utils';
import { expect, describe, it } from 'vitest';
import Pagination from '../src/components/Pagination';
import { paginationProps } from './mock';

describe('mount Pagination', () => {
  const wrapper = mount(Pagination, {
    props: {
      option: paginationProps
    },
  })

  it('renders Pagination', () => {
    // expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.exists()).toBe(true)
  })

  it('render Pagination total', () => {
    expect(wrapper.find('.pagination-wrap-total').text()).contains(paginationProps.total)
  })

  it('分页左按钮点击', async () => {
    await wrapper.find('.input').setValue(2)
    wrapper.find('.pagination-left-btn').trigger('click')
    expect(wrapper.find('.pagination-current-page').text()).contains(1)
  })

  it('分页右按钮点击', async () => {
    await wrapper.find('.input').setValue(1)
    wrapper.find('.pagination-right-btn').trigger('click')
    expect(wrapper.find('.pagination-current-page').text()).contains(2)
  })

  it('分页点击数字3：跳转到第3页', async () => {
    await wrapper.findAll('.pagination-wrap-context')[2].trigger('click')

    expect(wrapper.find('.pagination-current-page').text()).contains(3)
  })

  it('分页中input输入页码跳转事件：跳转第2页', async () => {
    await wrapper.find('.input').setValue(2)
    await wrapper.find('.input').trigger('keydown', {
      keyCode: 13
    })

    expect(wrapper.find('.pagination-current-page').text()).contains(2)
  })

  it('模拟携带小数点跳转', async () => {
    await wrapper.find('.input').setValue(2.111)
    await wrapper.find('.input').trigger('keydown', {
      keyCode: 13
    })

    expect(wrapper.find('.pagination-current-page').text()).contains(2)
  })

  it('异常测试：跳转-1页，其实还在当前页面，没有跳转', async () => {
    await wrapper.find('.input').setValue(2)
    await wrapper.find('.input').setValue(-1)
    await wrapper.find('.input').trigger('keydown', {
      keyCode: 13
    })

    expect(wrapper.find('.pagination-current-page').text()).contains(2)
  })

  it('异常测试：跳转10000页，其实还在当前页面，没有跳转', async () => {
    await wrapper.find('.input').setValue(2)
    await wrapper.find('.input').setValue(10000)
    await wrapper.find('.input').trigger('keydown', {
      keyCode: 13
    })

    expect(wrapper.find('.pagination-current-page').text()).contains(2)
  })
})

describe('mount empty Pagination', () => {
  const wrapper = mount(Pagination)

  it('renders Pagination', () => {
    expect(wrapper.exists()).toBe(true)
  })
})

describe('边界值测试', () => {

  it('total < showMaxLength', () => {
    const wrapper = mount(Pagination, {
      props: {
        option: {
          ...paginationProps,
          total: 1,
          showMaxLength: 5
        }
      },
    })

    expect(wrapper.exists()).toBe(true)
  })
})
