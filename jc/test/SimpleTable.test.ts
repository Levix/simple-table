import { mount, createLocalVue } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import SimpleTable from "../src/components/simple_table.vue";
import Pagination from "../src/components/pagination.vue";
import { tableData, columns } from "./table_mock";
import CompositionApi from "@vue/composition-api";

const localVue = createLocalVue();
localVue.use(CompositionApi);

// 数据加载
describe("load-data", () => {
    const wrapper = mount(SimpleTable, {
        localVue,
        propsData: { columns, tableData }
    });

    // 渲染正常
    it("mount-table", () => {
        expect(wrapper.exists()).toBe(true);
    });

    // 加载正常
    it("load-data", () => {
        expect(wrapper.vm.$data.totalData.length).toEqual(tableData.length);
    });
});

// 分页相关
describe("pagination", () => {
    const wrapper = mount(Pagination, {
        localVue,
        propsData: { pageTotal: 10, pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    });

    const PaginationActiveWrap = wrapper.find('.pagination-active__wrap');
    const PaginationTotalWrap = wrapper.find('.pagination-total__wrap');

    // 分页加载正常
    it("render-pagination", () => {
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.findComponent(Pagination));
    });

    // 分页数据显示正常
    it("pagination-data", () => {
        let pageTotal = wrapper.vm.$props.pageTotal;

        expect(wrapper.find('.pagination-total__wrap').text()).toContain(pageTotal);
        expect(PaginationTotalWrap.text()).toContain(pageTotal);
    });


    // 默认显示第一页 显示正常
    it("active-page", () => {
        expect(wrapper.vm.$props.activeNum + 1).toEqual(1);
    });

    // 点击上一页或下一页后分页数据显示正常
    it("prev-btn", async () => {
        await wrapper.find('.pagination').trigger('click');

        expect(PaginationActiveWrap.text()).toContain(wrapper.vm.$props.activeNum + 1);
    });

    // 输入分页后跳转正常
    it('page-jump', async () => {
        const input = wrapper.find('.pagination-page__link');

        // 输入正常的页码数字
        await input.setValue('3');
        await input.trigger('keydown', { key: 'enter' });

        // 输入错误的页码数字
        await input.setValue('-1');
        await input.trigger('keydown', { key: 'enter' });
        expect(PaginationActiveWrap.text()).toContain(1);
    });
});
